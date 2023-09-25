describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
        billAmtInput.value = 32.30;
        tipAmtInput.value = 5.53;

        submitPaymentInfo();
    });
  
    it('should add all tipAmt (tip amounts) on sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipAmt')).toEqual(5.53); //initial tip
        
        billAmtInput.value = 80.20;
        tipAmtInput.value = 10.74; //add 10.74
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(16.27);

        billAmtInput.value = 120;
        tipAmtInput.value = 48.12; //add 48.12
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(64.39);
    });
  
    it('should add all billAmt (bill amount) on sumPaymentTotal()', function () {
  
        expect(sumPaymentTotal('billAmt')).toEqual(32.30); //initial bill
        
        billAmtInput.value = 80.20; //add 80.20
        tipAmtInput.value = 10.74; 
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(112.50);

        billAmtInput.value = 120; //add 120
        tipAmtInput.value = 48.12; 
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(232.50);
        
    });

    it('should add all tipPercent (percentage of tip on bill) on sumPaymentTotal()', function () {
  
        //initial percent (5.53/32.30) X 100 => 17
        expect(sumPaymentTotal('tipPercent')).toEqual(17);
        
        billAmtInput.value = 80.20;
        tipAmtInput.value = 10.74; 
        submitPaymentInfo();
        // 17 + (10.74/80.20) X 100 => 17 + 13 = 30
        expect(sumPaymentTotal('tipPercent')).toEqual(30);

        billAmtInput.value = 120; //add 120
        tipAmtInput.value = 48.12; 
        submitPaymentInfo();
        // 17 + 13 + (48.12/120) X 100 => 17 + 13 + 40 = 70
        expect(sumPaymentTotal('tipPercent')).toEqual(70);
        
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
  