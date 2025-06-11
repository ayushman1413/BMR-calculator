document.addEventListener('DOMContentLoaded', function() {
       // Form and result element references
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

     // Validate age input in real-time
const ageinput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const heightErrorDiv = document.getElementById("height-error");
const weightErrorDiv = document.getElementById("weight-error");
  // Validate age input in real-time
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

    // Validate height input in real-time

heightInput.oninput = function() {
    let height = parseInt(heightInput.value);
    if (height > 200 || height < 100) {
        heightErrorDiv.style.display = "block";
        if (height > 200) {
            heightErrorDiv.textContent = "Height must be 200 cm or below";
        } else {
            heightErrorDiv.textContent = "Height must be 100 cm or above";
        }
    } else {
        heightErrorDiv.style.display = "none";
        heightErrorDiv.textContent = "";
    }
};

weightInput.oninput = function() {
    let weight = parseInt(weightInput.value);
    if (weight > 170 || weight < 20) {
        weightErrorDiv.style.display = "block";
        if (weight > 170) {
            weightErrorDiv.textContent = "Weight must be 170 kg or below";
        } else {
            weightErrorDiv.textContent = "Weight must be 20 kg or above";
        }
    } else {
        weightErrorDiv.style.display = "none";
        weightErrorDiv.textContent = "";
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(ageInput.value);
    const height = parseInt(heightInput.value);
    const weight = parseInt(weightInput.value);
    const activityLevel = parseFloat(document.getElementById('activity').value);

    // Clear previous error messages
    ageErrorDiv.style.display = "none";
    ageErrorDiv.textContent = '';
    heightErrorDiv.style.display = "none";
    heightErrorDiv.textContent = '';
    weightErrorDiv.style.display = "none";
    weightErrorDiv.textContent = '';

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

    // Height specific validation and error messages
    if (height < 100) {
        heightErrorDiv.style.display = "block";
        heightErrorDiv.textContent = 'Height must be 100 cm or above';
        return;
    } else if (height > 200) {
        heightErrorDiv.style.display = "block";
        heightErrorDiv.textContent = 'Height must be 200 cm or below';
        return;
    } else {
        heightErrorDiv.style.display = "none";
        heightErrorDiv.textContent = '';
    }

    // Weight specific validation and error messages
    if (weight < 20) {
        weightErrorDiv.style.display = "block";
        weightErrorDiv.textContent = 'Weight must be 20 kg or above';
        return;
    } else if (weight > 170) {
        weightErrorDiv.style.display = "block";
        weightErrorDiv.textContent = 'Weight must be 170 kg or below';
        return;
    } else {
        weightErrorDiv.style.display = "none";
        weightErrorDiv.textContent = '';
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
