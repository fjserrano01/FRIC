# FRIC
Finding and Reporting Information Console, Team Coding Edge

Installation:
One must install MongoDB into their system, this link can help with the download and installation
of mongodb https://docs.mongodb.com/manual/installation/

This video can assist with installation of MongoDB for windows 10 https://www.youtube.com/watch?v=GmeW8s8snsU

After installation of MongoDB and MongoCompass that completes the addition of the database system.


Running the program:
Open mongodb Compass and ensure mongodb service is available for connection.

One can then run the FRIC.bat file located in the main folder directory of FRIC. This file
will begin running the client and server system necessary for the program. 
Two command prompt units will open and the browser application will open thereafter once fully loaded
and connection to mongo has been established.

Once event is created, refresh of the database in mongodb compass may be required.



Trouble Shooting:
If there are any errors or you are faced with permission denied statements run the following command
in command prompt on the folder where fric is contained.

npm install

Then run the file again, If this does not fix the errors run

npm install 

on the server folder and client folder in the FRIC directories. This will download the 
needed dependencies and packages that may be missing in your system to properly run the 
program.

If faced with permission denied, uninstall and re install nodemon for npm.

If mongoDB compass does not connect.
	Click windows key
	Search service
	Search mongodb located in the services
	hit start

Dependencies: are listened in the Package-lock.json file's located respectively in main folder directory
of FRI, server folder directory and client server directory.