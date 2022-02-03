import PaymentClient from "./payment_client.js";
export default class Connect2PayClient extends PaymentClient {
    createPayment(body: any): Promise<any>;
    consultPaymentStatus(token: string): Promise<any>;
    transactionInformation(id: string): Promise<any>;
    captureTransaction(transactionID: string, amount: string): Promise<any>;
    cancelTransaction(transactionID: string, amount: string): Promise<any>;
    refundTransaction(transactionID: string, amount: string): Promise<any>;
    rebillTransaction(transactionID: string, amount: string): Promise<any>;
    accountInformation(): Promise<any>;
    exportTransactionsList(body: {
        [x: string]: string;
    }): Promise<any>;
    handleRedirectStatus(encryptedData: any, merchantToken: any): any;
}
//# sourceMappingURL=connect2pay.d.ts.map