let username = localStorage.getItem('username');

let allJobs = [];
function fetchEmployerInfo() {
    
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
document.addEventListener('DOMContentLoaded', function() {
    fetchEmployerInfo();
    // document.getElementById('postJobForm').addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     postNewJob();
    
    // });
    // document.getElementById('addButton').addEventListener('click', function(event) {
    //     event.preventDefault();
    //     add();//addQualification();    
    // });
});



document.addEventListener('DOMContentLoaded', fetchJobDetails);

function fetchAllJobs() {

    const url = `http://localhost:8080/jobdescriptions/employer/${username}`;
    fetch(url)
        .then(response => response.json())
        .then(jobs => {
            allJobs = jobs; // Store the fetched jobs
            populateJobsTable(jobs);
        })
        .catch(error => console.error('Failed to fetch jobs:', error));
}
document.addEventListener('DOMContentLoaded', fetchAllJobs);


function populateJobsTable(jobs) {
    if (!Array.isArray(jobs)) jobs = [jobs];
    const tableBody = document.getElementById('jobsTableBody');
    
    if (!tableBody) {
        console.error('Table body is not found!');
        return; // Stop execution if tableBody is not found
    }
    
    tableBody.innerHTML = ''; // Clear existing table data

    

    jobs.forEach((job, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);
        const cell9 = row.insertCell(8);

        cell1.innerHTML = index + 1;
        cell2.innerHTML = job.positionName;
        cell3.innerHTML = job.jobID;
        cell4.innerHTML = job.primaryContactFirstName;
        cell5.innerHTML = job.email;
        cell6.innerHTML = job.phoneNumber;
        cell7.innerHTML = job.payPerHour;
        cell8.innerHTML = job.startDate;
        // console.log(job.jobID);
        
        const detailLink = document.createElement('a');
        detailLink.href = '#';
        detailLink.textContent = 'View Details';
        detailLink.addEventListener('click', function() {
            storeJobIdAndNavigate(job.jobID);
        });
        
        cell9.appendChild(detailLink);

    });
}

function storeJobIdAndNavigate(jobId) {
    console.log('Storing Job ID:', jobId); // Debugging output
    localStorage.setItem('selectedJobId', jobId); // Store the job ID in local storage
    window.location.href = 'dashboard-company-job-posting-management-viewdetails.html'; // Navigate to the details page
}

//viewDetails
function fetchJobDetails() {
    const jobId = localStorage.getItem('selectedJobId'); // Retrieve the stored Job ID from local storage
    if (!jobId) {
        console.error('No job ID found');
        return; // Exit if no job ID is found
    }

    fetch(`http://localhost:8080/jobdescriptions/${jobId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch job details');
            }
            return response.json();
        })
        .then(jobDetails => displayJobDetails(jobDetails))
        .catch(error => console.error('Error fetching job details:', error));
}

function displayJobDetails(jobDetails) {
    console.log('Job Details:', jobDetails); // Debugging output
    // Populate job details in the HTML
    document.getElementById('positionName').textContent = jobDetails.positionName;
    document.getElementById('uniqueID').textContent = jobDetails.jobID;
    document.getElementById('primaryContactFirstName').textContent = jobDetails.primaryContactFirstName;
    document.getElementById('primaryContactLastName').textContent = jobDetails.primaryContactLastName;
    document.getElementById('email').textContent = jobDetails.email;
    document.getElementById('phoneNumber').textContent = jobDetails.phoneNumber;
    document.getElementById('startDate').textContent = jobDetails.startDate;
    document.getElementById('endDate').textContent = jobDetails.endDate;
    document.getElementById('payPerHour').textContent = jobDetails.payPerHour;
    document.getElementById('startTime').textContent = jobDetails.startTime;
    document.getElementById('endTime').textContent = jobDetails.endTime;

    // Add more elements as needed
    // display qualification 
    let tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear any existing rows
    jobDetails.qualifications.forEach(qualification => {
        let row = tableBody.insertRow();
        let categoryCell = row.insertCell(0);
        let keywordsCell = row.insertCell(1);
        let removeCell = row.insertCell(2); // New cell for the remove button

        categoryCell.textContent = qualification.category;
        keywordsCell.textContent = qualification.keywords;
    });
}

function editButton() {
    const fields = ['companynewposition', 'companynewuniqueid', 'companynewfirstname', 'companynewlastname', 'companynewemail', 'companynewPhone', 'companynewstartdate', 'companynewenddate', 'companynewpayperhour', 'companynewstarttime', 'companynewendtime'];
    fields.forEach(field => {
        document.getElementById(field).removeAttribute('readonly');
    });
}

function submitJobEdits() {
    const jobId = document.getElementById('companynewuniqueid').value; // Assuming job ID is stored in this input
    const url = `http://localhost:8080/jobdescriptions/update/${jobId}`;
    const jobDetails = {
        positionName: document.getElementById('companynewposition').value,
        primaryContactFirstName: document.getElementById('companynewfirstname').value,
        primaryContactLastName: document.getElementById('companynewlastname').value,
        email: document.getElementById('companynewemail').value,
        phoneNumber: document.getElementById('companynewPhone').value,
        startDate: document.getElementById('companynewstartdate').value,
        endDate: document.getElementById('companynewenddate').value,
        payPerHour: document.getElementById('companynewpayperhour').value,
        startTime: document.getElementById('companynewstarttime').value,
        endTime: document.getElementById('companynewendtime').value,
        // Add more fields as needed
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update job details');
        }
        return response.json();
    })
    .then(data => {
        console.log('Job updated successfully:', data);
        alert('Job updated successfully!');
    })
    .catch(error => {
        console.error('Error updating job details:', error);
        alert('Error updating job details.');
    });
}



window.onload = function() {
    fetchAllJobs();
}

