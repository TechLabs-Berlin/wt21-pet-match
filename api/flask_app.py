from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
import os
import json
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_SORT_KEYS'] = False

# Defining the path
module_dir = os.path.abspath(os.path.dirname(__file__))

# Loading the data
file_path_1 = os.path.join(module_dir, "cleaned_data_num.csv")
df_raw = pd.read_csv(file_path_1)

#deleting columns that are not used in MVP
df_raw = df_raw.set_index('id').drop(columns = ['breed', 'easily_nervous', 'talkative', 'active_imagination', 'thorough job'])

# dropping low satisfaction level users
df_happy = df_raw.loc[df_raw["satisf_level"] > 0.8].drop(columns=["satisf_level"]).reset_index(drop=True)

# a subset with cats' features for the model
df_cats = df_happy.loc[:, "cat_age":"fearful"] 
df_cats
print('cats data derived')

# Load cats data from the website database
file_path_4 = os.path.join(module_dir, "cat_list_in_database.csv")
cats_website=pd.read_csv(file_path_4)

#cleaning cats data and preparing for model fitting
cats_website_1 = cats_website.drop(columns = ['breed', 'catID'])
cats_website_1.columns = ['cat_age','cat_gender','needs_outdoor','medical_conditions','behavioural_problems','cat_weight','likes_to_explore','playful','vocal','picked_up','timid','aggressive','adapts_quickly','prefers_alone','likes_stroke','tolerant_handled','friendly','fearful'
]
# fitting nearest neighbor model on currently available cats from the website
website_cats_model = NearestNeighbors(n_neighbors=10, metric = 'correlation')
website_cats_model.fit(cats_website_1)

#loading user model
file_path_5 = os.path.join(module_dir, "model_users.pkl")
neigh_users = joblib.load(file_path_5) # User model
print ('User model loaded')
file_path_6 = os.path.join(module_dir, "model_users_columns.pkl")
model_user_columns = joblib.load(file_path_6)
print ('Users model columns loaded')

# API functions

@app.route("/") # main page
def hello_world():
    return "<p>Hello Techie!</p>"


# prediction

@app.route('/predict', methods=['GET', 'POST']) # API endpoint URL for prediction
def predict():
    if neigh_users:
        try:
            # processing input
            json_ = request.json
            query = pd.DataFrame(json_)
            
            # extracting userID
            userID = query['userID'][0]
            userID_json = json.dumps(userID)
            
            #extracting user's answers
            query_data = pd.DataFrame(query['allUserAnswer']).transpose()
            query_data.columns=model_user_columns
            
            # finding nearest person in the database, that gives us info on his cat
            nearest_user = int(neigh_users.kneighbors(query_data, return_distance=False))
            
            # finding the most similar available cats to the one from the database
            result = pd.DataFrame(website_cats_model.kneighbors(pd.DataFrame(df_cats.iloc[nearest_user]).transpose(), return_distance=False)).transpose()
            result.columns = ['catID']
            
            # puts together a json-like string for output 
            result_list = []
            i=1
            for cat_id in result['catID']:
                case = {'catOrder': i, 'catID': cat_id}
                result_list.append(case.copy())
                i += 1
            
            # returning the json output
            return jsonify({'userID': userID_json,
            		    'result': result_list})

        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # this is for a command-line input
    except:
        port = 12345 # default port
    
    app.run(port=port, debug=True)
