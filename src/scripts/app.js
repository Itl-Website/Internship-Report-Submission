document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('internship-report-form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyLYeEqV8GltMmHzKd_aSO0wjA1kFwaARLQ0IILlzwL7Y_yu5dVw4p62L0NyQlOedjx/exec';

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        if (validateInput(
            formData.get('name').trim(),
            formData.get('class').trim(),
            formData.get('company').trim(),
            formData.get('report').trim()
        )) {
            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.ok ? response.text() : Promise.reject(response))
            .then(result => {
                alert('Report submitted successfully!');
                form.reset();
            })
            .catch(error => {
                alert('Submission failed. Please try again.');
                console.error('Error!', error);
            });
        } else {
            alert('Please fill in all fields correctly. Report must be 100 words or less.');
        }
    });

    function validateInput(name, className, company, report) {
        return name && className && company && report.split(/\s+/).length <= 100;
    }
});