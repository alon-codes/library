const express = require("express");

// Load environment variables
require('dotenv').load();

// Init Express app
const app = express();
const port = process.env.PORT;

// TODO: make this shit pretty
app.use(require("cors")());

app.get("/books", function (req, res) {
   res.send({
       result: [
            {
                bookId: "1",
               author: "JK Rolling",
               date: new Date(948037216000),
               title: "Harry Potter"
            },
            {
                bookId: "2",
               author: "C. S. Lewis",
               date: new Date(),
               title: "Narnia"
            },
            {
                bookId: "3",
               author: "Alexandre Dumas",
               date: new Date(),
               title: "The Three Musketeers"
            },
           {
               bookId: "4",
               author: "Robert Louis Stevenson",
               date: new Date(),
               title: "Treasure Island"
           },
           {
               bookId: "5",
               author: "Alice\'s Adventures in Wonderland",
               date: new Date(),
               title: "Lewis Carroll"
           },
       ]
   });
});

app.listen(port, function () {
    console.log("Application is running on port " + port);
});