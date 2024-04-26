
function getStaffAccount() {
    fetch('http://localhost:8080/staff/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("staffTable").getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear any existing rows
            data.forEach((staff, index) => {
                let row = tableBody.insertRow();
                row.addEventListener('click', () => storeStaffAccountRequestAndNavigate(staff.preferredUsername));
                let numberCell = row.insertCell(0);
                let firstNameCell = row.insertCell(1);
                let lastNameCell = row.insertCell(2);
                let phoneCell = row.insertCell(3);
                let emailCell = row.insertCell(4);
                let viewDetailsCell = row.insertCell(5);

                

                numberCell.textContent = index + 1;
                firstNameCell.textContent = staff.firstName;
                lastNameCell.textContent = staff.lastName;
                phoneCell.textContent = staff.phoneNumber;
                emailCell.textContent = staff.email;

                let viewDetailsLink = document.createElement('a');
                viewDetailsLink.textContent = 'View Details';
                viewDetailsLink.href = 'dashboard-root-staff-account-management-viewdetails.html';
                viewDetailsLink.onclick = function() {
                    localStorage.setItem('selectedStaffID', staff.staffID);
                    
                }
                
                viewDetailsCell.appendChild(viewDetailsLink);
                

            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
document.addEventListener('DOMContentLoaded', function() {
    getStaffAccount();
    
 
});