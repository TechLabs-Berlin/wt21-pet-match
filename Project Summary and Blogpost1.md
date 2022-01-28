***Project "Pet Match"*** - ***GitHub Repo: https://github.com/TechLabs-Berlin/wt21-pet-match.git***



***Tabel of content***

1. Project Summary

    1.1 Team Members

    1.2 Tools and Communication

2. Blog Post
   2.1 Front-end 
   2.2 Back-end
   2.3 Datac Science



***1. Project Summary***

"Pet Match - get matched with the right pet". This is not just our motto, instead, it is our deep belief that we as Pet Match can help to reduce the amount of returned pets to the shelters. For that, we analyzed the present situation which is taking place in many pet shelters nowadays and figured out the following problems:

● Failed adoptions mean pets were adopted and returned.
● People frequently return a pet because the pet was not what they expected.
● This is a huge problem for independent shelters that have to allocate resources for that returning pet.
● Pets are usually brought from other countries in Europe, so it’s even harder to return to the original shelter.
● Failed adoptions can traumatize pets even more.
● During a lock-down situation, people tend to adopt pets and harm them by returning them after such a lock-down. 

We at Pet Match are convinced that by analyzing the traits of a potential adopter and the behavior/characteristics of a pet, we can ensure a better matching by giving the potential adopter a recommendation based on a machine learning model which we deployed on a website. 





***1.1 Team Members***

* Andrea Martins (WD-FE)
* Oksana Maistat (DS)
* Andre Hoppe (WD-BE)
* Hany Elhassany (DS)
* Brigitta Röck (WD-FE)
* Nick Schnar (DS)
* Adedayo Adepegba (DS)
* Chanida (WD_BE)





***2. Blog Post***

***2.1 Front-end***

Tech Stack: 
Figma, Visual Code Studio
HTML, CSS, Javascript
React (Router, Hooks), Axios


As we lost UX team early in the project, the WD-FE team decided to go on and design the layout on Figma. Since Andrea has a personal interest in layout and design and also some experience with it, she started with the development in Figma. 

For this reason we divided up our tasks as follows:

Andrea:
	- Figma Layouts
	- static HTML-pages + CSS

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



***2.2 Back-end***





***2.3 Data Science***







