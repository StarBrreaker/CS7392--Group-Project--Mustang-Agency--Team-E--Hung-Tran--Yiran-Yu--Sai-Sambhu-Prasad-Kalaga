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

  window.onload = fetchProfessionalInfomation;

  function changePassword() {
    document.querySelector('.form-mf').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const oldPassword = document.getElementById('oldpassword').value;
        const newPassword = document.getElementById('newpassword').value;
        const reEnterNewPassword = document.getElementById('reenternewpassword').value;

        // Password validation criteria
        const isLongEnough = newPassword.length >= 8;
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);
        const hasAlphabet = /[A-Za-z]/.test(newPassword);

        // Check if all criteria are met
        const isValid = isLongEnough && hasNumber && hasSpecialChar && hasAlphabet;

        if (newPassword === reEnterNewPassword) {
            if (isValid) {
                // Sending a POST request to the server to update password
                fetch('http://localhost:8080/user/updatePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `username=${encodeURIComponent(professionalID)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}`,
                })
                .then(response => {
                    console.log('HTTP status:', response.status); // Log the HTTP status for debugging
                    return response.text();
                })
                .then(text => {
                    console.log('Server response:', text); // Log the actual text response from the server
                    document.getElementById("warning").innerHTML = text;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    document.getElementById("warning").innerHTML = "Failed to update the password due to an error.";
                });
            } else {
                let message = 'Your password must be at least 8 characters long, include at least one alphabet, one number, and one special character.';
                document.getElementById("warning").innerHTML = message;
            }
        } else {
            document.getElementById("warning").innerHTML = "The passwords do not match.";
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  changePassword(); // Ensure this function is called once the DOM is fully loaded.
});
