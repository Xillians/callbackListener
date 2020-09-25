import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import { FileSystem } from "./controllers/filesystem";
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileSystem = new FileSystem()

app.post("/", (req, res) => {
    console.log("Request body:\n", req.body);
    fileSystem.writeToFile(req)
    return res.end();
});
app.get("/", (res) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port `, server.address().port);
});