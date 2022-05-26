# DSA SEARCH ENGINE

# Project Description
This project develops a search engine on problem set containing 2265 problems hosted on mongodb atlas database, with additional features of select problems by topics, select problem by difficulty and code submission(work in progress)

# App Live Link
https://abhi-dsa-search-engine-project.herokuapp.com/

# Steps to run this project on a local server

 Download the zip file of this project from going to the code section of this repository or you can download the project using command line cloning with given url on the repository

open this project folder on your IDE

open your terminal and run command, 'npm install', this will install all the node dependencies used in this project which will help you run the code easily on your local device

install nodemon on your device and run command, 'nodemon site_query.js' which will run the application on your browser

visit http://localhost:3000, and here, you can see the complete performance of this app

# In case if the database has been deleted or some issues comes in connection to it, you can create your own mongodb atlas database and run these files in this project and follow the above commands to run this app on your browser

change the database uri in every file, with your new URI

You need to head to SAVING TO MONGODB folder, and here you can see two files, save_data1.js and save_data2.js

save_data1.js will save, tf_idf_values, all_keywords, idf_values to your mongodb server

save_data2.js will save, all problems (2265)  and magnitude of each document to your database

Then run above commands to run this app on browser at http://localhost:3000

