import Connect2PayClient from "./connect2pay.js";
import GatewayClient from "./gateway.js";
export default class PaymentSDK {
    constructor(id, password) {
        this.setOriginatorID(id);
        this.setOriginatorPW(password);
        this.paymentGateway = null;
        this._connect2Pay = null;
    }
    get gateway() {
        if (this.paymentGateway == null) {
            this.paymentGateway = new GatewayClient(this.originatorID, this.originatorPW);
        }
        return this.paymentGateway;
    }
    get connect2pay() {
        if (this._connect2Pay == null) {
            this._connect2Pay = new Connect2PayClient(this.originatorID, this.originatorPW);
        }
        return this._connect2Pay;
    }
    setOriginatorID(id) {
        if (id) {
            this.paymentGateway = null;
            this.originatorID = id;
        }
    }
    setOriginatorPW(password) {
        if (password) {
            this.paymentGateway = null;
            this.originatorPW = password;
        }
    }
}
