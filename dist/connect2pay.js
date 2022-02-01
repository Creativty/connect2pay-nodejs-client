var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from './payment_config';
import PaymentClient from "./payment_client";
import { createDecipheriv } from 'crypto';
function setApiVersion(body) {
    if (typeof body.apiVersion !== "undefined" || !body.apiVersion) {
        body.apiVersion = "002.60";
    }
}
export default class Connect2PayClient extends PaymentClient {
    createPayment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            setApiVersion(body);
            const res = yield this.makeRequest(config.CONNECT2_PAY_HOST, "/transaction/prepare", "POST", body);
            if (res.customerToken) {
                res.customerRedirectURL = `https://${config.CONNECT2_PAY_HOST}/payment/${res.customerToken}`;
            }
            return res;
        });
    }
    consultPaymentStatus(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${token}/status`;
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "GET");
        });
    }
    transactionInformation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${id}/info`;
            let body = {
                apiVersion: "002.60",
            };
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "GET", body);
        });
    }
    captureTransaction(transactionID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${transactionID}/capture`;
            let body = {
                apiVersion: "002.60",
                amount
            };
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
        });
    }
    cancelTransaction(transactionID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${transactionID}/cancel`;
            let body = {
                apiVersion: "002.60",
                amount
            };
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
        });
    }
    refundTransaction(transactionID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${transactionID}/refund`;
            let body = {
                apiVersion: "002.60",
                amount
            };
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
        });
    }
    rebillTransaction(transactionID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/transaction/${transactionID}/rebill`;
            let body = {
                apiVersion: "002.60",
                amount
            };
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
        });
    }
    accountInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, "/account", "GET");
        });
    }
    exportTransactionsList(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.CONNECT2_PAY_HOST, "/transactions/export", "GET", body);
        });
    }
    handleRedirectStatus(encryptedData, merchantToken) {
        const encryptedDataOriginal = Buffer.from(encryptedData, "base64");
        const merchantTokenOriginal = Buffer.from(merchantToken, "base64");
        const decipher = createDecipheriv("aes-128-ecb", merchantTokenOriginal, "");
        let decoded = decipher.update(encryptedDataOriginal, null, "utf-8");
        decoded += decipher.final('utf-8');
        return JSON.parse(decoded);
    }
}
