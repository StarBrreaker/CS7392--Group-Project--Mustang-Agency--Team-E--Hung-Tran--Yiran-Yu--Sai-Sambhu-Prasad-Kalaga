let staffID = localStorage.getItem('username'); // Retrieve the username
let employerID = localStorage.getItem('selectedEmployerRequest'); // Retrieve the employer ID saved in localStorage

console.log('selectedEmployerID ', employerID);

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


  function fetchNextEmployerAccountRequest() {
    fetch('http://localhost:8080/employerAccountRequests/next')
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
            alert('No new employer account requests available');
        });
}

function displayRequestDetails(accountRequest) {
    document.getElementById('companyname').textContent = accountRequest.companyName;
    document.getElementById('regristrationnumber').textContent = accountRequest.registrationNumber;
    document.getElementById('industry').textContent = accountRequest.industry;
    document.getElementById('companysize').textContent = accountRequest.size;
    document.getElementById('pcfn').textContent = accountRequest.primaryContactFirstName;
    document.getElementById('pcln').textContent = accountRequest.primaryContactLastName;
    document.getElementById('pcEmail').textContent = accountRequest.primaryContactEmail;
    document.getElementById('pcPhone').textContent = accountRequest.primaryContactPhoneNumber;
    document.getElementById('companyaddress').textContent = accountRequest.primaryContactMailAddress;
    document.getElementById('companycity').textContent = accountRequest.city;
    document.getElementById('companystate').textContent = accountRequest.state;
    document.getElementById('companyzipcode').textContent = accountRequest.zip;
    document.getElementById('inputUrl').textContent = accountRequest.websiteLink;
    document.getElementById('companyUsername').textContent = accountRequest.preferredUsername;
    // Save the preferred username in localStorage
    localStorage.setItem('selectedEmployerRequest', accountRequest.preferredUsername);
}

function fetchEmployerAccountRequestDetails() {
    if (!employerID) {
        console.error('No employer ID found');
        return; // Exit if no employer ID is found
    }
    
    fetch(`http://localhost:8080/employerAccountRequests/${employerID}`) // Use the correct endpoint for fetching a single account request
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
            console.log(response);
            return response.json();
        })
        .then(accountRequest => {
            // Now populate the HTML with the fetched account request details
            document.getElementById('companyname').textContent = accountRequest.companyName;
            document.getElementById('regristrationnumber').textContent = accountRequest.registrationNumber;
            document.getElementById('industry').textContent = accountRequest.industry;
            document.getElementById('companysize').textContent = accountRequest.size;
            document.getElementById('pcfn').textContent = accountRequest.primaryContactFirstName;
            document.getElementById('pcln').textContent = accountRequest.primaryContactLastName;
            document.getElementById('pcEmail').textContent = accountRequest.primaryContactEmail;
            document.getElementById('pcPhone').textContent = accountRequest.primaryContactPhoneNumber;
            document.getElementById('companyaddress').textContent = accountRequest.primaryContactMailAddress;
            document.getElementById('companycity').textContent = accountRequest.city;
            document.getElementById('companystate').textContent = accountRequest.state;
            document.getElementById('companyzipcode').textContent = accountRequest.zip;
            document.getElementById('inputUrl').textContent = accountRequest.websiteLink;
            document.getElementById('companyUsername').textContent = accountRequest.preferredUsername;
        })
        .catch(error => {
            console.error('Error fetching employer details:', error);
        });
}

function acceptEmployerAccountRequest() {
    
    // Construct the form data
    let formData = new URLSearchParams();
    formData.append('status', 'ACCEPTED'); // Assuming 'status' is the field expected by your API

    // Update the status of the account request
    fetch(`http://localhost:8080/employerAccountRequests/${employerID}`, {
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
        createUserAndEmployer(updatedRequest);
    })
    .catch(error => {
        console.error('Error updating employer account request:', error);
    });
}
function createUserAndEmployer(accountRequest) {
    // Create user
    fetch(`http://localhost:8080/user/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: accountRequest.preferredUsername,
            userType: 'EMPLOYER'
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create user');
        return response.text();
    })
    .then(result => {
        console.log('User created:', result);
        
        // Now create employer
        createEmployer(accountRequest);
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });
}

function createEmployer(accountRequest) {
    // Create employer
    fetch(`http://localhost:8080/employer/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: accountRequest.preferredUsername,
            companyName: accountRequest.companyName,
            registrationNumber: accountRequest.registrationNumber,
            industry: accountRequest.industry,
            size: accountRequest.size,
            primaryContactFirstName: accountRequest.primaryContactFirstName,
            primaryContactLastName: accountRequest.primaryContactLastName,
            primaryContactEmail: accountRequest.primaryContactEmail,
            primaryContactPhoneNumber: accountRequest.primaryContactPhoneNumber,
            primaryContactMailAddress: accountRequest.primaryContactMailAddress,
            city: accountRequest.city,
            state: accountRequest.state,
            zip: accountRequest.zip,
            websiteLink: accountRequest.websiteLink


            // Continue adding the other fields similar to above...
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create employer');
        return response.text();
    })
    .then(result => {
        console.log('Employer created:', result);
        
        // Here you can redirect or update the UI to indicate success
        createEmployerPayment(accountRequest.preferredUsername);
    })
    .catch(error => {
        console.error('Error creating employer:', error);
    });
}

function createEmployerPayment(employerID) {
    // Create professional payment
    fetch(`http://localhost:8080/employerPayments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            paymentID: employerID,
            paymentBalance: 500.00,
            //set the due date to 3 days from now
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create employer payment');
        return response.text();
    })
    .then(result => {
        console.log('Employer payment created:', result);
        
        // Here you can redirect or update the UI to indicate success
        alert('Employer account created successfully!');
        window.location.href = 'dashboard-staff-pending-account-requests.html';

    })
    .catch(error => {
        console.error('Error creating Employer payment:', error);
    });

}

function rejectEmployerRequest() {
    // Construct the form data
    let formData = new URLSearchParams();
    formData.append('status', 'REJECTED'); // Assuming 'status' is the field expected by your API

    // Update the status of the account request
    fetch(`http://localhost:8080/employerAccountRequests/${employerID}`, {
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
        alert('Employer account request rejected!');
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        console.error('Error updating employer account request:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchNextEmployerAccountRequest();

    // Add click event listener to the accept button
    
    document.getElementById('acceptButton').addEventListener('click', acceptEmployerAccountRequest);

});
