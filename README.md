
CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Running the project
  


INTRODUCTION
------------

This small project is about is to read the snow depth measurements provided
by all snow depth sensors at football fields in vaxjo. The project provides
a public page shows the the status, footfield name, tempresure and comments
written by the admin.

The admin can login using user email/password method and redirected to a control 
page where the admin can delete sensor data or modify some data such as changing 
the status and writting comments.


Requirements
------------

This project is developed using React, Node js and CosmosDB. In additions, 
There are sensors installed at football fields to read data and store in 
CosmosDB.


Running the project
-------------------

To run the project in development mode you have to follow these steps:

1. Clone the project using command <git clone rep_url>.
2. Open terminal and move to API sub folder using command <cd "API">.
3. Install all dependences needed using command <npm install>
4. Open another terminal tab and move to client sub folder using
   command <cd "client">
5. Install all dependences needed using command <npm install>
6. While you are on API sub folder write the command <npm run dev>
   to run the project in development mode.




