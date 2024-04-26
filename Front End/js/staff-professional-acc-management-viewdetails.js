let staffID = localStorage.getItem('username'); // Retrieve the username
let professionalID = localStorage.getItem('selectedProfessionalID'); // Retrieve the professional ID saved in localStorage

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
        console.log(data);
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
        document.getElementById("professionalID").textContent = data.professionalID;

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

        // Create the remove button
        let removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';
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

function saveProfessionalInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally
        
        // Check for empty fields
        if (!notEmpty()) {
            document.getElementById("savesub").innerHTML = 'Satisfy all the above!'
    
            return
          }
    
          document.getElementById("savesub").innerHTML = ""
    
          isEditClicked = false;
    
    
          document.getElementById("Profirstname").setAttribute('readonly', 'true');
          document.getElementById("Prolastname").setAttribute('readonly', 'true');
          document.getElementById("ProDOB").setAttribute('readonly', 'true');
          document.getElementById("ProEmail").setAttribute('readonly', 'true');
          document.getElementById("ProPhone").setAttribute('readonly', 'true');
          document.getElementById("Proaddress").setAttribute('readonly', 'true');
          document.getElementById("Procity").setAttribute('readonly', 'true');
          document.getElementById("Prostate").setAttribute('readonly', 'true');
          document.getElementById("Prozipcode").setAttribute('readonly', 'true');
          document.getElementById("Procountry").setAttribute('readonly', 'true');
          document.getElementById("ProDegree").setAttribute('readonly', 'true');
          document.getElementById("ProInstitution").setAttribute('readonly', 'true');
          document.getElementById("ProDateAward").setAttribute('readonly', 'true');
          document.getElementById("categoryField")['disabled'] = true;
          document.getElementById("keywordsField")['disabled'] = true;
          document.getElementById("addButton")['disabled'] = true;
    
          var table = document.getElementById("myTable");
          for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
              if (i > 0 && j == 2) {
                col.innerHTML = '<button disabled onclick="removeRow(this)" class="btn btn-danger">Remove</button>';
              }
            }
          }
        
        // Gather the updated professional info
        let updatedInfo = {
            firstName: document.getElementById("Profirstname").value,
            lastName: document.getElementById("Prolastname").value,
            dob: document.getElementById("ProDOB").value,
            email: document.getElementById("ProEmail").value,
            phoneNumber: document.getElementById("ProPhone").value,
            mailAddress: document.getElementById("Proaddress").value,
            city: document.getElementById("Procity").value,
            state: document.getElementById("Prostate").value,
            zip: document.getElementById("Prozipcode").value,
            degree: document.getElementById("ProDegree").value,
            institution: document.getElementById("ProInstitution").value,
            dateOfAward: document.getElementById("ProDateAward").value,

            // Add more fields as needed
        };

        // Gather the qualifications from the table
        // let table = document.getElementById('myTable');
        let qualificationCategories = [];
        let qualificationKeywords = [];
        for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
            let row = table.rows[i];
            qualificationCategories.push(row.cells[0].textContent);
            qualificationKeywords.push(row.cells[1].textContent);
        }
        updatedInfo.qualificationCategories = qualificationCategories;
        updatedInfo.qualificationKeywords = qualificationKeywords;
        
        // Format the data as query parameters
        let queryParams = new URLSearchParams();
        for (let key in updatedInfo) {
            if (Array.isArray(updatedInfo[key])) {
                // If the key is an array, append each item individually
                updatedInfo[key].forEach(item => queryParams.append(key, item));
            } else {
                queryParams.append(key, updatedInfo[key]);
            }
        }

        console.log(queryParams.toString());
        fetch(`http://localhost:8080/professional/${professionalID}?${queryParams.toString()}`, {
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
    });
}


function deactivateProfessionalAccount() {
    document.getElementById('deactivate').addEventListener('click', function(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/user/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: professionalID
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

function fetchBillingInfo() {
    fetch(`http://localhost:8080/professionalPayments/${professionalID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            // Display the employer info on the page
            console.log(data);
            document.getElementById("paymentBalance").textContent = data.paymentBalance;
            document.getElementById("paymentStatus").textContent = data.paymentStatus;
            document.getElementById("dueDate").textContent = data.dueDate;
            document.getElementById("nextBillingDate").textContent = data.nextBillingDate;



        })
    
        .catch((error) => {
            console.error('Error:', error);
        });
}



window.onload = function() {
    fetchStaffInfomation();
    fetchProfessionalInfo();
    saveProfessionalInfo();
    deactivateProfessionalAccount();
    fetchBillingInfo();
    
}
