let professionalID = localStorage.getItem('username'); // Retrieve the username


function fetchProfessionalInfomation() {
    console.log('Profeesional ID is:' + professionalID);
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
        document.getElementById("navProfessionalID").textContent = 'Hi, ' + data.professionalID;
    })

    .catch((error) => {
        console.error('Error:', error);
    });
}

function requestJobMatching() {
    fetch ('http://localhost:8080/matchRequest/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `professionalID=${encodeURIComponent(professionalID)}`,
    })
    .then(response => {
        console.log('HTTP status:', response.status); // Log the HTTP status for debugging
        return response.text();
    })
    .then(text => {
        console.log('Server response:', text); // Log the actual text response from the server
        document.getElementById("status").textContent = "Your Request has been sent!";
        alert("Your Request has been sent!");
    })    
    .catch((error) => {
        console.error('Error:', error);
    });
    

}

document.addEventListener('DOMContentLoaded', function() {
    fetchProfessionalInfomation();
    document.getElementById('requestJobMatching').addEventListener('click', requestJobMatching);
});
