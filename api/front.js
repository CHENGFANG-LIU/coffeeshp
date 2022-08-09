var express = require("express");
var cors = require("cors");
var app = express();
app.listen(8000);
app.use( express.static("public")  );
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

var mysql = require("mysql");
var conn = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database: "catcoffee"
});

conn.connect(function (err) {
    console.log(err);
})

app.get("/money", function (req, res) {
    conn.query("select * from guests", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

app.get("/money/:id", function (req, res) {
    conn.query("select * from guests where phone = ?", 
        [req.params.id],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

