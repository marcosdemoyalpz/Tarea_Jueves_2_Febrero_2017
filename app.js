var express = require('express');
var bodyParser = require("body-parser");
var app = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
app.use('/static', express.static('public'));

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.patch('*', function(req, res) {
    if (req.path.includes('/notimplemented')) {
        res.set({
            'Content-Type': 'text/plain',
            'x-powered-by': 'Express',
            'Allow': 'GET,POST,PUT'
        })
        res.sendStatus(501);
    }
});

app.put('*', function(req, res) {
    if (req.path.includes('/notimplemented')) {
        res.sendStatus(200);
    }
});

app.get("/movies/create", function(req, res){
  res.render("create")
});

app.get('*', function(req, res) {

    var home = true;

    if (req.path.includes('/protected')) {
        res.sendStatus(401);
    } else if (req.path.includes('/404')) {
        res.sendStatus(404);
    } else if (req.path.includes('/error')) {
        res.sendStatus(500);
    } else if (req.path.includes('/notimplemented')) {
        res.sendStatus(200);
    } else if (req.path.includes('/login')) {
        res.sendFile(__dirname + '/public/login.html');
        home = false;
    }

    if (home) {
        var myHeader, headerArray, key;
        myHeader = JSON.parse(JSON.stringify(req.headers));
        headerArray = [];
        for (key in myHeader) {
            headerArray.push(key); // Push the key on the array
            headerArray.push(myHeader[key]); // Push the key's value on the array
        }

        var jsonObj = {
            "method": req.method,
            "path": req.path,
            "host": req.hostname,
            "port": req.get('host').split(':')[1],
            "header": headerArray
        }
        res.send(jsonObj);
    }
});

app.post('*', function(req, res) {

    var login = false;

    if (req.path.includes('/protected')) {
        res.sendStatus(401);
    } else if (req.path.includes('/404')) {
        res.sendStatus(404);
    } else if (req.path.includes('/error')) {
        res.sendStatus(500);
    } else if (req.path.includes('/notimplemented')) {
        res.sendStatus(200);
    } else if (req.path.includes('/movies/create')) {
        var jsonObj = {
            "name": req.body.Name,
            "description": req.body.Description
        }
        res.set({
            'Content-Type': 'application/json'
        })
        res.send(jsonObj);
    }else if (req.path.includes('/login')) {
        login = true;
    }
    if (login) {

        var user = req.body.user;
        var pass = req.body.pass;

        var jsonObj = {
            "username": user,
            "password": pass
        }
        res.set({
            'Content-Type': 'application/json'
        })
        res.send(jsonObj);
    }
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
