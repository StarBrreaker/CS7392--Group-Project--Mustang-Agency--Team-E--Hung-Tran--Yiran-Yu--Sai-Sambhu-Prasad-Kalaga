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
        document.getElementById("preferredUsername").textContent = data.staffID;
        document.getElementById("stafffn").value = data.firstName;
        document.getElementById("staffln").value = data.lastName;
        document.getElementById("staffdob").value = data.dob;
        document.getElementById("staffemail").value = data.email;
        document.getElementById("staffphnnum").value = data.phoneNumber;
    

    })

    .catch((error) => {
        console.error('Error:', error);
    });
  }

function saveStaffInfo() {
    document.getElementById('saveButton').addEventListener('click', function(event) {
        event.preventDefault();

        if (!notEmpty()) {
            document.getElementById("savespan").innerHTML = "Satisfy all the above conditions"
            return
          }
          document.getElementById("savespan").innerHTML = ""
          isEditClicked = false;
    
          document.getElementById("stafffn").setAttribute('readonly', 'true');
          document.getElementById("staffln").setAttribute('readonly', 'true');
          document.getElementById("staffdob").setAttribute('readonly', 'true');
          document.getElementById("staffemail").setAttribute('readonly', 'true');
          document.getElementById("staffphnnum").setAttribute('readonly', 'true');


        let updatedStaffInfo = {
            firstName: document.getElementById('stafffn').value,
            lastName: document.getElementById('staffln').value,
            dob: document.getElementById('staffdob').value,
            email: document.getElementById('staffemail').value,
            phoneNumber: document.getElementById('staffphnnum').value,
        };

        let queryParams = new URLSearchParams();
        for (let key in updatedStaffInfo) {
            queryParams.append(key, updatedStaffInfo[key]);
        }

        fetch(`http://localhost:8080/staff/${staffID}?${queryParams.toString()}`, {
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


document.addEventListener('DOMContentLoaded', function() {
    fetchStaffInfomation();
    saveStaffInfo();
});
