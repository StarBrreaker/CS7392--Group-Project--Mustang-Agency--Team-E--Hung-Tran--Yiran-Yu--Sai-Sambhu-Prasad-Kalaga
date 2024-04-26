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

function getProfessionalPayment() {
    fetch('http://localhost:8080/professional/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("professionalPaymentTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((professionalPayment, index) => {
                let row = tableBody.insertRow();
                let numberCell = row.insertCell(0);
                let firstNameCell = row.insertCell(1);
                let lastNameCell = row.insertCell(2);
                let phoneCell = row.insertCell(3);
                let emailCell = row.insertCell(4);
                let cityCell = row.insertCell(5);
                let statusCell = row.insertCell(6);
                let viewDetailsCell = row.insertCell(7);

                numberCell.textContent = index + 1;
                firstNameCell.textContent = professionalPayment.firstName;
                lastNameCell.textContent = professionalPayment.lastName;
                phoneCell.textContent = professionalPayment.phoneNumber;
                emailCell.textContent = professionalPayment.email;
                cityCell.textContent = professionalPayment.city;


                // Fetch the employer payment details
                fetch(`http://localhost:8080/professionalPayments/${professionalPayment.professionalID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(professionalPayment => {
                        // Display the employer payment details on the page
                        statusCell.textContent = professionalPayment.paymentStatus;
                    })
                    .catch(error => {
                        console.error('Error fetching employer payment details:', error);
                    });
                    
                //Add a view details link
                let viewDetailsLink = document.createElement('a');
                viewDetailsLink.textContent = 'View Details';
                viewDetailsLink.href = 'dashboard-staff-professional-acc-management-viewdetails.html';
                viewDetailsLink.onclick = function() {
                    localStorage.setItem('selectedProfessionalID', professionalPayment.professionalID);
                }
                viewDetailsCell.appendChild(viewDetailsLink);
            });
        })
        .catch(error => {
            console.error('Error fetching employer payment details:', error);
        });
}




document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    getProfessionalPayment();

});
