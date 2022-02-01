import PaymentClient from "./payment_client";
declare type TransactionOperation = "sale" | "refund" | "credit" | "authorize" | "capture" | "cancel" | "rebill";
export default class GatewayClient extends PaymentClient {
    creditCardSale(body: any): Promise<any>;
    creditCardAuthorize(body: any): Promise<any>;
    creditCardCapture(id: string, body: any): Promise<any>;
    refundTransaction(id: string, body: any): Promise<any>;
    creditFundtransfer(id: string, body: any): Promise<any>;
    cancelTransaction(id: string, body: any): Promise<any>;
    rebillTransaction(id: string, body: any): Promise<any>;
    queryTransaction(id: string, body: any): Promise<any>;
    exportTransactionsList(body: any, transactionOperation?: TransactionOperation): Promise<any>;
    blacklistUsers(id: string, body: any): Promise<any>;
    check3DSecure(body: any): Promise<any>;
    parse3DSecure(id: string, paRes: any): Promise<any>;
    blacklistValue(body: any): Promise<any>;
}
export {};
//# sourceMappingURL=gateway.d.ts.map