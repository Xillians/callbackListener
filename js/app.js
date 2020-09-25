const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req,res) => {
    console.log("Request body:\n", req.body);
    return res.end();
});

const server = app.listen(process.env.port, () => {
    console.log(`Listening on port `, server.address().port);
});