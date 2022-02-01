import { config } from './payment_config';
import PaymentClient from "./payment_client";
import { createDecipheriv } from 'crypto';

function setApiVersion(body:any) {
    if (typeof body.apiVersion !== "undefined" || !body.apiVersion) {
        body.apiVersion = "002.60";
    }
}

export default class Connect2PayClient extends PaymentClient {
    async createPayment(body:any) {
        setApiVersion(body);
        const res = await this.makeRequest(config.CONNECT2_PAY_HOST, "/transaction/prepare", "POST", body);
        if (res.customerToken) {
            res.customerRedirectURL = `https://${config.CONNECT2_PAY_HOST}/payment/${res.customerToken}`;
        }
        return res;
    }

    async consultPaymentStatus(token:string) {
        let url = `/transaction/${token}/status`;
        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "GET");
    }

    async transactionInformation(id:string) {
        let url = `/transaction/${id}/info`;
        let body = {
            apiVersion: "002.60",
        };

        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "GET", body);
    }

    async captureTransaction(transactionID:string, amount: string) {
        let url = `/transaction/${transactionID}/capture`;
        let body = {
            apiVersion: "002.60",
            amount
        };
        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
    }

    async cancelTransaction(transactionID:string, amount: string) {
        let url = `/transaction/${transactionID}/cancel`;
        let body = {
            apiVersion: "002.60",
            amount
        };
        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
    }

    async refundTransaction(transactionID:string, amount:string) {
        let url = `/transaction/${transactionID}/refund`;
        let body = {
            apiVersion: "002.60",
            amount
        };
        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
    }
    
    async rebillTransaction(transactionID:string, amount:string) {
        let url = `/transaction/${transactionID}/rebill`;
        let body = {
            apiVersion: "002.60",
            amount
        };
        return await this.makeRequest(config.CONNECT2_PAY_HOST, url, "POST", body);
    }

    async accountInformation() {
        return await this.makeRequest(config.CONNECT2_PAY_HOST, "/account", "GET");
    }

    async exportTransactionsList(body: { [x: string]: string; }) {
        return await this.makeRequest(config.CONNECT2_PAY_HOST, "/transactions/export", "GET", body);
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