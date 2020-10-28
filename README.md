# express-session-authentication
This is a basic authentication app using node.js, Express and MongoDB. 

## Implementation
There are four pages: home, login, signup, dashboard. If the user is signed in, they can visit all the pages. In case the user is not signed in, they can only visit the home, login and signup pages and if they try accessing the dashboard, they will be redirected to the login page.

This was implemented using express sessions. Each visiting user is issued a cookie in which sessionId is saved, and it is used for mapping the user to their session data. Session data is stored in mongoDB database. 

Whenever some user logs in, that information is saved in their session data. Afterwards, if in the next 60 seconds the user sends a request to the dashboard page, the request will go through because the user is logged in.

Sessions are saved for 60 seconds, meaning that the user is automatically logged in only for the next 60 seconds.
