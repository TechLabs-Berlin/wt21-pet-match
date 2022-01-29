***Blog Post "Pet Match"*** - ***GitHub Repo: https://github.com/TechLabs-Berlin/wt21-pet-match.git***



***Tabel of content***

1. Team Members

2. Blog Post WD-FE

3. Blog Post WD-BE

4. Blog Post DS

   



***1. Team Members***

* Andrea Martins (WD-FE)

* Oksana Maistat (DS)

* Andre Hoppe (WD-BE)

* Hany Elhassany (DS)

* Brigitta Röck (WD-FE)

* Nick Schnar (DS)

* Adedayo Adepegba (DS)

* Chanida (WD-BE)

  



***2. Blog Post WD-FE***



Tech Stack: 
Figma, Visual Code Studio
HTML, CSS, Javascript
React (Router, Hooks), Axios


As we lost UX team early in the project, the WD-FE team decided to go on and design the layout on Figma. Since Andrea has a personal interest in layout and design and also some experience with it, she started with the development in Figma. 

For this reason we divided up our tasks as follows:



Andrea:
 - Figma Layouts

 - Static HTML-pages + CSS

  

Brigitta: 

 - React project

 - Javascript coding

 - Coordination with WD-BE

  

As we as a team faced a time problem, we decided not to use any additional UI library or other tools we were not familiar with.

Immediately after winter break, we had a meeting with the whole team to review Andrea's Figma layouts (see PetMatch_BlogPost_FigmaLayout_LandingPage.png) and decided to start implementing the frontend on this basis, even though not all pages had been created yet.

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_FigmaLayout_LandingPage.png?raw=true)



Andrea was now faced with the challenging task of having to alternate the design tasks and the implementation of the static HTML pages and CSS.

As of mid-January, we had additional support from 2 UX people from other teams who had already largely completed their tasks in their own teams. This was a great help for us, and we could finalize our layout.

Brigitta set up frontend part of our project with React Router (see PetMatch_BlogPost_React_Routes.png). At the beginning, the biggest challenge was to find out how the React system works and how the functionalities from our project would be implementable with it. This really involved a lot of working on trial and error.



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_Routes.png?raw=true)



In the following we want to show you our way from a Figma layout to a dynamic generated web page with React Router. As an example page we use a page from the questionnaire for potential adopters (see PetMatch_BlogPost_FigmaLayout_Questionnaire.png). 



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_FigmaLayout_Questionnaire.png?raw=true)



The main part of React project was to implement a dynamically generated page showing up the whole questionnaire for adopters. In order to remain as flexible as possible in the number of questions and possible answers, we decided to store them in a database. Together with the team WD-BE we decided to use mongoDB Atlas (see PetMatch_BlogPost_mongoDB_Questionnaire.png).

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_mongoDB_Questionnaire.png?raw=true)

 

Here you can see some screenshots of how we created a React Router component from a static HTML page:
PetMatch_BlogPost_HTML_Questionnaire.png PetMatch_BlogPost_React_DynamicPage_Questionnaire.png
PetMatch_BlogPost_React_DaynamicPage_RenderSingleQuestion.png
PetMatch_BlogPost_React_DynamcPage_RenderFormField.png



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_DynamicPage_Questionnaire.png?raw=true)

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_DaynamicPage_RenderSingleQuestion.png?raw=true)

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_DynamcPage_RenderFormField.png?raw=true)

We read out the whole questionnaire from DB and store all questions in a JS array and present them to the user as separate pages each. The user can navigate back and forth between the pages, e.g. to be able to correct his answers. All user’s answers are stored in a JS array as well. For this purpose we use Hooks (useState, useEffect). 

After last question the array with all answers is passed to backend. Backend routes are invoked either via Axios HTTP request or mongoose functionality (see PetMatch_BlogPost_React_Axios.png). 

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_Axios.png?raw=true)

Backend, after asking data science API for applying matching algorithm to user’s answers, sends back the 10 best cat matches to frontend. In frontend, the user is redirected to machting results page showing up previews of the selected cats. For this functionality we use der React component Redirect and pass the list of selected cats as state variable (see PetMatch_BlogPost_React_RedirectWithState.png). On matching result page the state variable is read out with the React component useLocation.

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/frontend/BlogPost/Screenshots/PetMatch_BlogPost_React_RedirectWithState.png?raw=true)

On machting result page the cats are presented in sorted order, best matches first. For each cat there is a link to cat detail page. 

Cat images are stored on file system in public folder of the website.





***3. Blog Post WD-BE***



As backend developer we were responsible for the server-side logic of web applications, connection of endpoints, routing, setup of a database, connection to APIs, integration of other tracks code and retrieving, updating, storing data. We were also in charge of testing and debugging the server-side code and check if everything is working. 

The top three tools we have used the most are listed below:

\#1 Visual Studio Code

To read, create and edit the source code for our project we used the code editor Visual Studio Code from Microsoft. The reasons why we used Visual Studio Code are that the software is for free, it runs on different operating systems, it has a huge variety of helpful extensions and most of the tutorials and learnings we checked used Visual Studio Code as code editor. In addition, Visual Studio Code has a good working and easy to understand interactive debugging console which helps to identify errors or mistakes in the code to correct them. 

\#2 Postman

Postman is a platform of several tools like design, test, mock, monitor and document to accelerate the work with APIs. We used Postman mainly to check if responses of requests to our server are returning the right information we need for our project.

\#3 MongoDB Atlas

To check and store our results and information we used the multi-cloud database called MongoDB Atlas. That database supports all MongoDB features, supports JSON files and schema, has a live migration and can be used and accessed by several people.

 To fulfill the project requirements addressed to the backend track we worked with different libraries as you can see in screenshot “libraries” and used the programming language Java Script.

![](https://raw.githubusercontent.com/TechLabs-Berlin/wt21-pet-match/frontend/backend/Screenshots%20Backend%20Blog%20Post/BE1.png)



Before we started coding, we needed to draw the wireframe of the website and the server-side logic behind to get a basic understanding what kind of code and data we need to provide to the frontend team and what we need to receive from the other tracks to make our project code work. Hence a lot of meetings and coordination between the frontend and backend team took place. 

After setting up the server and installation of the libraries we created a login with registration. For us it was not so easy to know which route to create and how to retrieve the user ID after the login. After quite a few attempts to make the code work we decided to create a normal login which is just checking the username and password and a login after taking the quiz which we need to process the users answers as you can see in the picture “Login”. 

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/backend/Screenshots%20Backend%20Blog%20Post/BE2.png?raw=true)

We decided to create user accounts for “non-users” in our database but without saving their email and password information. The idea was to use the objectID as a “user-ID” for identification when we save the users answers in our database. Another obstacle was that we were not able to create a user with “null” as email value after the second try. The reason was that we set the email as unique in our user schema and when we have the “null” value for the email more than one time in the database the code is translating it as a duplicate value. We solved that issue by adding another parameter called “sparse” to the user schema which allows us to have duplicate null value for email. We also needed to coordinate, discuss and think about which information should be part of the user schema which you can see in the picture “User schema”.

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/backend/Screenshots%20Backend%20Blog%20Post/BE3.png?raw=true)



For the answers and the match quiz we also created schemas. While coding and seeing the project grow, we realized that we need more routes, and the possibilities of options and outcomes also became more as you can see in the extract of our working file “Route ideas”.

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/backend/Screenshots%20Backend%20Blog%20Post/BE4.png?raw=true)

Beside a lot of trials and errors and moments of enlightenments we had also moments in which the code worked somehow but we could not figure out why. For example, in the screenshot “connect to model” you can see our code we have created to connect to the API-model which was created by the data science track. We faced the problem that the API was working on postman but when we tried to integrate it to our code it was not working on our machine. So somehow the code was working but we could not access the result given back from the API. To solve that issue we needed to add .data after modelOutput to access the result from the API.  

![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/backend/Screenshots%20Backend%20Blog%20Post/BE5.png?raw=true)



We faced a lot of time pressure as the backend track could not really start in the beginning as the whole setup of the website was not clear.

All in all, it was fun to find a solution for all the obstacles we were facing and to get rewarded with a code which is functioning. Also, the meetings with the other tracks were interesting as we got an insight of their work when we needed to create routes or connect endpoints. Most of our problems we were able to solve with the help of our TechLabs mentors, video tutorials, code snippets we found on the internet, tutorials on websites, meetings with the other track members and by just trying.



***4. Blog Post DS***

In our Pet-Match project the data science team is responsible for sourcing and providing of a suitable data set, the cleaning of the entire data which will be needed as information basement for further decision making/support as well as applying a proper machine learning methodology. To realize a good data science support it is mandatory to exchange with all other disciplines from the very beginning in order to achieve a common goal and to deliver the final MVP. 

Thus the DS-Team spend much time to find a sufficient data set which has served as a solid data base in order to extract information and rules from it throughout the entire project phase. We had a couple of attempts to find the "perfect" data set which in the end does not exist. Finally we as the whole team committed to take the "cats data set" for the entire duration of the project phase. Furthermore we discussed to extend the data base with new data sets (other pets). The data set we used has approximately 3300 rows (data sets) and 105  columns (attributes). The very initial task was to clean and structure the data so that we could apply the very first rules to gain important information. For that we cleaned the data in the columns which we saw as required to predict a satisfaction for the potential adopter in order to find any useful pattern. First of all we changed nominal data into numerical data, as seen below.



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/ds_documentation/DS_Screenshots_BlogPost/DS1.png?raw=true)



To find the first pattern we decided on making a correlation analysis. For that we have chosen the columns which might influence the satisfaction of the adopter and tried to find out if there is any correlation. If there would be one or many we must implement the context of the question which is behind of the column in our questionnaire.  We identified a couple of "slight" positive correlations that points out that there are at least small interrelationships. 



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/ds_documentation/DS_Screenshots_BlogPost/DS2.png?raw=true)



In between were setting up a scoring system which serves our questionnaire to recommend a matching cat, added random cat names since the data set did not have it and did further cleaning. 



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/ds_documentation/DS_Screenshots_BlogPost/DS3.png?raw=true)



The DS-Team decided to go further and build up a reliable recommendation system which we will point out final cat recommendations whenever a potential adopter runs through the defined questionnaire. For that we tried several approaches to find the right one for our project case. We did a regression analysis as well as a k-nearest neighbor attempt to figure out which will fits the best. By doing so we faced a couple of roadblocks and obstacles. It turned out that a recommendation systems based on a correlation analysis fits the best for our data set and returns the best results. 

The commendation goes hand in hand with a proper machine learning algorithm. The Idea was that user input (personality test answers) and the system recommends his matching cats. Since our users don't have any prior preferences towards cats ("USER COLD START PROBLEM") we have to start with this:



Version 1

1. Finding **nearset user**: the system takes user input (personality test answers) then finds the nearest user (the most similar one) from our Data Set. For better predictions : we filtered out users with satisfaction level blow 0.8.
2. We get the nearest user - **Connected Cat** (from the Data Set)



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/ds_documentation/DS_Screenshots_BlogPost/DS4.png?raw=true)



Version 2

Same as vesrion 1 but builds on it 

- Based on the **Connected Cat** the system recommends the nearest cat from Cat_dataset
- Cats and adopters datasets are independent. 



![](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/frontend/ds_documentation/DS_Screenshots_BlogPost/DS5.png?raw=true)



All in all we achieved our goal to set up a reliable recommendation system which systematic we connect through an API for our backend team mates. In conclusion we need to say that we faced many roadblocks on our way to deliver a good product. We even had a couple of drop outs (UX) who left the team. We did our best to compensate it.

But nevertheless it was a great time, we have learned a lot and our mentors supported us wherever they could. Finally we need to highlight that our teamwork was great and we have used many tools to exchange or create files and information. Although "GitHub" was not easy to handle and as a tool to exchange information a little bit to complex for beginners it worked out well in the end. 
