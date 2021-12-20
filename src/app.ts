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
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});
app.post("/:callbackId", (req, res) => {
    const callbackId = req.params.callbackId;
    console.log("Request body:\n", req.body);
    fileSystem.createFile(callbackId, req);
    return res.end();
});
app.post("/:callbackId/timeout", async (req, res) => {
    const callbackId = req.params.callbackId;
    let minute = 60 * 1000;
    console.log("Request body:\n", req.body);
    await fileSystem.sleep(1 * minute)
    await fileSystem.createFile(callbackId, req);
    return res.end();
});
app.post("/:callbackId/badRequest", (req, res) => {
    res.status(400);
    res.send({
        "Error": "request denied: Bad request"
    })
    return res.end();
});
app.post("/:callbackId/unauthorized", (req, res) => {
    res.status(401);
    res.send({
        "Error": "request denied: user unauthorized"
    })
    return res.end();
});
app.get("/:callbackId", (req, res) => {
    const callback = fileSystem.readCallback(req.params.callbackId);
    return res.send(callback);
});
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port `, server.address().port);
});