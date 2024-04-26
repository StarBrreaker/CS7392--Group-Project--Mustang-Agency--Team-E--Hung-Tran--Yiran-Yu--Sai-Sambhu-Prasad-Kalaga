let employerID = localStorage.getItem('username'); // Retrieve the username

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
        // Display the professional info on the page
        document.getElementById("employerID").textContent = data.employerID;
        document.getElementById("companyname").value = data.companyName;
        document.getElementById("companyregnumber").value = data.registrationNumber;
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

        document.getElementById("navEmployerID").textContent = 'Hi, ' + data.employerID;
        

    })

    .catch((error) => {
        console.error('Error:', error);
    });
}
function saveEmployerInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally
        
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
          document.getElementById("companycountry").setAttribute('readonly', 'true');
          document.getElementById("companywebsite").setAttribute('readonly', 'true');

        // Gather the updated employer info
        let updatedInfo = {
            companyName: document.getElementById("companyname").value,
            registrationNumber: document.getElementById("companyregnumber").value,
            industry: document.getElementById("companyindustry").value,
            size: document.getElementById("companysize").value,
            primaryContactFirstName: document.getElementById("companyfirstname").value,
            primaryContactLastName: document.getElementById("companylastname").value,
            primaryContactEmail: document.getElementById("companyemail").value,
            primaryContactPhoneNumber: document.getElementById("companynumber").value,
            primaryContactMailAddress: document.getElementById("companyaddress").value,
            city: document.getElementById("companycity").value,
            state: document.getElementById("companystate").value,
            zip: document.getElementById("companyzipcode").value,
            websiteLink: document.getElementById("companywebsite").value,
            // Add more fields as needed
        };

        
        
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
        fetch(`http://localhost:8080/employer/${employerID}?${queryParams.toString()}`, {
            method: 'PUT',
        })
        .then(response => response.text())  // Get the response as text
        .then(text => {
            console.log(text);  // Log the raw response text
            // return JSON.parse(text);  // Manually parse the text to JSON
        })
        .then(data => {
            console.log('Success:', data);
            // Alert data to user
            alert('Employer info saved successfully!');
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
            username: employerID,
            // Add more fields as needed
        };
        console.log(request);
        fetch('http://localhost:8080/employerAccountDeletionRequests/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Alert data to user
            alert('Account deletion request sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    saveEmployerInfo();
    deleteAccountRequest();
});


window.onload = fetchEmployerInfo; // Fetch employer info when the page loadsz  