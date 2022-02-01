export default class PaymentClient {
    originatorID: string;
    originatorPW: string;
    constructor(id: string, password: string);
    makeRequest(host: string, path: string, method: string, body?: {
        [x: string]: string;
    }): Promise<any>;
}
//# sourceMappingURL=payment_client.d.ts.map