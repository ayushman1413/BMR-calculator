document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmr-form');
    const resultDiv = document.getElementById('result');
    const bmrValue = document.getElementById('bmr-value');
    const tdeeValue = document.getElementById('tdee-value');
    const weightLoss = document.getElementById('weight-loss');
    const maintenance = document.getElementById('maintenance');
    const weightGain = document.getElementById('weight-gain');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    const ageInput = document.getElementById('age');
    const ageErrorDiv = document.getElementById('age-error');

    // const numberInputs = document.querySelectorAll('input[type="number"]');
    // numberInputs.forEach(input => {
    //     input.addEventListener('input', function() {
    //         this.value = this.value.replace(/[^0-9]/g, '');

    //         const min = parseInt(this.getAttribute('min'));
    //         const max = parseInt(this.getAttribute('max'));

    //         if (this.value !== '') {
    //             let val = parseInt(this.value);
    //             if (val < min) {
    //                 this.value = min;
    //                 if (this.id === 'age') {
    //                     ageErrorDiv.textContent = 'Age must be 10 or above';
    //                 }
    //             } else if (val > max) {
    //                 this.value = max;
    //                 if (this.id === 'age') {
    //                     ageErrorDiv.textContent = 'Age must be 80 or below';
    //                 }
    //             } else {
    //                 if (this.id === 'age') {
    //                     ageErrorDiv.textContent = '';
    //                 }
    //             }
    //         } else {
    //             if (this.id === 'age') {
    //                 ageErrorDiv.textContent = '';
    //             }
    //         }
    //     });
    // });
const ageinput = document.getElementById("age");

ageinput.oninput = function() {
    let age = parseInt(ageinput.value);
    if (age > 80 || age < 10) {
        ageErrorDiv.style.display = "block";
        if (age > 80) {
            ageErrorDiv.textContent = "Age must be 80 or below";
        } else {
            ageErrorDiv.textContent = "Age must be 10 or above";
        }
    } else {
        ageErrorDiv.style.display = "none";
        ageErrorDiv.textContent = "";
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(ageInput.value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);

    // Clear previous error message
    ageErrorDiv.style.display = "none";
    ageErrorDiv.textContent = '';

    if (!age || !height || !weight) {
        alert('Please fill in all fields');
        return;
    }

    // Age specific validation and error messages
    if (age < 10) {
        ageErrorDiv.style.display = "block";
        ageErrorDiv.textContent = 'Age must be 10 or above';
        return;
    } else if (age > 80) {
        ageErrorDiv.style.display = "block";
        ageErrorDiv.textContent = 'Age must be 80 or below';
        return;
    } else {
        ageErrorDiv.style.display = "none";
        ageErrorDiv.textContent = '';
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activityLevel);
    const loss = Math.round(tdee - 500);
    const gain = Math.round(tdee + 500);

    bmrValue.textContent = Math.round(bmr);
    tdeeValue.textContent = tdee;
    weightLoss.textContent = loss;
    maintenance.textContent = tdee;
    weightGain.textContent = gain;

    resultDiv.classList.remove('result-hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

    resetBtn.addEventListener('click', function() {
        resultDiv.classList.add('result-hidden');
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        ageErrorDiv.textContent = '';
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
