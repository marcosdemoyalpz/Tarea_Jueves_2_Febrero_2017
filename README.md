# Advanced Web Programming
## Today's Agenda (1/27/2017)

- [ ] Serve dynamic HTML files, using handlebars as our dynamic view generator.
- [ ] Your main template should reference Twitter's [bootstrap](http://getbootstrap.com/) HTML, CSS and JavaScript framework.
- [ ] Create a view with form that allows for movie creation and Image uploads. It should take the following fields: **Name, Description, Keywords and the movie poster**.
  - [ ] Movies should have an unique identifier (ideally UUID v4).
  - [ ] Movie data should be stored on a local sqlite.
  - [ ] Movie files should be stored on disk.
  - [ ] The form should validate input. (No JavaScript!)
  - [ ] You should use the proper bootstrap formatting for errors and form controls.
- [ ] Create a view that lists the created movies.
  - [ ] Feel free to render the list as you want.
  - [ ] Each element on the list should display a details view of the selected image. You should account for images that haven't been generated by the worker. Use CSS and other tricks to manipulate the original image as a fallback.
  - [ ] The end-point that lists the images should take a parameter that allows for JSON outputs rather than HTML.
- [ ] Create a worker that waits for tasks and performs them.
  - [ ] Your worker should generate thumbnails and compressed images from uploaded ones. Generated images should be stored on disk.
  - [ ] You should generate at least 4 different thumbnail sized images and follow your own convention to relate them to the original one, including the compressed version of the original.
  - [ ] When an user uploads an image, it should create an entry in the Redis cache. Your Redis keys should be namespaced so they don't clash with other applications. Use the following format: `<yourname>:<key>`
  - [ ] When a task is being worked on the key value should reflect that in its status.
  - [ ] When a task is done it should remove the key.
  - [ ] The worker should output stdout and stderr to separate log files.

### Notes
* The only valid paths are
  * /movies
    * /movies/json
  * /movies/list
    * /movies/list/json
  * /movies/create
  * /movies/details/id
* Your application should store the sqlite database in a `db` directory located at the root level.
* Your application should store the generated images in a `generated` directory located at the root level.
* You should have a local redis-server for development purposes.
* You should have pm2 installed locally as well in order to emulate the worker envionment. Take into account your app will be one of 6 running with pm2 when creating it's configuration file.
* Your application has to be deployed on the Web server and will only be graded there.

### Templating with handlebars

Install handlebars support for express:

    yarn add express-handlebars

or

    npm install express-handlebars --save

### Redis

Install nodejs' redis-cli

    yarn add redis
    
or
    
    npm install redis --save

### SQLite

Install nodejs's sqlite3 drive

    yarn add sqlite3 

or

    npm install sqlite3  --save

Use an external yml configuration file to load the Redis server information.

    Host: 45.55.77.201
    Port: 6379
    Auth key: g5X33nFB
    
Use an external yml configuration file to load the SQLite file path.