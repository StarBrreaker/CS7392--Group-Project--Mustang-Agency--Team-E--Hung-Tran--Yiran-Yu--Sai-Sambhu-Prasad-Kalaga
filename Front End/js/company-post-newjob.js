let username = localStorage.getItem('username');


var count = 1;
var isEditClicked = false;
function add() {
    var category = document.getElementById("categoryField").value;
    var keyword = document.getElementById("keywordsField").value;

    if (category == "") {
        document.getElementById("cl").innerHTML = 'Category Should Not Be Empty';
      } else {
        document.getElementById("cl").innerHTML = '';
      }

      if (keyword == "") {
        document.getElementById("kl").innerHTML = 'Keyword Should Not Be Empty';
      } else {
        document.getElementById("kl").innerHTML = '';
      }

    if (category.length == 0 || keyword.length == 0) {
    return;
    }

    var table = document.getElementById("myTable");
    var row = table.insertRow(count++);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);

    col1.innerHTML = category;
    col2.innerHTML = keyword;
    col3.innerHTML = '<button onclick="removeRow(this)" class="btn btn-danger">Remove</button>';

    document.getElementById("categoryField").value = "";
    document.getElementById("keywordsField").value = "";
    

    return false;
}

function removeRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    count--;  // Decrement the count of rows
}

function validate() {
    if (!notEmpty()) {
        document.getElementById("infodisplay").innerHTML = 'Please fill all required fields correctly.';
        return false; // Exit the function if any field is not properly filled
    }
    
    if(count < 3) {
        document.getElementById("infodisplay").innerHTML = 'Please Add Minimum 2 Qualifications';
        return false; 
    }else{
        // If all validations pass, you might want to proceed with form submission or a similar action
        document.getElementById("infodisplay").innerHTML = '';
        return true;
    }
}


function phoneval() {
    var inputNumbersValue = document.getElementById("companynewPhone").value.replace(/\D/g, ''); // Remove all non-digits
    if (inputNumbersValue.length == 10) { // Ensure it does not exceed 10 digits
    var formattedInputValue = '';
    var x = inputNumbersValue.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // Only format if there are at least some digits
    if (x) {
        // Construct the formatted string as per the matched groups
        formattedInputValue = x[1] ? '(' + x[1] : '';
        formattedInputValue += x[2] ? ')' + x[2] : '';
        formattedInputValue += x[3] ? '-' + x[3] : '';
    }
    document.getElementById("companynewPhone").value = formattedInputValue;
    document.getElementById("warning").innerHTML = "";
    } else {
    document.getElementById("warning").innerHTML = "Should Have 10 Digits";
    }
}

function editButton() {
    document.getElementById("companynewposition").removeAttribute('readonly');
    document.getElementById("companynewuniqueid").removeAttribute('readonly');
    document.getElementById("companynewfirstname").removeAttribute('readonly');
    document.getElementById("companynewlastname").removeAttribute('readonly');
    document.getElementById("companynewemail").removeAttribute('readonly');
    document.getElementById("companynewPhone").removeAttribute('readonly');
    document.getElementById("companynewcity").removeAttribute('readonly');
    document.getElementById("companynewstartdate").removeAttribute('readonly');
    document.getElementById("companynewenddate").removeAttribute('readonly');
    document.getElementById("companynewpayperhour").removeAttribute('readonly');
    document.getElementById("companynewstarttime").removeAttribute('readonly');
    document.getElementById("companynewendtime").removeAttribute('readonly');
    document.getElementById("categoryField")['disabled'] = false;
    document.getElementById("keywordsField")['disabled'] = false;
    document.getElementById("addButton")['disabled'] = false;
    var table = document.getElementById("myTable");
    for (var i = 0, row; row = table.rows[i]; i++) {
    for (var j = 0, col; col = row.cells[j]; j++) {
        if(i > 0 && j == 2){
        col.innerHTML = '<button onclick="removeRow(this)" class="btn btn-danger">Remove</button>';
        }
    }
    }

    notEmpty();

}


function notEmpty() {
    let flag = true;
    let todayDate = new Date().toISOString().split('T')[0];
    if (document.getElementById("companynewposition").value == "") {
    document.getElementById("cnewp").innerHTML = 'Name of the Position Should Not Be Empty';
    flag = false;
    } else {
    document.getElementById("cnewp").innerHTML = '';
    }

    if (document.getElementById("companynewuniqueid").value == "") {
    document.getElementById("cnewjobid").innerHTML = 'Unique ID Should Not Be Empty';
    flag = false;
    } else {
    document.getElementById("cnewjobid").innerHTML = '';
    }

    if (document.getElementById("companynewfirstname").value == "") {
    document.getElementById("cnewfirstname").innerHTML = 'First Name Should Not Be Empty';
    flag = false;
    } else {
    document.getElementById("cnewfirstname").innerHTML = '';
    }

    if (document.getElementById("companynewlastname").value == "") {
    document.getElementById("cnewlastname").innerHTML = 'Last Name Should Not Be Empty';
    flag = false;
    } else {
    document.getElementById("cnewlastname").innerHTML = '';
    }

    let emailp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if ((document.getElementById("companynewemail").value == "") || (!emailp.test(document.getElementById("companynewemail").value))) {
    document.getElementById("cnewemail").innerHTML = 'Enter Valid Email';
    flag = false;
    } else {
    document.getElementById("cnewemail").innerHTML = '';
    }

    // if (document.getElementById("companynewcity").value == "") {
    //   document.getElementById("cnewcity").innerHTML = 'City Should Not Be Empty';
    // } else {
    //   document.getElementById("cnewcity").innerHTML = '';
    // }

    let startDate = document.getElementById("companynewstartdate").value;
    let endDate = document.getElementById("companynewenddate").value;

    if (startDate < todayDate) {
    document.getElementById("cstartdate").innerHTML = 'Start date cannot be in the past';
    flag = false;
    } else {
    document.getElementById("cstartdate").innerHTML = '';
    }

    if (endDate < todayDate) {
    document.getElementById("cenddate").innerHTML = 'End date cannot be in the past';
    flag = false;
    } else {
    document.getElementById("cenddate").innerHTML = '';
    }

    if (endDate < startDate) {
    document.getElementById("cenddate").innerHTML = 'End date cannot be before start date';
    flag = false;
    } else if (!document.getElementById("cenddate").innerHTML.includes('in the past')) {
    document.getElementById("cenddate").innerHTML = '';
    }

    if (document.getElementById("companynewpayperhour").value == "") {
    document.getElementById("cpayperhour").innerHTML = 'Pay per hour($) Should Not Be Empty';
    flag = false;
    } else {
    document.getElementById("cpayperhour").innerHTML = '';
    }

    

    let startTime = document.getElementById("companynewstarttime").value;
    let endTime = document.getElementById("companynewendtime").value;

    if (document.getElementById("companynewstarttime").value == "") {
        document.getElementById("cnewstarttime").innerHTML = 'Start time cannot be empty';
        flag = false;
    } else {
        document.getElementById("cnewstarttime").innerHTML = '';
    }

    if (document.getElementById("companynewendtime").value == ""){
        document.getElementById("cnewendtime").innerHTML = 'End time cannot be empty';
        flag = false;
    } else {
        document.getElementById("cnewendtime").innerHTML = '';
    }

    if (startTime !== "" && endTime !== "") {
        if (startTime >= endTime) {
          document.getElementById("cnewstarttime").innerHTML = 'Start time must be earlier than end time';
          document.getElementById("cnewendtime").innerHTML = 'End time must be later than start time';
          flag = false;
        } else {
          document.getElementById("cnewstarttime").innerHTML = '';
          document.getElementById("cnewendtime").innerHTML = '';
        }
      }

    return flag;
}



function init() {

    console.log(document.getElementById("addButton")['disabled']);
    if (isEditClicked === false) {
        document.getElementById("categoryField")['disabled'] = true;
        document.getElementById("keywordsField")['disabled'] = true;
    }
}



function fetchEmployerInfo() {
    let username = localStorage.getItem('username');  // Retrieve the username from local storage
    if (!username) {
        console.log("Username not found in local storage.");
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

document.addEventListener('DOMContentLoaded', function() {
    fetchEmployerInfo();
    document.getElementById('postJobForm').addEventListener('submit', function(event) {
        event.preventDefault();
        postNewJob();
    
    });
    document.getElementById('addButton').addEventListener('click', function(event) {
        event.preventDefault();
        add();//addQualification();    
    });
});

function postNewJob() {
    if(!validate()){
        return false;
    }else{
    let jobDescriptionData = {
        jobID: document.getElementById("companynewuniqueid").value,
        positionName: document.getElementById("companynewposition").value,
        primaryContactFirstName: document.getElementById("companynewfirstname").value,
        primaryContactLastName: document.getElementById("companynewlastname").value,
        email: document.getElementById("companynewemail").value,
        phoneNumber: document.getElementById("companynewPhone").value,
        startDate: document.getElementById("companynewstartdate").value,
        endDate: document.getElementById("companynewenddate").value,
        payPerHour: parseFloat(document.getElementById("companynewpayperhour").value),
        startTime: document.getElementById("companynewstarttime").value,
        endTime: document.getElementById("companynewendtime").value,
        employerId: localStorage.getItem('username'), // Assuming 'username' is stored in localStorage as the employer ID
        qualificationCategories: [],
        qualificationKeywords: []
    };
    
    let table = document.getElementById('myTable');
    for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
        let row = table.rows[i];
        jobDescriptionData.qualificationCategories.push(row.cells[0].textContent);
        jobDescriptionData.qualificationKeywords.push(row.cells[1].textContent);
    }
    

    
    console.log('username is ' + username);

    fetch('http://localhost:8080/jobdescriptions/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: new URLSearchParams(jobDescriptionData)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Duplicate job ID or other conflict');
            }
            throw new Error('Server responded with an error!');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Job posted successfully!');
        
        
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
        // document.getElementById("postJobForm").textContent = error.message; // Display error message on the form
    });
    }
}



