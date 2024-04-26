let staffID = localStorage.getItem('username'); // Retrieve the username


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

function fetchEmployerAccountDeletetionRequestDetails() {    
    fetch('http://localhost:8080/employerAccountDeletionRequests/allPending')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let tableBody = document.getElementById("employerDeleteRequestTable").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.forEach((request, index) => {
            let row = tableBody.insertRow();
            let numberCell = row.insertCell(0);
            let usernameCell = row.insertCell(1);
            let statusCell = row.insertCell(2);
            let timeStampcell = row.insertCell(3);
            let actionCell = row.insertCell(4);

        
            numberCell.textContent = index + 1;
            usernameCell.textContent = request.username;
            statusCell.textContent = request.status;
            timeStampcell.textContent = request.timestamp;
            //Add a Deactivate Button
            let deactivateButton = document.createElement('DeactivateButton');
            deactivateButton.textContent = 'Deactivate';
            deactivateButton.className = 'btn btn-outline-primary';
            deactivateButton.style.color = 'red';

            

            // Append the button to the action cell, not directly to the row
            actionCell.appendChild(deactivateButton);

            // Add event listener correctly
            deactivateButton.addEventListener('click', () => updateStatusThenDeactivate(request.username, request.requestId));
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateStatusThenDeactivate(username, requestId) {
    // First update the status to 'approved'
    fetch(`http://localhost:8080/employerAccountDeletionRequests/${requestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ status: 'APRROVED' })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(updatedRequest => {
        console.log('Status updated:', updatedRequest);
        // If the status update was successful, proceed to deactivate the account
        deactivateAccount(username);
    })
    .catch(error => {
        console.error('Error updating status:', error);
        alert('Failed to update status: ' + error.message);
    });
}

function deactivateAccount(username) {
    fetch(`http://localhost:8080/user/deactivate`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username
        })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        // return response.json();
    })
    .then(data => {
        console.log('Account Deactivated:', data);
        alert('Account Deactivated');
        // Refresh the table
        fetchEmployerAccountDeletetionRequestDetails();
    })
}

window.onload = function() {
    fetchStaffInfomation();
    fetchEmployerAccountDeletetionRequestDetails();
    
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('DeactivateButton').addEventListener('click', deactivateAccount( ));

});