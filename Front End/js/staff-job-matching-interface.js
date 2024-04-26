let staffID = localStorage.getItem('username'); // Retrieve the username
let professionalID = localStorage.getItem('selectedProfessionalID'); // Retrieve the employer ID saved in localStorage

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

function fetchMatchedProfessionalInfo() { 
    fetch(`http://localhost:8080/professional/${professionalID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Display the professional info on the page
        console.log(data);
        document.getElementById("username").textContent = data.professionalID;
        document.getElementById("firstName").textContent = data.firstName;
        document.getElementById("lastName").textContent = data.lastName;
        document.getElementById("email").textContent = data.email;
        document.getElementById("phone").textContent = data.phoneNumber;
        document.getElementById("mailingAddress").textContent = data.mailAddress;
        document.getElementById("city").textContent = data.city;
        document.getElementById("state").textContent = data.state;
        document.getElementById("zip").textContent = data.zip;
        document.getElementById("degree").textContent = data.degree;
        document.getElementById("institution").textContent = data.institution;
        document.getElementById("dateOfAward").textContent = data.dateOfAward;

        let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.qualifications.forEach(qualification => {
            let row = tableBody.insertRow();
            let categoryCell = row.insertCell(0);
            let keywordsCell = row.insertCell(1);

            categoryCell.textContent = qualification.category;
            keywordsCell.textContent = qualification.keywords;
        });
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function findMatches() {
    // Fetch the matched professionals
    console.log('professionalID is:', professionalID);
        fetch(`http://localhost:8080/matches/findMatches/${professionalID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Display the matched professionals on the page
            let tableBody = document.getElementById("matchTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((matchedProfessional, index) => {
                let row = tableBody.insertRow();
                let numberCell = row.insertCell(0);
                let positionCell = row.insertCell(1);
                let uniqueIDCell = row.insertCell(2);
                let companyCell = row.insertCell(3);
                let nameCell = row.insertCell(4);
                let emailCell = row.insertCell(5);
                let phoneCell = row.insertCell(6);

                
                numberCell.textContent = index + 1;
                positionCell.textContent = matchedProfessional.positionName;
                uniqueIDCell.textContent = matchedProfessional.jobID;
                companyCell.textContent = matchedProfessional.employer.companyName;
                nameCell.textContent = matchedProfessional.primaryContactFirstName + ' ' + matchedProfessional.primaryContactLastName;
                emailCell.textContent = matchedProfessional.email;
                phoneCell.textContent = matchedProfessional.phoneNumber;

                // Add the view details button to the cell
                // viewDetailsCell.appendChild(viewDetailsButton);
            });
        })
        


}

function notify() {
    console.log('professionalID is:', professionalID);
    fetch(`http://localhost:8080/matches/findMatchesAndNotify/${professionalID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert(data);
    })
    .catch(error => {
        console.error('Error fetching job matching requests:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchMatchedProfessionalInfo();
    // fetchEmployerAccountRequestDetails();

    // // Add click event listener to the accept button
    document.getElementById('matchbtn').addEventListener('click', findMatches);
    document.getElementById('notifybtn').addEventListener('click', notify);

});
