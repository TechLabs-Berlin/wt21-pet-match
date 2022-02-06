# wt21-pet-match

## General Info

Project name: “Pet Match”

Project version: 1.0

Project status: Phase of development

Launch: 02.2022 (on a local server)

[Project documentation](https://github.com/TechLabs-Berlin/wt21-pet-match/blob/main/Documentation%20and%20Presentation/Blog%20Post%20-%20Pet%20Match.md).

License name: MIT

Author names: Andrea Martins, Oksana Maistat, Andre Hoppe, Hany Elhassany, Brigitta Röck, Nick Schnar, Adedayo Adepegba, Chanida



## Project Description 

"Pet Match - get matched with the right pet". This is not just our motto, instead, it is our deep believe that we as Pet Match can help to reduce the amount of returned pets to the shelters. For that we analyzed the present situation which is taking place in many pet shelters nowadays and figured out following problems:

- Failed adoptions mean pets were adopted and returned.
- People usually return a pet because the pet was not what they expected.
- This is a huge problem for independent shelters that must allocate resources for that returning pet.
- Pets are usually brought from other countries in Europe, so it’s even harder to return to the original shelter.
- Failed adoptions can traumatize even more an animal that was already in a confusing/sad situation.
- During a lock down situation people tend to adopt pets and harm them by returning them after such a lock down.

We as Pet Match are convinced that by analyzing the traits of a potential adopter and the behavior/characteristics of a pet we can ensure a better matching by giving the potential adopter a recommendation based on a machine learning model which we deployed on a website. With that user-friendly website we want to find the best cat match for people that want to adopt a cat in Germany through a lifestyle and personality quiz.



## Setup

1. Clone the repo in order to have all files downloaded on your computer or server.

```
$ git clone https://github.com/TechLabs-Berlin/wt21-pet-match.git
```

2. Make sure to have all npm packages installed. To do this, run `$ npm install` in the `/backend` folder and `$ npm install` in the `/frontend/webdev/website` folder.

3. Make sure to have a mongoDB database. [See below](#create-a-database).

4. Run the server. To run the server, type in the command `$ npm run devStart` in the `/backend` folder.
5. Run the frontend application. To start the frontend application, run `$ npm start` in the `/frontend/webdev/website` folder. The application will run at `https://localhost:3000`.



### Create a database

A database seed needs to be created to add the questionnaire and the cat data into the database. For the import of JSON files (catData.json and quiz Data.json) into the seed folder use Mongoimport. In the cat.Data.json file are the information of the cats and in the file quizData.json is the questionnaire stored.

Below you can find an example command for running in the terminal:

```
mongoimport --uri <connectionString>/<database> --collection <collection> --type json --file <fileName> --jsonArray
```

For the backend-part the npm package DotEnv was used in the server.js file. So to use the code a .env file needs to be created and the URI connetion string to connect to a MongoDB database server needs to be adjusted to the server you have created.

```
MONGODB_URI = ``mongodb+srv://server.example.com/``<databaseName>
```



### Usage of the API 

On our version the API is running on a server. For the local installation the "python flask_app.py"-file in the folder with the API files need to be run via terminal. Go to the directory: `wt21-pet-match/api/` and run following commands to install Flask and dependencies:

```
chmod +x install_FLASK_appy.py
```

```
chmod +x run_FLASK_appy.py
```

```
./install_FLASK_appy.py
```


## How to operate the prototype

1. After you are done with the installation and setup you can run the localhost on your browser.
2. You'll be taken to the main page, where you can click on the  button "Take the quiz" in order to do the questionnaire.
3. After you respond to the 15 questions, you will see a page where you can either Sign Up to save your matches, or view your matches directly by clicking on the button "View Your Matches".
4. You will be taken to the "Your Matches" page and be presented with 10 potential cat matches. On this page, you can filter cats by gender, sterelization status and compatibility with kids, cats and experienced tutor. If you wish to reset the filters, you can click on "Reset All Filters".
5. To check the cat profile, you can click on the cat card, and you will be taken to their profile page.



## Data set

The data set is acquired from the following open access publication:

Finka LR, Ward J, Farnworth MJ, Mills DS (2019) Owner personality and the wellbeing of their cats share parallels with the parent-child relationship. PLOS ONE 14(2): e0211862. [https://doi.org/10.1371/journal.pone.0211862]( https://doi.org/10.1371/journal.pone.0211862)



## Link to our Figma file

In the link below you can find the design and wireframe of the website:

https://www.figma.com/file/MYJxeD6diYyffzUC3Yq9r3/Pet-Match-Web



## Notes

- The cat information are predefined (not real) and not linked to any database of a shelter.
- The icons to navigate and like a cat on top of the cat image, on the "Cat Profile" page, are static at the moment and don't do anything.



## Credits and acknowledgments

There are people worth mentioning who supported us with our project. Leticia Valladares and Siracha who joined the project to support UX tasks at the end. Our mentors Allan Jorge and Benedikt Suhr. All TechLabs volunteers, specially Alba, Zubin John, Bogdan Ciobotaru, Daniel da Rocha, Stephanie Mennear, Basan Kuberlinov, Hayden Liu and Laura Dobson. And Bruno Costa who helped us with technical/coding issues.



## How to contribute

If you have ideas for the project how we can improve it or want to be part of our group do not hesitate to contact us.



## MIT License

This project is licensed under [MIT](https://opensource.org/licenses/MIT) license.

Copyright (c) 2022 Pet Match

 

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

 

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.
