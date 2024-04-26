let username = localStorage.getItem('username');
let jobID = localStorage.getItem('selectedJobId');

function fetchEmployerInfo() {
    console.log(jobID);
    if (!username) {
        console.log("Employer not found in local storage.");
        return;  // Exit if there is no username stored
    }

    fetch(`http://localhost:8080/employer/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch employer data');
        }
        return response.json();
    })
    .then(data => {
        if (data.employerID) {
            document.getElementById("navEmployerID").textContent = 'Hi, ' + data.employerID;
        } else {
            console.log("Employer ID not found in response.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function displayJobDetails() {
    if (!jobID) {
        console.log("Job ID not found in local storage.");
        return;  // Exit if there is no job ID stored
    }

    fetch(`http://localhost:8080/jobdescriptions/${jobID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch job details');
        }
        return response.json();
    })
    .then(data => {
        if (data.jobID) {
            document.getElementById('companynewuniqueid').textContent = data.jobID;
            document.getElementById('positionName').textContent = data.positionName;
            document.getElementById('companynewfirstname').value = data.primaryContactFirstName;
            document.getElementById('companynewlastname').value = data.primaryContactLastName;
            document.getElementById('companynewemail').value = data.email;
            document.getElementById('companynewPhone').value = data.phoneNumber;
            document.getElementById('companynewstartdate').value = data.startDate;
            document.getElementById('companynewenddate').value = data.endDate;
            document.getElementById('companynewpayperhour').value = data.payPerHour;
            document.getElementById('companynewstarttime').value = data.startTime;
            document.getElementById('companynewendtime').value = data.endTime;

        //Display qualifications
        let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.qualifications.forEach(qualification => {
            let row = tableBody.insertRow();
            let categoryCell = row.insertCell(0);
            let keywordsCell = row.insertCell(1);

            categoryCell.textContent = qualification.category;
            keywordsCell.textContent = qualification.keywords;
            
            let editButton = document.createElement('editButton');

            let removeCell = row.insertCell(2); // New cell for the remove button
            // Create the remove button
            let removeButton = document.createElement('button');
            removeButton.disabled = true;
            removeButton.className = 'btn btn-danger';
            removeButton.textContent = 'Remove';
            
            editButton.addEventListener('click', function() {
                removeButton.disabled = false;
            });

            removeButton.addEventListener('click', function() {
                // Remove the row when the button is clicked
                row.parentNode.removeChild(row);
            });
            removeCell.appendChild(removeButton);
        });


        } else {
            console.log("Job ID not found in response.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function saveJobInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
       event.preventDefault(); // Prevent the form from being submitted normally
       
        // Check for empty fields
        if (!notEmpty()) {
            document.getElementById("savespan").innerHTML = "Satisfy all the above conditions"
            return
          }
          document.getElementById("savespan").innerHTML = ""
    
    
    
          isEditClicked = false;
    
          document.getElementById("companynewuniqueid").setAttribute('readonly', 'true');
          document.getElementById("companynewfirstname").setAttribute('readonly', 'true');
          document.getElementById("companynewlastname").setAttribute('readonly', 'true');
          document.getElementById("companynewemail").setAttribute('readonly', 'true');
          document.getElementById("companynewPhone").setAttribute('readonly', 'true');
          document.getElementById("companynewstartdate").setAttribute('readonly', 'true');
          document.getElementById("companynewenddate").setAttribute('readonly', 'true');
          document.getElementById("companynewpayperhour").setAttribute('readonly', 'true');
          document.getElementById("companynewstarttime").setAttribute('readonly', 'true');
          document.getElementById("companynewendtime").setAttribute('readonly', 'true');
        //   document.getElementById("companynewcity").setAttribute('readonly', 'true');
          document.getElementById("categoryField")['disabled'] = true;
          document.getElementById("keywordsField")['disabled'] = true;
          document.getElementById("addButton")['disabled'] = true;
          // document.getElementById("companyzipcode").removeAttribute('readonly');
          // document.getElementById("companycountry").removeAttribute('readonly');
          // document.getElementById("companywebsite").removeAttribute('readonly');
          // document.getElementById("staffrole").removeAttribute('readonly');
          var table = document.getElementById("myTable");
          for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
              if (i > 0 && j == 2) {
                col.innerHTML = '<button disabled onclick="removeRow(this)" class="btn btn-danger">Remove</button>';
              }
            }
          }
    

       let updateJobInfo = {
              positionName: document.getElementById('positionName').textContent,
              primaryContactFirstName: document.getElementById('companynewfirstname').value,
              primaryContactLastName: document.getElementById('companynewlastname').value,
              email: document.getElementById('companynewemail').value,
              phoneNumber: document.getElementById('companynewPhone').value,
              startDate: document.getElementById('companynewstartdate').value,
              endDate: document.getElementById('companynewenddate').value,
              payPerHour: document.getElementById('companynewpayperhour').value,
              startTime: document.getElementById('companynewstarttime').value,
              endTime: document.getElementById('companynewendtime').value,
              employerId: username,
              // Add more fields as needed
        };

        // let table = document.getElementById('myTable');
        let qualificationCategories = [];
        let qualificationKeywords = [];
        for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
             let row = table.rows[i];
             qualificationCategories.push(row.cells[0].textContent);
             qualificationKeywords.push(row.cells[1].textContent);
        }
        updateJobInfo.qualificationCategories = qualificationCategories;
        updateJobInfo.qualificationKeywords = qualificationKeywords;
        
        // Format the data as query parameters
        console.log("Update Job Information:", updateJobInfo);

        
        

    
    let queryParams = new URLSearchParams();
    for (let key in updateJobInfo) {
        if (Array.isArray(updateJobInfo[key])) {
            updateJobInfo[key].forEach(item => queryParams.append(key, item));
        } else {
            queryParams.append(key, updateJobInfo[key]);
        }
    } 
    // console.log(queryParams.toString());
    fetch(`http://localhost:8080/jobdescriptions/${jobID}`, {
        method: 'PUT',
        body: new URLSearchParams(queryParams),
    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        return JSON.parse(text);
    })
    .then(data => {
        console.log('Success:', data);
        alert('Job description updated successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
}

function deleteJobDescription () {
    document.getElementById('deleteButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally

        fetch(`http://localhost:8080/jobdescriptions/${jobID}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete job description');
            }
            return response.text();
        })
        .then(text => {
            console.log(text);
            // return JSON.parse(text);
        })
        .then(data => {
            console.log('Success:', data);
            alert('Job description deleted successfully!');
            window.location.href = 'dashboard-company-job-posting-management.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

}

document.addEventListener('DOMContentLoaded', function() {
    fetchEmployerInfo();
    displayJobDetails();
    saveJobInfo();
    deleteJobDescription();
});
