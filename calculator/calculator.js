window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultValues = {amount: 15000, years: 5, rate: 10};

  const amountInput = document.querySelector("#loan-amount");
  amountInput.value = defaultValues.amount;

  const yearsInput = document.querySelector("#loan-years");
  yearsInput.value = defaultValues.years;

  const rateInput = document.querySelector("#loan-rate");
  rateInput.value = defaultValues.rate;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const P = values.amount; //P = Amount of principle
  const i = (values.rate / 100 ) / 12; //i = periodic interest rate (in our case yearly rate ÷ 12) -> rate is also divided by 100 to convert percent to decimal
  const n = values.years * 12; //n = total number of payments (years × 12)

  let monthlyPayment = 1;
  if(i != 0){
  monthlyPayment = (P*i)/(1-(Math.pow((1+i),-n)));
  } else {
  monthlyPayment = P/n;
  }

  return (Math.round(monthlyPayment * 100) / 100).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyElement = document.querySelector('#monthly-payment');
  monthlyElement.innerText = "$" + monthly;
}
