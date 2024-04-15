function submitForm() {
  var grossIncomeInput = document.getElementById("gross-anual-income");
  var annualIncomeInput = document.getElementById("annual-income");
  var ageGroupInput = document.getElementById("age-group");
  var deductionsInput = document.getElementById("payable-deductions");

  // Validate Gross Annual Income
  var grossIncome = grossIncomeInput.value;
  if (isNaN(grossIncome)) {
    displayErrorTooltip(
      grossIncomeInput,
      "Gross annual income must be a number"
    );
    return;
  } else {
    hideErrorTooltip(grossIncomeInput);
  }

  // Validate Annual Income
  var annualIncome = annualIncomeInput.value;
  if (isNaN(annualIncome)) {
    displayErrorTooltip(annualIncomeInput, "Annual income must be a number");
    return;
  } else {
    hideErrorTooltip(annualIncomeInput);
  }

  // Validate Age Group
  var ageGroup = ageGroupInput.value;
  if (ageGroup === "0") {
    displayErrorTooltip(ageGroupInput, "Please select an age group");
    return;
  } else {
    hideErrorTooltip(ageGroupInput);
  }

  // Validate Deductions
  var deductions = deductionsInput.value;
  if (isNaN(deductions)) {
    displayErrorTooltip(deductionsInput, "Deductions must be a number");
    return;
  } else {
    hideErrorTooltip(deductionsInput);
  }

  //   calcuelate tax

  var overallIncome =
    parseFloat(grossIncome) + parseFloat(annualIncome) - parseFloat(deductions);
  var tax = 0;
  if (overallIncome <= 800000) {
    tax = 0;
  } else {
    var taxableIncome = overallIncome - 800000;
    if (ageGroup < 40) {
      tax = 0.3 * taxableIncome; //30% tax for age less than 40
    } else if (ageGroup >= 40 && ageGroup < 60) {
      tax = 0.4 * taxableIncome;
    } else {
      tax = 0.1 * taxableIncome;
    }
    showModal(overallIncome, tax.toFixed(2));
  }
}

function displayErrorTooltip(element, errorMessage) {
  var errorTooltip = element.nextElementSibling;
  errorTooltip.textContent = errorMessage;
  errorTooltip.classList.add("active");
}

function hideErrorTooltip(element) {
  var errorTooltip = element.nextElementSibling;
  errorTooltip.textContent = "";
  errorTooltip.classList.remove("active");
}

function showModal(overallIncome, tax) {
  var modalContent = document.createElement("div");
  modalContent.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          
          <p>Your overall income  will be <br/> ${overallIncome} 
          <br/><span>after tax deductions</span></p>
          <span class="close" onclick="closeModal()">Close</span>
        </div>
      </div>
    `;
  document.body.appendChild(modalContent);
}

function closeModal() {
  var modal = document.querySelector(".modal");
  modal.parentNode.removeChild(modal);
}
