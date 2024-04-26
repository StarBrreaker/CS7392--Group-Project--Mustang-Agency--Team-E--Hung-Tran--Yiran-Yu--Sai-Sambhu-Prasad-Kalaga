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



  function getEmployerAccountRequest() {
    fetch('http://localhost:8080/employerAccountRequests/allPending')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("employerRequestTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((employer, index) => {
                let row = tableBody.insertRow();
                row.addEventListener('click', () => storeEmployerAccountRequestAndNavigate(employer.preferredUsername));
                let numberCell = row.insertCell(0);
                let companyNameCell = row.insertCell(1);
                let emailCell = row.insertCell(2);
                let phoneCell = row.insertCell(3);
                let cityCell = row.insertCell(4);

                numberCell.textContent = index + 1;
                companyNameCell.textContent = employer.companyName;
                emailCell.textContent = employer.primaryContactEmail;
                phoneCell.textContent = employer.primaryContactPhoneNumber;
                cityCell.textContent = employer.city;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function storeEmployerAccountRequestAndNavigate(preferredUsername) {
    console.log('Storing Employer ID:', preferredUsername);
    localStorage.setItem('selectedEmployerRequest', preferredUsername);
    window.location.href = 'dashboard-staff-employer-account-request-details.html';
}

function getProfessionalAccountRequest() {
    fetch('http://localhost:8080/professionalAccountRequests/allPending')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("professionalRequestTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((professional, index) => {
                let row = tableBody.insertRow();
                row.addEventListener('click', () => storeProfessionalAccountRequestAndNavigate(professional.preferredUsername));
                let numberCell = row.insertCell(0);
                let firstNameCell = row.insertCell(1);
                let lastNameCell = row.insertCell(2);
                let emailCell = row.insertCell(3);
                let phoneCell = row.insertCell(4);
                let cityCell = row.insertCell(5);

                numberCell.textContent = index + 1;
                firstNameCell.textContent = professional.firstName;
                lastNameCell.textContent = professional.lastName;
                emailCell.textContent = professional.email;
                phoneCell.textContent = professional.phone;
                cityCell.textContent = professional.city;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function storeProfessionalAccountRequestAndNavigate(preferredUsername) {
    console.log('Storing Professional ID:', preferredUsername);
    localStorage.setItem('selectedProfessionalRequest', preferredUsername);
    window.location.href = 'dashboard-staff-professional-account-request-details.html';
}

function getEmployerAccount() {
    fetch('http://localhost:8080/employer/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("employerTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((employer, index) => {
                let row = tableBody.insertRow();
                row.addEventListener('click', () => storeEmployerAccountRequestAndNavigate(employer.preferredUsername));
                let numberCell = row.insertCell(0);
                let companyNameCell = row.insertCell(1);
                let industryCell = row.insertCell(2);
                let emailCell = row.insertCell(3);
                let phoneCell = row.insertCell(4);
                let cityCell = row.insertCell(5);

                numberCell.textContent = index + 1;
                companyNameCell.textContent = employer.companyName;
                industryCell.textContent = employer.industry;
                emailCell.textContent = employer.primaryContactEmail;
                phoneCell.textContent = employer.primaryContactPhoneNumber;
                cityCell.textContent = employer.city;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function storeEmployerAccountAndNavigate() {
    console.log('Storing Employer ID:', preferredUsername);
    localStorage.setItem('selectedEmployerID', preferredUsername);
    window.location.href = 'dashboard-staff-company-acc-managemant.html';

}

function getProfessionalAccount() {
    fetch('http://localhost:8080/professional/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("professionalTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((professional, index) => {
                let row = tableBody.insertRow();
                row.addEventListener('click', () => storeProfessionalAccountRequestAndNavigate(professional.preferredUsername));
                let numberCell = row.insertCell(0);
                let firstNameCell = row.insertCell(1);
                let lastNameCell = row.insertCell(2);
                let emailCell = row.insertCell(3);
                let phoneCell = row.insertCell(4);
                let cityCell = row.insertCell(5);

                numberCell.textContent = index + 1;
                firstNameCell.textContent = professional.firstName;
                lastNameCell.textContent = professional.lastName;
                emailCell.textContent = professional.email;
                phoneCell.textContent = professional.phoneNumber;
                cityCell.textContent = professional.city;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = function() {
    fetchStaffInfomation();
    getEmployerAccountRequest();
    getProfessionalAccountRequest();
    getEmployerAccount();
    getProfessionalAccount();

}
