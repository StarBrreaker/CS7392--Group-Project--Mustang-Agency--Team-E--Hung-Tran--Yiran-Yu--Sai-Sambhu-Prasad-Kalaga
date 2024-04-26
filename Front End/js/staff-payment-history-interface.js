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


function getEmployerPayment() {
    fetch('http://localhost:8080/employer/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("employerPaymentTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((employerPayment, index) => {
                let row = tableBody.insertRow();
                let numberCell = row.insertCell(0);
                let companyNameCell = row.insertCell(1);
                let industryCell =  row.insertCell(2);
                let emailCell = row.insertCell(3);
                let phoneCell = row.insertCell(4);
                let cityCell = row.insertCell(5);
                let statusCell = row.insertCell(6);
                let viewDetailsCell = row.insertCell(7);

                numberCell.textContent = index + 1;
                companyNameCell.textContent = employerPayment.companyName;
                industryCell.textContent = employerPayment.industry;
                emailCell.textContent = employerPayment.primaryContactEmail;
                phoneCell.textContent = employerPayment.primaryContactPhoneNumber;
                cityCell.textContent = employerPayment.city;


                // Fetch the employer payment details
                fetch(`http://localhost:8080/employerPayments/${employerPayment.employerID}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(employerPayment => {
                        // Display the employer payment details on the page
                        statusCell.textContent = employerPayment.paymentStatus;
                    })
                    .catch(error => {
                        console.error('Error fetching employer payment details:', error);
                    });
                    
                //Add a view details link
                let viewDetailsLink = document.createElement('a');
                viewDetailsLink.textContent = 'View Details';
                viewDetailsLink.href = 'dashboard-staff-company-acc-management-viewdetails.html';
                viewDetailsLink.onclick = function() {
                    localStorage.setItem('selectedEmployerID', employerPayment.employerID);
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
    getEmployerPayment();
});
