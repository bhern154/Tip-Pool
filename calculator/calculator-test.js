
it('should calculate the monthly rate correctly', function () {
  const values = {amount:23000, years:10, rate:6};
  expect(calculateMonthlyPayment(values)).toEqual('255.35');
});


it("should return a result with 2 decimal places", function() {
  const values = {amount:15000, years:5, rate:10};
  //count length of array after decimal
  expect (calculateMonthlyPayment(values).split('.')[1].length).toEqual(2);
});

it('should calculate monthly payment with 0% rate correctly', function () {
  const values = {amount:10000, years:10, rate:0};
  expect(calculateMonthlyPayment(values)).toEqual('83.33');
});
