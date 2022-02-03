var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from './payment_config.js';
import PaymentClient from "./payment_client.js";
function setApiVersion(body) {
    if (typeof body.apiVersion !== "undefined" || !body.apiVersion) {
        body.apiVersion = "002.60";
    }
}
export default class GatewayClient extends PaymentClient {
    // region Transaction Operations
    creditCardSale(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.GATEWAY_HOST, "/transaction/sale/creditcard", "POST", body);
        });
    }
    creditCardAuthorize(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.GATEWAY_HOST, "/transaction/authorize/creditcard", "POST", body);
        });
    }
    creditCardCapture(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/capture`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    creditFundTransfer(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/refund`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    refundTransaction(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/refund`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    cancelTransaction(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/cancel`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    rebillTransaction(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/rebill`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    queryTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}`;
            return yield this.makeRequest(config.GATEWAY_HOST, url, "GET");
        });
    }
    exportTransactionsList(body, transactionOperation = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "/transactions";
            if (transactionOperation) {
                url += `/${transactionOperation}`;
            }
            return yield this.makeRequest(config.GATEWAY_HOST, url, "GET", body);
        });
    }
    blacklistUsers(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.GATEWAY_HOST, `/transaction/${id}/blacklist`, "POST", body);
        });
    }
    // region Subscriptions Operations.
    // TODO: Currently not needed in our model therefore remains unimplemented.
    // region  3D Secure
    check3DSecure(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.GATEWAY_HOST, "/transaction/3dscheck/creditcard", "POST", body);
        });
    }
    parse3DSecure(id, paRes) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transaction/${id}/3dsparse`;
            const body = {
                transactionId: id,
                PaRes: paRes,
            };
            return yield this.makeRequest(config.GATEWAY_HOST, url, "POST", body);
        });
    }
    // region  Blacklist
    blacklistValue(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(config.GATEWAY_HOST, "/blacklist", "POST", body);
        });
    }
}
