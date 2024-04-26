let staffID = localStorage.getItem('selectedStaffID');

function fetchStaffInfomation() {
    console.log('Staff ID is:', staffID);
    fetch(`http://localhost:8080/staff/${staffID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Display the professional info on the page
        // document.getElementById("navStaffID").textContent = 'Hi, ' + data.staffID;
        document.getElementById("stafffirstname").value = data.firstName;
        document.getElementById("stafflastname").value = data.lastName;
        document.getElementById("staffdob").value = data.dob;
        document.getElementById("staffemail").value = data.email;
        document.getElementById("staffphnnum").value = data.phoneNumber;
        document.getElementById("staffusername").textContent = data.staffID;

    })

    .catch((error) => {
        console.error('Error:', error);
    });
}

function fetchProfessionalInfo() {
    console.log(professionalID);
    fetch(`http://localhost:8080/professional/${professionalID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        // Display the professional info on the page
        document.getElementById("professionalID").textContent = data.professionalID;
        document.getElementById("navProfessionalID").textContent = 'Hi, ' + data.professionalID;
        document.getElementById("Profirstname").value = data.firstName;
        document.getElementById("Prolastname").value = data.lastName;
        document.getElementById("ProDOB").value = data.dob;
        document.getElementById("ProEmail").value = data.email;
        document.getElementById("ProPhone").value = data.phoneNumber;
        document.getElementById("Proaddress").value = data.mailAddress;
        document.getElementById("Procity").value = data.city;
        document.getElementById("Prostate").value = data.state;
        document.getElementById("Prozipcode").value = data.zip;
        document.getElementById("ProDegree").value = data.degree;
        document.getElementById("ProInstitution").value = data.institution;
        document.getElementById("ProDateAward").value = data.dateOfAward;


        // Display qualifications
        // Display qualifications
        let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.qualifications.forEach(qualification => {
        let row = tableBody.insertRow();
        let categoryCell = row.insertCell(0);
        let keywordsCell = row.insertCell(1);
        let removeCell = row.insertCell(2); // New cell for the remove button

        categoryCell.textContent = qualification.category;
        keywordsCell.textContent = qualification.keywords;

        let editButton = document.createElement('editButton');

        // Create the remove button
        let removeButton = document.createElement('button');
        removeButton.disabled = true;
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';

        // Enable the remove button when the edit button is clicked
        editButton.addEventListener('click', function() {
        removeButton.disabled = false;
        });

        removeButton.addEventListener('click', function() {
            // Remove the row when the button is clicked
            row.parentNode.removeChild(row);
        });

        // Add the remove button to the cell
        removeCell.appendChild(removeButton);
    });
    })

    .catch((error) => {
        console.error('Error:', error);
    });
}


function saveStaffInfo() {
    if (!notEmpty()){
        document.getElementById("savespan").innerHTML = "Satisfy all the above conditions"
        return
    }
    document.getElementById("savespan").innerHTML = ""



    isEditClicked = false;
    document.getElementById("stafffirstname").setAttribute('readonly', 'true');
    document.getElementById("staffdob").setAttribute('readonly', 'true');
    document.getElementById("stafflastname").setAttribute('readonly', 'true');
    // document.getElementById("staffgender").setAttribute('readonly', 'true');
    document.getElementById("staffemail").setAttribute('readonly', 'true');
    document.getElementById("staffphnnum").setAttribute('readonly', 'true');

    // Gather the updated professional info
    let updatedInfo = {
        firstName: document.getElementById("stafffirstname").value,
        lastName: document.getElementById("stafflastname").value,
        dob: document.getElementById("staffdob").value,
        email: document.getElementById("staffemail").value,
        phoneNumber: document.getElementById("staffphnnum").value,
        // Add more fields as needed
    };

    // Format the data as query parameters
    let queryParams = new URLSearchParams();
    for (let key in updatedInfo) {
        queryParams.append(key, updatedInfo[key]);
    }

    console.log(queryParams.toString());
    fetch(`http://localhost:8080/staff/${staffID}?${queryParams.toString()}`, {
        method: 'PUT',
    })
    .then(response => response.text())  // Get the response as text
    .then(text => {
        console.log(text);  // Log the raw response text
        alert(text);  // Display the response as an alert
        //return JSON.parse(text);  // Manually parse the text to JSON
    })

    .catch((error) => {
        console.error('Error:', error);
    });
}



function deactivateStaffAccount() {
    document.getElementById('deactivate').addEventListener('click', function(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/user/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: staffID
            })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            // return response.json();
        })
        .then(data => {
            alert('Account Deactivated');
        })
    }); 
}

document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    deactivateStaffAccount();
    document.getElementById('save').addEventListener('click', function(event) {
        event.preventDefault();
        saveStaffInfo();
    });
 
});
