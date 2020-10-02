import fs from 'fs';
import { callbackify } from 'util';

export class FileSystem {
    constructor() {

    }
    public writeToFile(req: any) {
        const requestBody = JSON.stringify(req.body);
        fs.appendFile("./data/callbacks.txt", requestBody,  (err)=> {
            if(err)
                return console.log(err);
        });
        fs.appendFile("./data/callbacks.txt", "\n",  (err)=> {
            if(err)
                return console.log(err);
        });
    }
    
    public readFromFile() {
        return fs.readFileSync("./data/callbacks.txt", "utf8");
    }

    public createFile(callbackId: string, req: any) {
        const requestBody = JSON.stringify(req.body);
        fs.appendFile(`./data/${callbackId}-callbacks.txt`, requestBody,  (err)=> {
            if(err)
                return console.log(err);
        });
        fs.appendFile(`./data/${callbackId}-callbacks.txt`, "\n",  (err)=> {
            if(err)
                return console.log(err);
        });
    }

    public readCallback(callbackId: string) {
        return fs.readFileSync(`./data/${callbackId}-callbacks.txt`, "utf8");
    }
}