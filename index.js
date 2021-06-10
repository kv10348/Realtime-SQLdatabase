var express = require("express");
var app = require("express")();
var mysql = require("mysql");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var dateTime = require("node-datetime");
const path = require("path");
const ejsMate = require("ejs-mate");
const { CONNREFUSED } = require("dns");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/")));
/* Creating POOL MySQL connection.*/
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "USERNAME",
  password: "PASSWORD",
  database: "DATABASE",
  debug: false,
});

app.get("/", function (req, res) {
  res.render("home");
});

io.on("connection", function (socket) {
  console.log("A user is connected");

  var update = function () {
    change(function (labels1, labels2) {
      console.log("Chaging the chart");
      io.emit("changed", labels1, labels2);
    });
    setTimeout(update, 4000);
  };
  update();
});

var present = 0;
var change = function (callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(false);
      return;
    }
    // console.log("we created a connection to database!");

    connection.query(
      "SELECT temperature, humidity , date from( SELECT id, temperature, humidity, date FROM `esp8266readings` ORDER BY id DESC LIMIT 10) as A",
      function (err, rows) {
        if (!err) {
          var ylables2 = [];
          var ylables1 = [];
          rows.forEach((element) => {
            ylables2.push(element.humidity);
            ylables1.push(element.temperature);
          });

          callback(ylables1, ylables2);
        }
      }
    );
  });
  //-----------------
  callback([], []);
};

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
