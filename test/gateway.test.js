import { notEqual, equal } from 'assert';
import { describe as _describe } from 'mocha';
const describe = _describe;

//"mocha": "^6.2.0",

import PaymentSDK from '../dist/sdk.js';

import _pkgTestData from '../testUtils/testData.cjs';
const { getOriginatorId, getOriginatorPassword } = _pkgTestData;

const originatorId = getOriginatorId();
const originatorPassword = getOriginatorPassword();

it('checking originator credentials', (done) => {
    notEqual(originatorId, "", "Originator ID not set");
    notEqual(originatorPassword, "", "Originator password not set");

    done();
});

const gateway = new PaymentSDK(originatorId, originatorPassword).gateway;

describe("credit card operations", function () {

    this.timeout(5000);
    const amountForTest = 1000;

    console.log("Originator:", getOriginatorId(), ",", getOriginatorPassword());

    const body = {
        customerIP: "1.2.3.4",
        amount: amountForTest,
        currency: "MAD",
        orderID: "HELLO NODEJS",

        cardNumber: "4111111111111111",
        cardSecurityCode: "000",
        cardHolderName: "CARDHOLDER NAME",
        cardExpireMonth: "10",
        cardExpireYear: "2024",

        shopperName: "NodeJS Mocha Test",
        shopperAddress: "NA",
        shopperZipcode: "NA",
        shopperCity: "NA",
        shopperState: "NA",
        shopperCountryCode: "NA",
        shopperPhone: "NA",
        shopperEmail: "NA"
    };

    let responseSale = null;

    it('credit card: sale', async () => {
        responseSale = await gateway.creditCardSale(body);
        equal(responseSale.errorCode, "000");
        return;
    });
    it('query transaction status', async () => {
        let responseQuery = await gateway.queryTransaction(responseSale.transactionID);
        equal(responseQuery.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('transaction refund', async () => {
        let refundBody = {
            transactionID: responseSale.transactionID,
            amount: amountForTest
        };
        
        let responseRefund = await gateway.refundTransaction(responseSale.transactionID, refundBody);
        equal(responseRefund.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('transaction rebill', async () => {
        // We will rebill a half amount of initial transaction
        
        let rebillBody = {
            transactionID: responseSale.transactionID,
            amount: amountForTest / 2
        };
        
        let responseRebill = await gateway.rebillTransaction(responseSale.transactionID, rebillBody);
        equal(responseRebill.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    let responseAuth = null;
    
    it('test authorize: for capture', async () => {
            responseAuth = await gateway.creditCardAuthorize(body);
        equal(responseAuth.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('test capture', async () => {
        let captureBody = {
            transactionID: responseAuth.transactionID,
            amount: amountForTest / 2
        };
        
        let responseCapture = await gateway.creditCardCapture(responseAuth.transactionID, captureBody);
        equal(responseCapture.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('test authorize: for cancel', async () => {
        responseAuth = await gateway.creditCardAuthorize(body);
        equal(responseAuth.errorCode, "000");
        
        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('test cancel', async () => {
        let cancelBody = {
            transactionID: responseAuth.transactionID,
            amount: amountForTest
        };

        let responseCancel = await gateway.cancelTransaction(responseAuth.transactionID, cancelBody);
        equal(responseCancel.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });
    
    it('test credit funds transfer', async () => {
        let cftBody = {
            transactionID: responseSale.transactionID,
            amount: amountForTest / 2
        };
        
        let responseCFT = await gateway.creditFundTransfer(responseSale.transactionID, cftBody);
        equal(responseCFT.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });
});
describe("export transactions", () => {

    it('test export transactions', async () => {
        let currentTimestamp = Math.floor(Date.now() / 1000);

        let requestBody = {
            startDate: currentTimestamp - (3600 * 5),
            endDate: currentTimestamp + (3600 * 5)
        };

        let exportResponse = await gateway.exportTransactionsList(requestBody);
        equal(exportResponse.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

});
/*
describe("Subscription operations", () => {

    const amountForTest = 1000;

    const body = {
        customerIP: "1.2.3.4",
        amount: amountForTest,
        currency: "EUR",
        orderID: "HELLO NODEJS",

        cardNumber: "4111111111111111",
        cardSecurityCode: "000",
        cardHolderName: "CARDHOLDER NAME",
        cardExpireMonth: "10",
        cardExpireYear: "2024",

        shopperName: "NodeJS Mocha Test",
        shopperAddress: "NA",
        shopperZipcode: "NA",
        shopperCity: "NA",
        shopperState: "NA",
        shopperCountryCode: "NA",
        shopperPhone: "NA",
        shopperEmail: "NA",

        // Details for subscription

        subscriptionType: "normal",
        rebillAmount: 1000,
        rebillPeriod: "P5D",
        rebillMaxIteration: 5,
        trialPeriod: "P1D"
    };

    let responseSale = null;

    it('subscription operations: credit card: sale', async () => {
        responseSale = await gateway.creditCardSale(body);
        equal(responseSale.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    it('instant conversion', async () => {
        let responseInstantConversion = await gateway.instantConversion(responseSale.subscriptionID);
        equal(responseInstantConversion.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    it('query subscription', async () => {
        let responseQuerySubscription = await gateway.querySubscription(responseSale.subscriptionID);
        equal(responseQuerySubscription.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    it('export subscriptions list', async () => {
        let currentTimestamp = Math.floor(Date.now() / 1000);

        let requestBody = {
            startDate: currentTimestamp - (3600 * 5),
            endDate: currentTimestamp + (3600 * 5)
        };

        let responseExportSubscriptions = await gateway.exportSubscriptionsList(requestBody);
        equal(responseExportSubscriptions.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    it('cancel subscription', async() => {
        let responseCancelSubscription = await gateway.cancelSubscription(responseSale.subscriptionID, 1022);
        equal(responseCancelSubscription.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

});
*/
describe("Blacklist operations", () => {

    const body = {
        customerIP: "1.2.3.4",
        amount: 500,
        currency: "EUR",
        orderID: "HELLO NODEJS",

        cardNumber: "4111111111111111",
        cardSecurityCode: "000",
        cardHolderName: "BLACKLISTED CARDHOLDER",
        cardExpireMonth: "10",
        cardExpireYear: "2024",

        shopperName: "BLACKLIST TEST",
        shopperAddress: "NA",
        shopperZipcode: "NA",
        shopperCity: "NA",
        shopperState: "NA",
        shopperCountryCode: "NA",
        shopperPhone: "NA",
        shopperEmail: "blacklist@email.com"
    };

    it('Blacklist customer IP test', async () => {

        let requestBody = {
            'valueType': 'customerIP',
            'value': '123.123.88.88'
        };

        let responseBlacklist = await gateway.blacklistValue(requestBody);
        equal(responseBlacklist.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    let responseSale = null;

    it('credit card: sale (for blacklist)', async () => {
        responseSale = await gateway.creditCardSale(body);
        equal(responseSale.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

    it('blacklist user transaction', async () => {

        let requestBody = {
            'cardNumberBlackList':'0',
            'shopperEmailBlackList':'1',
            'customerIPBlackList':'0'
        };

        let responseBlacklist = await gateway.blacklistUsers(responseSale.transactionID, requestBody);
        equal(responseBlacklist.errorCode, "000");

        return new Promise(resolve => {
            resolve();
        })
    });

});