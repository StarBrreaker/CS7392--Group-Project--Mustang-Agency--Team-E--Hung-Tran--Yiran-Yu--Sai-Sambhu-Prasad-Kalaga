let staffID = localStorage.getItem('username'); // Retrieve the username
let employerID = localStorage.getItem('selectedEmployerID'); // Retrieve the employer ID saved in localStorage

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




function fetchEmployerInfo() {
    console.log(employerID);
    fetch(`http://localhost:8080/employer/${employerID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        // Display the employer info on the page
        console.log(data);
        document.getElementById("companyname").value = data.companyName;
        document.getElementById("companyregnumber").value = data.registrationNumber;
        document.getElementById("companyindustry").value = data.industry;
        document.getElementById("companyindustry").value = data.industry;
        document.getElementById("companysize").value = data.size;
        document.getElementById("companyfirstname").value = data.primaryContactFirstName;
        document.getElementById("companylastname").value = data.primaryContactLastName;
        document.getElementById("companyemail").value = data.primaryContactEmail;
        document.getElementById("companynumber").value = data.primaryContactPhoneNumber;
        document.getElementById("companyaddress").value = data.primaryContactMailAddress;
        document.getElementById("companycity").value = data.city;
        document.getElementById("companystate").value = data.state;
        document.getElementById("companyzipcode").value = data.zip;
        document.getElementById("companywebsite").value = data.websiteLink;
        document.getElementById("preferredUsername").textContent = data.employerID;
    })

    .catch((error) => {
        console.error('Error:', error);
    });
}

function saveEmployerInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault();

        // Check for empty fields
        if (!notEmpty()) {
            document.getElementById("savespan").innerHTML = "Satisfy all the above conditions"
            return
          }
          document.getElementById("savespan").innerHTML = ""
    
    
    
          isEditClicked = false;
          document.getElementById("companyname").setAttribute('readonly', 'true');
          document.getElementById("companyregnumber").setAttribute('readonly', 'true');
          document.getElementById("companyindustry").setAttribute('readonly', 'true');
          document.getElementById("companysize").setAttribute('readonly', 'true');
          document.getElementById("companyfirstname").setAttribute('readonly', 'true');
          document.getElementById("companylastname").setAttribute('readonly', 'true');
          document.getElementById("companyemail").setAttribute('readonly', 'true');
          document.getElementById("companynumber").setAttribute('readonly', 'true');
          document.getElementById("companyaddress").setAttribute('readonly', 'true');
          document.getElementById("companycity").setAttribute('readonly', 'true');
          document.getElementById("companystate").setAttribute('readonly', 'true');
          document.getElementById("companyzipcode").setAttribute('readonly', 'true');
          document.getElementById("companywebsite").setAttribute('readonly', 'true');

        let updatedEmployerInfo = {
            companyName: document.getElementById('companyname').value,
            registrationNumber: document.getElementById('companyregnumber').value,
            industry: document.getElementById('companyindustry').value,
            size: document.getElementById('companysize').value,
            primaryContactFirstName: document.getElementById('companyfirstname').value,
            primaryContactLastName: document.getElementById('companylastname').value,
            primaryContactEmail: document.getElementById('companyemail').value,
            primaryContactPhoneNumber: document.getElementById('companynumber').value,
            primaryContactMailAddress: document.getElementById('companyaddress').value,
            city: document.getElementById('companycity').value,
            state: document.getElementById('companystate').value,
            zip: document.getElementById('companyzipcode').value,
            websiteLink: document.getElementById('companywebsite').value,
        };

        let queryParams = new URLSearchParams();
        for (let key in updatedEmployerInfo) {
            queryParams.append(key, updatedEmployerInfo[key]);
        }

        fetch(`http://localhost:8080/employer/${employerID}?${queryParams.toString()}`, {
            method: 'PUT',

        })
        .then(response  => response.text())
        .then(text => {
            console.log(text);
            alert(text);
            //return JSON.parse(text);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }); 
}

function deactivateEmployerAccount() {
    document.getElementById('deactivate').addEventListener('click', function(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/user/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: employerID
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
    fetch(`http://localhost:8080/employerPayments/${employerID}`, {
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

document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    fetchEmployerInfo();
    saveEmployerInfo();
    deactivateEmployerAccount();
    fetchBillingInfo();
    // // Add click event listener to the accept button
    
 
});
