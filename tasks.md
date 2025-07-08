

Tasks

DONE tasks.
1. Create a POST API to add a Post message. DONE
2. Create a GET API to return Posts. DONE
3. Create a POST API to add comment to a Post message: DONE
4. Create a POST API to add a threaded comment. DONE
5 Create a GET API to return comments on a POST. DONE
6. Create a GET API to return a particular comment with all its comments on a POST. DONE
7. Create an PUT api to update the existing POST message ,only allow update with in 15minutes. 
8. Create an DELETE api to delete the post message, only allow deletion within 15minutes.
9. Create an API to update the comment, only within 15minutes.
10. Create an API to delete the comment, only within 15minutes.
11. Store the author information in post and comment messages.
----------------------------------------------------------------------------------------------------------

Backend Remaining tasks.
 
6. Add logic for login.
7. Protect post api's with authentication.
8. Add a layer of websocket to notify the user if there is a comment on his post. 

Remaining Front END tasks.
1. Create a front end with HOME page shows all the recent post.
    1.a Show an INPUT box to create a new POST message.
2. Upon Clicking a POST, show an webpage with its Contents of a Post and all its comments below. 
    2.a Give capability to add a comment on a POST or reply to a comment.
3. Create a login webpage, if a user visits to protected page it should be redirected to login if not logged.
    3.a Upon Refreshing the page, it should not ask for re-login
4. Connect to the websocket server for realtime notification and updation. 


Docker support. 
1. Pack the backend into the Docker file 
    1.1 Dockerfile should have the configuration to which database to connect with.
2. Pack the front end into the docker file
    2.1 Docker file should contain the configuration to which backend server to connect

Least priority tasks.
1. Create an pagination API to return posts.
2. Create a pagination API to return comments of a post.