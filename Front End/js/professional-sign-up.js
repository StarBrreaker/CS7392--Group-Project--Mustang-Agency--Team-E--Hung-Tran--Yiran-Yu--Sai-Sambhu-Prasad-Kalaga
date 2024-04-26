
function submitProfessionalAccountRequest() {
    const formData = new FormData();

    formData.append('preferredUsername', document.getElementById('ProUsername').value);
    formData.append('firstName', document.getElementById('Profirstname').value);
    formData.append('lastName', document.getElementById('Prolastname').value);
    formData.append('dob', document.getElementById('ProDOB').value);
    formData.append('email', document.getElementById('ProEmail').value);
    formData.append('phone', document.getElementById('phoneno').value);
    formData.append('mailingAddress', document.getElementById('Proaddress').value);
    formData.append('city', document.getElementById('Procity').value);
    formData.append('state', document.getElementById('Prostate').value);
    formData.append('zip', document.getElementById('Prozipcode').value);
    formData.append('degree', document.getElementById('ProDegree').value);
    formData.append('institution', document.getElementById('ProInstitution').value);
    formData.append('dateOfAward', document.getElementById('ProDateAward').value);

    let table = document.getElementById('myTable');
    let qualificationCategories = [];
    let qualificationKeywords = [];
    for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
        let row = table.rows[i];
        qualificationCategories.push(row.cells[0].textContent);
        qualificationKeywords.push(row.cells[1].textContent);
    }
    formData.append('qualificationCategories', qualificationCategories);
    formData.append('qualificationKeywords', qualificationKeywords);
    console.log(formData.get('preferredUsername'));

    fetch('http://localhost:8080/professionalAccountRequests/add', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            if(response.status === 409) {
                throw new Error('Username already taken');
            }
            throw new Error('Server responded with an error!');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            // If the server sends back a specific message
            document.getElementById('serverResponse').textContent = data.message;
        } else {
            document.getElementById('serverResponse').textContent = 'Success: Account request created successfully!';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("serverResponse").innerHTML = error.message; // Display error message on the form
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitProfessionalAccountRequest();
    });
});