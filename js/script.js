const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const targetInput = document.getElementById('target');

submitBtn.addEventListener('click', function (e) {

    if (nameInput.validity.valid && emailInput.validity.valid && targetInput.validity.valid) {
        e.preventDefault();
        alert("Thanks! We'll run the analysis and send the results to your email address - they'll be with you soon!")
    }

});