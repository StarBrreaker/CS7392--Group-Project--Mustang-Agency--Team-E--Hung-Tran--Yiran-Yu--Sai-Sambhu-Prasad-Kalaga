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

function fetchStaffJobMatchingRequest() {
    fetch('http://localhost:8080/matchRequest/allPending')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("mathRequestTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((jobMatchingRequest, index) => {
                let row = tableBody.insertRow();
                let numberCell = row.insertCell(0);
                let firstNameCell = row.insertCell(1);
                let lastNameCell = row.insertCell(2);
                let phoneCell = row.insertCell(3);
                let emailCell = row.insertCell(4);
                let cityCell = row.insertCell(5);
                let viewDetailsCell = row.insertCell(6);

                numberCell.textContent = index + 1;
                firstNameCell.textContent = jobMatchingRequest.requestBy.firstName;
                lastNameCell.textContent = jobMatchingRequest.requestBy.lastName;
                phoneCell.textContent = jobMatchingRequest.requestBy.phoneNumber;
                emailCell.textContent = jobMatchingRequest.requestBy.email;
                cityCell.textContent = jobMatchingRequest.requestBy.city;

                //Add a view details link
                let viewDetailsLink = document.createElement('a');
                viewDetailsLink.textContent = 'View Details';
                viewDetailsLink.href = 'dashboard-staff-job-matching-interface.html';
                viewDetailsLink.onclick = function() {
                    localStorage.setItem('selectedProfessionalID', jobMatchingRequest.requestBy.professionalID);
                }
                viewDetailsCell.appendChild(viewDetailsLink);

               
            });
        })
        .catch(error => {
            console.error('Error fetching job matching requests:', error);
        });

}



document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchStaffJobMatchingRequest();

});
