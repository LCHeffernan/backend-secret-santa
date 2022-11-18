# Santa Draws.
___

This is the backend for the Santa Draws app [(frontend repo here)](https://github.com/SuzBarnes/secret-santa) This was a group project that was part of the Manchester Codes bootcamp course. You can view the presentation explaining this app [here](https://www.youtube.com/watch?app=desktop&v=CUrmqMA-IB0&feature=youtu.be).
___
## Description.
An API to create secret Santa users and events. Users can register for an account, create an event and invite others. Users can also add their likes or dislikes and make anonymous gift suggestions for others. For the backend we created an express API using Postgres and Sequelize. It implemented CRUD requests and asynchronous techniques and tested using Mocha/Chai and Supertest, the tests can be found in the tests folder. We used middleware to check, upon registration, if an email already existed in the database. The password was then hashed using bcrypt and a jwt was generated upon login. The relationship between the models can be seen in the ERD screenshot below.

<img src="/images/ERD_santa_draws.png" width="603" height="216" alt="ERD - Entity Relationship Diagram" title="ERD - Entity Relationship Diagram"/>

___
## Download and setup.
This project has the following dependencies: Express, Postgres, Sequelize, cors, bcrypt and jsonwebtoken and additional dev dependencies Mocha, Chai, Supertest, Dotenv, Nodemon.  You will need to have Postgres running in a [docker](https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=search_emea_brand&utm_term=docker_exact&gclid=CjwKCAjw6raYBhB7EiwABge5Kn0-PeLbzCirw11gOzKbacmNwycp6EqOZcpI3DOh0FQRob7OTECjpxoCmt0QAvD_BwE) container on your machine. To use the database you can use [Postman](https://www.postman.com/).  To download the project:
* Fork the repository.
* Clone down your fork using ```git clone```.
* Change directory into your cloned folder and run ``` npm install ```.
* To start the app run ```npm start```.

## Using the Santa Draws backend without the frontend.
To start you will need to create some users, events, and userEvents. Using Postman send a POST request to the route ```localhost:3000/users``` with the following JSON body to create a user.
```
{
    "first_name": "<user first name>",
    "last_name": "<user last name>",
    "email": "<email address, must be a valid email address>",
    "password": "<password, must be longer than 8 characters>",
    "likes": "<comma separated list, can be null>",
    "dislikes": "<comma separated list, can be null>",
    "suggestions": "<comma separated list, can be null>",
} 
```
Send a POST request to ```localhost:3000/events``` with the following JSON body to create an event.
```
{
    "title": "<event title>",
    "exchange_date": "<date for exchanging gifts, must be in format yyyy-mm-dd>",
    "budget": "<budget for event, must be an integer>",
    "particpants": "<comma separated list of name, can be null>", 
    "drawn": "<has event names been drawn, boolean>",
    "AdminId": "<number of userId currently in database, integer>"
}
```
Send a POST request to ```localhost:3000/userevents``` with the following JSON body to create a userEvent.
```
{
    "UserId": "<number of userId currently in database, integer",
    "BuyForId": "<number of userId currently in database, integer>",
    "EventId": "<number of eventId currently in database, integer>" 
}
```
There are more routes that can be used for each model, send to ```localhost:3000``` with the additional route given in the table, in the route where you see ```model``` replace it with one of ```users```, ```events```, or ```userevents```:
| Request | Route | Description |
| ------ | ------ | ------ |
|GET|```/model```| Displays all entries in the model.| 
|GET|```/model/<id>```|Displays the entry that matches the given id.|
|PATCH|```/model/<id>```|Updates the entry with the given id and the data sent in the JSON body|
|DELETE|```/model/<id>```|Deletes the entry from the model, with the given id.|
|GET|```/userevents/userid/<userId>```| Displays the entries in userevents that match the userId.| 
|GET|```/userevents/eventid/<eventId>```| Displays the entries in userevents that match the eventId.| 
|GET|```/userevents/eventid/<eventId>/userid/<userId>```| Displays the entry in userevents that match the userId and eventId.| 
|PATCH|```/userevents/eventid/<eventId>/userid/<userId>```| Updates the entry in userevents that match the userId and eventId.| 

___
## Authors.
|Social| Alex Bradley | Suzannah Barnes | Lisa Heffernan |
| ------ | ------ | ------ | ------ |
|GitHub|[@AlexPBradley](https://github.com/AlexPBradley)|[@SuzBarnes](https://github.com/SuzBarnes)|[@LCHeffernan](https://github.com/LCHeffernan)|
|LinkedIn|[Alex Bradley](https://www.linkedin.com/in/alexpbradley/)|[Suzannah Barnes](https://www.linkedin.com/in/suzannah-barnes/)|[Lisa Heffernan](https://www.linkedin.com/in/lisa-heffernan-54b61312a)|
|Twitter| | |[@Iisaheffernan](https://twitter.com/Iisaheffernan)|

