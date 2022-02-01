var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as https from 'https';
import { URLSearchParams } from 'url';
export default class PaymentClient {
    constructor(id, password) {
        this.originatorID = id;
        this.originatorPW = password;
    }
    makeRequest(host, path, method, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const search_params = new URLSearchParams();
            for (const key in body) {
                search_params.append(key, body[key]);
            }
            let _path = (body && method == "GET") ? path + '?' + search_params.toString() : path;
            let options = {
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
        });
    }
}
