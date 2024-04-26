function acceptStaffForm() {
    const form = document.getElementById('staffCreationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('staffUsername').value;
        const firstName = document.getElementById('stafffirstname').value;
        const lastName = document.getElementById('stafflastname').value;
        const dob = document.getElementById('staffdob').value;
        const email = document.getElementById('staffEmail').value;
        const phoneNumber = document.getElementById('staffPhone').value;

        // First, create the user
        createUser(username, 'Staff')
            .then(userData => {
                if (userData) {
                    console.log('User created:', userData);
                    // If user is successfully created, proceed to create staff
                    return createStaff(username, firstName, lastName, dob, email, phoneNumber);
                }
            })
            .then(staffResponse => {
                console.log('Staff created:', staffResponse);
                alert('Staff account successfully created.');
            })
            .catch(error => {
                console.error('Error in process:', error);
            });
    });
}

function createUser(username, userType) {
    return fetch('http://localhost:8080/user/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({username, userType})
    }).then(response => {
        if (response.status === 409) {
            alert('User with username ' + username + ' already exists.');
            throw new Error('Username already exists'); // Stop the promise chain on user existence
        }
        if (!response.ok) throw new Error('Failed to create user');
        return response.text(); // Change here to handle text response
    }).then(text => {
        if (text) {
            alert('User created successfully.');
            console.log('User created:', text);
        }
        return text;
    });
}

function createStaff(username, firstName, lastName, dob, email, phoneNumber) {
    return fetch('http://localhost:8080/staff/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username,
            firstName,
            lastName,
            dob,
            email,
            phoneNumber
        })
    }).then(response => {
        if (!response.ok) throw new Error('Failed to add staff');
        return response.text(); // Change here to handle text response
    }).then(text => {
        console.log('Server response:', text);
        return text; // You can parse or handle the text as needed
    });
}

document.addEventListener('DOMContentLoaded', function() {
    acceptStaffForm();
});
