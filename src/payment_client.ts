import * as https from 'https';
import { URLSearchParams } from 'url';

export default class PaymentClient {

    originatorID:string;
    originatorPW:string;

    constructor(id: string, password: string) {
        this.originatorID = id;
        this.originatorPW = password;
    }

    public async makeRequest(host: string, path: string, method: string, body: { [x: string]: string; }=null) : Promise<any> {
        const search_params = new URLSearchParams();
        for (const key in body) {
            search_params.append(key, body[key]);
        }
        let _path = (body && method == "GET") ? path + '?' + search_params.toString() : path;
        let options : https.RequestOptions = {
            hostname: host,
            port: 443,
            path: _path,
            method: method,
            headers: {
                'Authorization': 'Basic ' + Buffer.from(this.originatorID + ':' + this.originatorPW).toString('base64'),
            }
        };
        return new Promise((resolve, reject) => {
            let req = https.request(options, (res) => {
                let chunks = [];
                res.on("data", (chunk) => {
                    chunks.push(chunk);
                });
                res.on("end", () => {
                    let body = Buffer.concat(chunks);
                    let bodyString = body.toString("utf-8");
                    resolve(JSON.parse(bodyString));
                });
            }).on("error", (err) => {
                console.log("Payment SDK request error: " + err.message);
                reject(err);
            });

            if (body) {
                if (method != "GET") {
                    req.write(JSON.stringify(body));
                }
            }

            req.end();
        });
    }

}