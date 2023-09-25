describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
        //payment 1 test
        billAmtInput.value = 30;
        tipAmtInput.value = 6;
        submitPaymentInfo();

        //payment 2 test
        billAmtInput.value = 10000;
        tipAmtInput.value = 1000;
        submitPaymentInfo();
    });
  
    it('should Add a curPayment object to allPayments on submitPaymentInfo()', function () {
       expect(allPayments.payment1).toEqual({billAmt: '30', tipAmt: '6', tipPercent: 20});
       expect(allPayments.payment2).toEqual({billAmt: '10000', tipAmt: '1000', tipPercent: 10});
    });

    it('should reset input values on submitPaymentInfo()', function () {
        expect(billAmtInput.value).toEqual('');
        expect(tipAmtInput.value).toEqual('');
     });

    it('should return undefined with negative or empty inputs on createCurPayment()', function () {

        billAmtInput.value = 25;
        tipAmtInput.value = 0;
        const testZero = createCurPayment();
        expect(testZero.tipPercent).toEqual(0);

        billAmtInput.value = -30;
        tipAmtInput.value = 50;
        const testNegative = createCurPayment();
        expect(testNegative).not.toBeDefined(); ;
     });

    it('should create table row element and pass to appendTd on appendPaymentTable(curPayment)', function () {
        //we added two payments on beforeEach
        expect(paymentTbody.rows.length).toEqual(2);
    });

    it('should create table row element with calculated sum of all payment on updateSummary()', function () {

        //30 + 10000 = 10030
        expect(summaryTds[0].innerHTML).toEqual('$10030');

        //6 + 1000 = 1006
        expect(summaryTds[1].innerHTML).toEqual('$1006');

        //(20 + 10) / 2 = 15%
        expect(summaryTds[2].innerHTML).toEqual('15%');
    });

    it('should add a delete "X" tr element with appendDeleteBtn(tr) on appendPaymentTable()', function () {
        const table = paymentTbody.firstChild;
        expect(table.lastChild.innerHTML).toEqual('X');
      });

    afterEach(function() {

        //reset all variables used
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentId = 0;

        //remove data from bill/tip/percent table
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
    });
  });
  