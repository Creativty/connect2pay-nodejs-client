import Connect2PayClient from "./connect2pay.js";
import GatewayClient from "./gateway.js";

export default class PaymentSDK {
    paymentGateway: GatewayClient;
    _connect2Pay: Connect2PayClient;$
    originatorID: string;
    originatorPW: string;

    
    public get gateway() : GatewayClient {
        if (this.paymentGateway == null) {
            this.paymentGateway = new GatewayClient(this.originatorID, this.originatorPW);
        }
        return this.paymentGateway;
    }

    public get connect2pay() : Connect2PayClient {
        if (this._connect2Pay == null) {
            this._connect2Pay = new Connect2PayClient(this.originatorID, this.originatorPW);
        }
        return this.connect2pay;
    }
    

    constructor(id:string, password:string) {
        this.setOriginatorID(id);
        this.setOriginatorPW(password);
        this.paymentGateway = null;
        this._connect2Pay = null;
    }

    setOriginatorID(id:string) {
        if (id) {
            this.paymentGateway = null;
            this.originatorID = id;
        }
    }

    setOriginatorPW(password:string) {
        if (password) {
            this.paymentGateway = null;
            this.originatorPW = null;
        }
    }
}