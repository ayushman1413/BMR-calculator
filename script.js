// DOMContentLoaded event ka wait kar rahe hain, ensure karne ke liye ke HTML load ho chuka hai
document.addEventListener('DOMContentLoaded', function() {
    // Form, result section aur input fields ko select kar rahe hain
    const form = document.getElementById('bmr-form');
    const resultDiv = document.getElementById('result');
    const bmrValue = document.getElementById('bmr-value');
    const tdeeValue = document.getElementById('tdee-value');
    const weightLoss = document.getElementById('weight-loss');
    const maintenance = document.getElementById('maintenance');
    const weightGain = document.getElementById('weight-gain');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Input validation aur formatting ke liye
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Non-numeric characters ko remove kar rahe hain
            this.value = this.value.replace(/[^0-9]/g, '');

            // Minimum aur Maximum value ka validation
            const min = parseInt(this.getAttribute('min'));
            const max = parseInt(this.getAttribute('max'));

            if (this.value !== '') {
                if (parseInt(this.value) < min) this.value = min;
                if (parseInt(this.value) > max) this.value = max;
            }
        });
    });

    // Form submit hone par BMR calculate karega
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Form ko reload hone se rokta hai

        // Form se input values le rahe hain
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        const activityLevel = parseFloat(document.getElementById('activity').value);

        // Validation, agar field empty ho to alert karega
        if (!age || !height || !weight) {
            alert('Please fill in all fields');
            return;
        }

        // BMR calculation 
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // TDEE calculate karna (Total Daily Energy Expenditure)
        const tdee = Math.round(bmr * activityLevel);

        // Calorie goals calculate karna
        const loss = Math.round(tdee - 500); // Weight loss ke liye
        const gain = Math.round(tdee + 500); // Weight gain ke liye

        // Results ko display karna
        bmrValue.textContent = Math.round(bmr);
        tdeeValue.textContent = tdee;
        weightLoss.textContent = loss;
        maintenance.textContent = tdee;
        weightGain.textContent = gain;

        // Animation ke saath result section show karna
        resultDiv.classList.remove('result-hidden');

        // Smooth scroll to results section
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Reset button ke click par form reset aur result hide
    resetBtn.addEventListener('click', function() {
        resultDiv.classList.add('result-hidden');
        form.reset(); // Form fields reset
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Top par scroll
    });

    // Button click visual feedback ke liye
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
