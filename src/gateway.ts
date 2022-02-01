import { config } from './payment_config';
import PaymentClient from "./payment_client";

type TransactionOperation = "sale" | "refund" | "credit" | "authorize" | "capture" | "cancel" | "rebill";

export default class GatewayClient extends PaymentClient {
    // region Transaction Operations
    async creditCardSale(body) {
        return await this.makeRequest(config.GATEWAY_HOST, "transactions/sale/creditcard", "POST", body);
    }
    async creditCardAuthorize(body) {
        return await this.makeRequest(config.GATEWAY_HOST, "transactions/authorize/creditcard", "POST", body);
    }
    async creditCardCapture(id:string, body) {
        const url = `/transaction/${id}/capture`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }
    async refundTransaction(id:string, body) {
        const url = `/transaction/${id}/refund`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }
    async creditFundtransfer(id:string, body) {
        const url = `/transaction/${id}/credit`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }
    async cancelTransaction(id:string, body) {
        const url = `/transaction/${id}/cancel`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }
    async rebillTransaction(id:string, body) {
        const url = `/transaction/${id}/rebill`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }
    async queryTransaction(id:string, body) {
        const url = `/transaction/${id}`;
        return await this.makeRequest(config.GATEWAY_HOST, url, "GET");
    }
    async exportTransactionsList(body, transactionOperation:TransactionOperation = null) {
        let url = "/transactions"
        if (transactionOperation) {
            url += `/${transactionOperation}`;
        }
        return await this.makeRequest(config.GATEWAY_HOST, url, "GET", body);
    }
    async blacklistUsers(id:string, body) {
        return await this.makeRequest(config.GATEWAY_HOST, `transaction/${id}/blacklist`, "POST", body);
    }

    // region Subscriptions Operations.
    // TODO: Currently not needed in our model therefore remains unimplemented.

    // region  3D Secure
    async check3DSecure(body) {
        return await this.makeRequest(config.GATEWAY_HOST, "transaction/3dscheck/creditcard", "POST", body);
    }

    async parse3DSecure(id:string, paRes:any) {
        const url = `/transaction/${id}/3dsparse`;
        const body = {
            transactionId: id,
            PaRes: paRes,
        };
        return await this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
    }

    // region  Blacklist
    async blacklistValue(body) {
        return await this.makeRequest(config.GATEWAY_HOST, "/blacklist", "POST", body);
    }
}