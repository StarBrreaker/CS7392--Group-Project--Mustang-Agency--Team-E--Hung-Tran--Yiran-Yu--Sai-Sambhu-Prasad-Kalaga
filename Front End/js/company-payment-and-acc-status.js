let employerID = localStorage.getItem('username'); // Retrieve the username

function fetchEmployerInfomation() {
    console.log('Profeesional ID is:' + employerID);
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
        document.getElementById("navEmployerID").textContent = 'Hi, ' + data.employerID;
    })

    .catch((error) => {
        console.error('Error:', error);
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

function processPayment() {
    document.getElementById('processPayment').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        let amountPaid = document.getElementById("amountPaid").value;
        if (!amountPaid) {
          alert('Please enter a valid payment amount.');
          return;
        }
  
        fetch(`http://localhost:8080/employerPayments/${employerID}/processPayment?amountPaid=${amountPaid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
          if (!response.ok) throw new Error('Failed to process payment');
          return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Payment processed successfully');
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    fetchEmployerInfomation();
    fetchBillingInfo();
    processPayment();
});
