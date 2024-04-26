document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitEmployerAccountRequest();
    });
});

function submitEmployerAccountRequest() {
    const formData = new FormData();

    formData.append('preferredUsername', document.getElementById('companyUsername').value);
    formData.append('companyName', document.getElementById('companyname').value);
    formData.append('registrationNumber', document.getElementById('registrationnumber').value);
    formData.append('industry', document.getElementById('industry').value);
    formData.append('size', document.getElementById('companysize').value);
    formData.append('primaryContactFirstName', document.getElementById('pcfn').value);
    formData.append('primaryContactLastName', document.getElementById('pcln').value);
    formData.append('primaryContactEmail', document.getElementById('pcEmail').value);
    formData.append('primaryContactPhoneNumber', document.getElementById('pcPhone').value);
    formData.append('primaryContactMailAddress', document.getElementById('companyaddress').value);
    formData.append('city', document.getElementById('companycity').value);
    formData.append('state', document.getElementById('companystate').value);
    formData.append('zip', document.getElementById('companyzipcode').value);
    formData.append('websiteLink', document.getElementById('inputUrl').value);


    fetch('http://localhost:8080/employerAccountRequests/add', {
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