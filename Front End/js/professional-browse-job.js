let professionalID = localStorage.getItem('username'); // Retrieve the username


function fetchProfessionalInfo() {
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

window.onload = fetchProfessionalInfo();

let allJobs = [];
  
function fetchAllJobs() {
    fetch('http://localhost:8080/jobdescriptions/all')
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
    window.location.href = 'dashboard-professional-browse-all-jobs-viewdetails.html'; // Navigate to the details page
}

// document.addEventListener('DOMContentLoaded', storeJobIdAndNavigate);
// console.log(document.getElementById('jobsTableBody'));

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
    // console.log(jobDetails.startDate);
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

        categoryCell.textContent = qualification.category;
        keywordsCell.textContent = qualification.keywords;
    });
}

document.addEventListener('DOMContentLoaded', fetchJobDetails);

function searchJobs() {
    const jobId = document.getElementById('professionalJobSearch').value.trim();
    if (!jobId) {
        alert('Please enter a job ID to search.');
        return;
    }

    fetch(`http://localhost:8080/jobdescriptions/${jobId}`)
        .then(response => {
            if (!response.ok) throw new Error('Job not found.');
            return response.json();
        })
        .then(job => {
            populateJobsTable([job]); // Reuse the populate table function by sending a single-job array
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch job: ' + error.message);
        });
}

document.getElementById('professionalJobSearch').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchJobs();
    }
});

function clearSearch() {
    populateJobsTable(allJobs); // Re-populate table with original job list
}

window.onload = function() {
    fetchAllJobs();
}

