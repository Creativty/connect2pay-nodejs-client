import Connect2PayClient from "./connect2pay";
import GatewayClient from "./gateway";
export default class PaymentSDK {
    paymentGateway: GatewayClient;
    _connect2Pay: Connect2PayClient;
    $: any;
    originatorID: string;
    originatorPW: string;
    get gateway(): GatewayClient;
    get connect2pay(): Connect2PayClient;
    constructor(id: string, password: string);
    setOriginatorID(id: string): void;
    setOriginatorPW(password: string): void;
}
//# sourceMappingURL=sdk.d.ts.map