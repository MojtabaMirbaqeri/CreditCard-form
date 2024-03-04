let $ = document;

const confirmBtn = $.querySelector("#confirm-btn");
confirmBtn.addEventListener("click", checkForm);

const refreshBtn = $.querySelector("#refresh-btn");
refreshBtn.addEventListener("click", () => {
  location.reload();
});

const cardInfoCon = $.querySelector("#card-info-con");
const inputsArray = Array.from($.querySelectorAll(".form .input-control"));

//inputs in DOM
const cardNumInput = $.querySelector("#card-number");
const cardNameInput = $.querySelector("#card-name");
const expMonthInput = $.querySelector("#card-exp-m");
const expYearInput = $.querySelector("#card-exp-y");
const cvcInput = $.querySelector("#card-cvc");

//number result in DOM
const cardNumElem = $.querySelector(".card-number");
cardNumInput.addEventListener("input", addSpaces);

//name result in DOM
const cardNameElem = $.querySelector(".card-name");
showResultInDOM(cardNameInput, cardNameElem);

//exp result in DOM
const expMonthElem = $.querySelector(".exp-month");
showResultInDOM(expMonthInput, expMonthElem, true, 2);

const expYearElem = $.querySelector(".exp-year");
showResultInDOM(expYearInput, expYearElem, true, 2);

//cvc result in DOM
const cvcElem = $.querySelector(".cvc");
showResultInDOM(cvcInput, cvcElem, true, 4);

function checkForm() {
  inputsArray.forEach((input) => {
    showBlankError(input);
  });
  if (!weHaveError) {
    showThankyou();
  }
}

inputsArray.forEach((input) => {
  input.addEventListener("blur", () => {
    showBlankError(input);
  });
});

let weHaveError = false;
function showBlankError(input) {
  let isBlank = false;
  if (!input.value) {
    input.parentElement.classList.add("show-blank-error");
    isBlank = true;
    weHaveError = true;
  } else {
    input.parentElement.classList.remove("show-blank-error");
    isBlank = false;
    weHaveError = false;
  }
  return isBlank;
}

function showThankyou() {
  cardInfoCon.classList.add("show-thank-you");
}

function addSpaces() {
  let value = cardNumInput.value.replace(/\D/g, "").substring(0, 16);
  let formattedValue = "";
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += " ";
    }
    formattedValue += value.charAt(i);
  }
  cardNumInput.value = formattedValue;
  cardNumElem.innerHTML = cardNumInput.value;
}

function showResultInDOM(input, resultElem, limit, length) {
  input.addEventListener("input", () => {
    if (limit) {
      limitLength(input, length);
    }
    resultElem.innerHTML = input.value;
  });
}

function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}
