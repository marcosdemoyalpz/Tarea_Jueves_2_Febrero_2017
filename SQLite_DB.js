//Load Database modules
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/mydb.db');

// Universally unique identifier modules
var uuid = require('node-uuid');

db.serialize(function() {

    db.run("CREATE TABLE if not exists movies (id TEXT NOT NULL, name TEXT NOT NULL, description TEXT, movie_poster BLOB, movie_thumbnail_small BLOB, movie_thumbnail_medium BLOB, movie_thumbnail_large BLOB)");
    db.run('INSERT into movies(id,name,description) VALUES' +
        '("' + uuid.v4() + '"' +
        ',"Inglorious Basterds"' +
        ',"In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner´s vengeful plans for the same.")');

    db.each("SELECT * FROM movies", function(err, rows) {
        console.log(rows);
    });
});

db.close();

/*
//Perform INSERT operation.
db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

//Perform DELETE operation
db.run("DELETE * from table_name where condition");

//Perform UPDATE operation
db.run("UPDATE table_name where condition"); *
*/