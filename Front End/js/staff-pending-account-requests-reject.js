let staffID = localStorage.getItem('username'); // Retrieve the username
let employerID = localStorage.getItem('selectedEmployerRequest'); // Retrieve the username

function fetchStaffInfomation() {
    fetch(`http://localhost:8080/staff/${staffID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        // Display the user info on the page
        document.getElementById("navStaffID").textContent = 'Hi, ' + data.staffID;
    })

    .catch((error) => {
        console.error('Error:', error);
    });
  }

function fetchEmployerAccountRequestDetail() {
    if (!employerID) {
        console.error('No employer ID found');
        return; // Exit if no professional ID is found
    }
    // console.log('employerID is:', employerID);
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
            document.getElementById('email').textContent = accountRequest.primaryContactEmail;


        })
        .catch(error => {
            console.error('Error fetching employer details:', error);
        });
}
 
function sendEmail() {
    const email = document.getElementById('email').textContent; // Assumes email address is displayed in a span or similar element
    const subject = document.getElementById('companyRejectSubject').value;
    const message = document.getElementById('companyRejectMessage').value;

    // Construct the form data
    const formData = new URLSearchParams();
    formData.append('toEmail', email);
    formData.append('subject', subject);
    formData.append('message', message);

    // Send the email data to the backend
    fetch('http://localhost:8080/send-email', { // Make sure the URL matches your server configuration
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        return response.text(); // Assuming the server response is just a text message
    })
    .then(data => {
        console.log('Email sent successfully:', data);
        alert('Email sent successfully!');
        rejectEmployerRequest();
    })
    .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send email: ' + error.message);
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
        window.location.href = 'dashboard-staff-pending-account-requests.html';
    })
    .catch(error => {
        console.error('Error updating employer account request:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    //change sendButton to the id of the button you want to add the event listener to
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission if the button is part of a form
        sendEmail();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchEmployerAccountRequestDetail();

});