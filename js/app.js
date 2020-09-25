const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs');
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req,res) => {
    console.log("Request body:\n", req.body);
    const requestBody = JSON.stringify(req.body);
    fs.appendFile("./data/callbacks.txt", requestBody,  (err)=> {
        if(err)
            return console.log(err);
    });
    return res.end();
});

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname + '../../index.html'));
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port `, server.address().port);
});