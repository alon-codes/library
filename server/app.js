const express = require("express");

// Load environment variables
require('dotenv').load();

// Init Express app
const app = express();
const port = process.env.PORT;

app.get("/books", function (req, res) {
   res.send([
       {
           author: "JK Rolling",
           date: new Date(),
           title: "Harry Potter"
       },
       {
           author: "C. S. Lewis",
           date: new Date(),
           title: "Narnia"
       }
   ])
});

app.listen(port, function () {
    console.log("Application is running on port " + port);
});