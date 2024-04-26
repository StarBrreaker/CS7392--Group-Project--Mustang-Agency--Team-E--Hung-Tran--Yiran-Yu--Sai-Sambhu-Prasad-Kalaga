let staffID = localStorage.getItem('username'); // Retrieve the username
let professionalID = localStorage.getItem('selectedProfessionalRequest'); // Retrieve the employer ID saved in localStorage

console.log('selectedProfessionalID ', professionalID);

function fetchStaffInfomation() {
    // console.log('Profeesional ID is:' + professionalID);
    // console.log(professionalID);
    fetch(`http://localhost:8080/staff/${staffID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        // Display the professional info on the page
        document.getElementById("navStaffID").textContent = 'Hi, ' + data.staffID;
    })

    .catch((error) => {
        console.error('Error:', error);
    });
  }


function fetchNextProfessionalAccountRequest() {
    fetch('http://localhost:8080/professionalAccountRequests/next')
        .then(response => {
            if (!response.ok) {
                throw new Error('No new requests available');
            }
            return response.json();
        })
        .then(accountRequest => {
            // Display the account request details in the UI
            displayRequestDetails(accountRequest);
        })
        .catch(error => {
            console.log(error.message);
            // Update UI to indicate no available requests or error
            alert('No new professional account requests available');
        });
}

function displayRequestDetails(accountRequest) {
    // Display the account request details in the UI
    document.getElementById('firstName').textContent = accountRequest.firstName;
    document.getElementById('lastName').textContent = accountRequest.lastName;
    document.getElementById('dob').textContent = accountRequest.dob;
    document.getElementById('email').textContent = accountRequest.email;
    document.getElementById('phone').textContent = accountRequest.phone;
    document.getElementById('address').textContent = accountRequest.mailingAddress;
    document.getElementById('city').textContent = accountRequest.city;
    document.getElementById('state').textContent = accountRequest.state;
    document.getElementById('zip').textContent = accountRequest.zip;
    document.getElementById('degree').textContent = accountRequest.degree;
    document.getElementById('institution').textContent = accountRequest.institution;
    document.getElementById('dateOfAward').textContent = accountRequest.dateOfAward;
    document.getElementById('preferredUsername').textContent = accountRequest.preferredUsername;

    localStorage.setItem('selectedProfessionalRequest', accountRequest.preferredUsername); // Save the professional ID in localStorage

    let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear any existing rows
    accountRequest.qualifications.forEach(qualification => {
        let row = tableBody.insertRow();
        let categoryCell = row.insertCell(0);
        let keywordsCell = row.insertCell(1);

        categoryCell.textContent = qualification.category;
        keywordsCell.textContent = qualification.keywords;
    });
}


function fetchProfessionalAccountRequestDetail() {
    if (!professionalID) {
        console.error('No professional ID found');
        return; // Exit if no professional ID is found
    }
    console.log('professionalID is:', professionalID);
    fetch(`http://localhost:8080/professionalAccountRequests/${professionalID}`) // Use the correct endpoint for fetching a single account request
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
            console.log(response);
            return response.json();
        })
        .then(accountRequest => {
            // Now populate the HTML with the fetched account request details
            document.getElementById('firstName').textContent = accountRequest.firstName;
            document.getElementById('lastName').textContent = accountRequest.lastName;
            document.getElementById('dob').textContent = accountRequest.dob;
            document.getElementById('email').textContent = accountRequest.email;
            document.getElementById('phone').textContent = accountRequest.phone;
            document.getElementById('address').textContent = accountRequest.mailingAddress;
            document.getElementById('city').textContent = accountRequest.city;
            document.getElementById('state').textContent = accountRequest.state;
            document.getElementById('zip').textContent = accountRequest.zip;
            document.getElementById('degree').textContent = accountRequest.degree;
            document.getElementById('institution').textContent = accountRequest.institution;
            document.getElementById('dateOfAward').textContent = accountRequest.dateOfAward;
            document.getElementById('preferredUsername').textContent = accountRequest.preferredUsername;

            let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            accountRequest.qualifications.forEach(qualification => {
                let row = tableBody.insertRow();
                let categoryCell = row.insertCell(0);
                let keywordsCell = row.insertCell(1);
        
                categoryCell.textContent = qualification.category;
                keywordsCell.textContent = qualification.keywords;
            });

        })
        .catch(error => {
            console.error('Error fetching professional details:', error);
        });
}
function acceptProfessionalAccountRequest() {
    
    // Construct the form data
    let formData = new URLSearchParams();
    formData.append('status', 'ACCEPTED'); // Assuming 'status' is the field expected by your API

    // Update the status of the account request
    fetch(`http://localhost:8080/professionalAccountRequests/${professionalID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Content-Type for form data
        },
        body: formData // Send the form data
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(updatedRequest => {
        console.log('Request updated:', updatedRequest);
        
        // After updating the request, now create the user and employer
        createUserAndProfessional(updatedRequest);
    })
    .catch(error => {
        console.error('Error updating employer account request:', error);
    });
}

function createUserAndProfessional(accountRequest) {
    // Create user
    console.log(accountRequest.preferredUsername);

    fetch(`http://localhost:8080/user/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: accountRequest.preferredUsername,
            userType: 'PROFESSIONAL'
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create user');
        return response.text();
    })
    .then(result => {
        console.log('User created:', result);
        
        // Now create professional
        createProfessional(accountRequest);
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });
}

function createProfessional(accountRequest) {
    // Gather professional information
    let professionalInfo = {
        username: accountRequest.preferredUsername,
        firstName: accountRequest.firstName,
        lastName: accountRequest.lastName,
        dob: accountRequest.dob,
        email: accountRequest.email,
        phoneNumber: accountRequest.phone,
        mailAddress: accountRequest.mailingAddress,
        city: accountRequest.city,
        state: accountRequest.state,
        zip: accountRequest.zip,
        degree: accountRequest.degree,
        institution: accountRequest.institution,
        dateOfAward: accountRequest.dateOfAward,
        qualificationCategories: [], // Array to hold categories
        qualificationKeywords: []    // Array to hold keywords
    };

    // Extract qualifications from the table, assuming they are in a table
    let table = document.getElementById("myTable");
    for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
        let row = table.rows[i];
        professionalInfo.qualificationCategories.push(row.cells[0].textContent);
        professionalInfo.qualificationKeywords.push(row.cells[1].textContent);
    }
    console.log(professionalInfo);
    // Construct the body using URLSearchParams
    let body = new URLSearchParams();
    Object.keys(professionalInfo).forEach(key => {
        if (Array.isArray(professionalInfo[key])) {
            professionalInfo[key].forEach(item => body.append(key, item));
        } else {
            body.append(key, professionalInfo[key]);
        }
    });

    // Send the POST request
    fetch(`http://localhost:8080/professional/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // or response.json() if your server responds with JSON
    })
    .then(result => {
        console.log('Professional created:', result);
        // Optional: redirect or update the UI to indicate success
        createProfessionalPayment(accountRequest.preferredUsername);
    })
    .catch(error => {
        console.error('Error creating professional:', error);
    });
}

function createProfessionalPayment(username) {
    // Create professional payment
    fetch(`http://localhost:8080/professionalPayments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            paymentID: professionalID,
            paymentBalance: 150.00,
            //set the due date to 3 days from now
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create professional payment');
        return response.text();
    })
    .then(result => {
        console.log('Professional payment created:', result);
        
        // Here you can redirect or update the UI to indicate success
        alert('Professional account created successfully!');
        window.location.href = 'dashboard.html';

    })
    .catch(error => {
        console.error('Error creating professional payment:', error);
    });
}


function rejectEmployerRequest() {
    // Construct the form data
    let formData = new URLSearchParams();
    formData.append('status', 'REJECTED'); // Assuming 'status' is the field expected by your API

    // Update the status of the account request
    fetch(`http://localhost:8080/professionalAccountRequests/${professionalID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Content-Type for form data
        },
        body: formData // Send the form data
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(updatedRequest => {
        console.log('Request updated:', updatedRequest);
        alert('Professional account request rejected!');
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        console.error('Error updating professional account request:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchNextProfessionalAccountRequest();
    // // Add click event listener to the accept button
    
    document.getElementById('acceptButton').addEventListener('click', acceptProfessionalAccountRequest);
    // // Add click event listener to the reject button
    // document.getElementById('rejectButton').addEventListener('click', rejectEmployerRequest);
});
