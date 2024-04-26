let professionalID = localStorage.getItem('username'); // Retrieve the username

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
function saveProfessionalInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally
        
        if (!notEmpty()){
            document.getElementById("savespan").innerHTML = "Satisfy all the above conditions"
            return
          }
          document.getElementById("savespan").innerHTML = ""
    
          
    
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
        // Check for empty fields

        
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
        //let table = document.getElementById('myTable');
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
            // Redirect to the to the same page
            window.location.href = 'dashboard-professional-profile-management.html';
        })

        
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}
function deleteAccountRequest() {
    document.getElementById('deleteAccountbtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally

        // Create the request object
        let request = {
            username: professionalID,
            // Add more fields as needed
        };
        console.log(request);
        fetch('http://localhost:8080/professionalAccountDeletionRequests/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    saveProfessionalInfo();
    deleteAccountRequest();
});


window.onload = fetchProfessionalInfo; // Fetch professional info when the page loadsz