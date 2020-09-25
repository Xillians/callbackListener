const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req,res) => {
    console.log("Request body:\n", req.body);
    return res.end();
});

const server = app.listen(3000, () => {
    console.log(`Listening on port `, server.address().port);
});