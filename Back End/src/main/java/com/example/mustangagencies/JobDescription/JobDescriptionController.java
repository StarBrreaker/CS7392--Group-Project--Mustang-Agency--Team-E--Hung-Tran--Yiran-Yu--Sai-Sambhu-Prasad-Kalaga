package com.example.mustangagencies.JobDescription;

import com.example.mustangagencies.Employer.Employer;
import com.example.mustangagencies.Employer.EmployerService;
import com.example.mustangagencies.Qualification.Qualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobdescriptions")
public class JobDescriptionController {

    @Autowired
    private JobDescriptionService jobDescriptionService;
    @Autowired
    private EmployerService employerService;

    @GetMapping("/all")
    public List<JobDescription> getAllJobDescriptions() {
        return jobDescriptionService.getAllJobDescriptions();
    }

    @GetMapping("/{jobID}")
    public JobDescription getJobDescription(@PathVariable String jobID) {
        return jobDescriptionService.getJobDescriptionById(jobID)
                .orElseThrow(() -> new RuntimeException("Job Description not found"));
    }

    @PostMapping(path="/add")
    public ResponseEntity<?> createJobDescription(
            @RequestParam String jobID,
            @RequestParam String positionName,
            @RequestParam String primaryContactFirstName,
            @RequestParam String primaryContactLastName,
            @RequestParam String email,
            @RequestParam String phoneNumber,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam Double payPerHour,
            @RequestParam LocalTime startTime,
            @RequestParam LocalTime endTime,
            @RequestParam String employerId,
            @RequestParam List<String> qualificationCategories,
            @RequestParam List<String> qualificationKeywords
    ) {
        Optional<Employer> employerOptional = employerService.getEmployerById(employerId);

        if (!employerOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employer not found with ID: " + employerId);
        }

        //Verify that the jobID is unique
        if (jobDescriptionService.getJobDescriptionById(jobID).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Job Description with ID: " + jobID + " already exists");
        }

        Employer employer = employerOptional.get();

        JobDescription jobDescription = new JobDescription();
        jobDescription.setJobID(jobID); // Set jobID manually
        jobDescription.setEmployer(employer);
        jobDescription.setPositionName(positionName);
        jobDescription.setPrimaryContactFirstName(primaryContactFirstName);
        jobDescription.setPrimaryContactLastName(primaryContactLastName);
        jobDescription.setEmail(email);
        jobDescription.setPhoneNumber(phoneNumber);
        jobDescription.setStartDate(startDate);
        jobDescription.setEndDate(endDate);
        jobDescription.setPayPerHour(payPerHour);
        jobDescription.setStartTime(startTime);
        jobDescription.setEndTime(endTime);

        for (int i = 0; i < qualificationCategories.size(); i++) {
            Qualification qualification = new Qualification();
            qualification.setCategory(qualificationCategories.get(i));
            qualification.setKeywords(qualificationKeywords.get(i));
            jobDescription.addQualification(qualification);
        }


        JobDescription createdJobDescription = jobDescriptionService.saveOrUpdateJobDescription(jobDescription);
        return ResponseEntity.ok(createdJobDescription);
    }

    @PutMapping("/{jobID}")
    public JobDescription updateJobDescription(
            @PathVariable String jobID,
            @RequestParam String positionName,
            @RequestParam String primaryContactFirstName,
            @RequestParam String primaryContactLastName,
            @RequestParam String email,
            @RequestParam String phoneNumber,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam Double payPerHour,
            @RequestParam String startTime,
            @RequestParam String endTime,
            @RequestParam String employerId,
            @RequestParam List<String> qualificationCategories,
            @RequestParam List<String> qualificationKeywords
    ) {
        JobDescription existingJobDescription = jobDescriptionService.getJobDescriptionById(jobID)
                .orElseThrow(() -> new RuntimeException("Job Description not found"));

        Employer employer = employerService.getEmployerById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));
        existingJobDescription.setEmployer(employer);

        existingJobDescription.setPositionName(positionName);
        existingJobDescription.setPrimaryContactFirstName(primaryContactFirstName);
        existingJobDescription.setPrimaryContactLastName(primaryContactLastName);
        existingJobDescription.setEmail(email);
        existingJobDescription.setPhoneNumber(phoneNumber);
        existingJobDescription.setStartDate(LocalDate.parse(startDate));
        existingJobDescription.setEndDate(LocalDate.parse(endDate));
        existingJobDescription.setPayPerHour(payPerHour);
        existingJobDescription.setStartTime(LocalTime.parse(startTime));
        existingJobDescription.setEndTime(LocalTime.parse(endTime));

        if (qualificationCategories != null && qualificationKeywords != null) {
            existingJobDescription.getQualifications().forEach(qualification -> {
                qualification.setJobDescription(null); // Disassociate the qualification from the job description
            });
            existingJobDescription.getQualifications().clear();

            for (int i = 0; i < qualificationCategories.size(); i++) {
                Qualification qualification = new Qualification();
                qualification.setCategory(qualificationCategories.get(i));
                qualification.setKeywords(qualificationKeywords.get(i));
                qualification.setJobDescription(existingJobDescription);
                existingJobDescription.getQualifications().add(qualification);
            }
        }
        return jobDescriptionService.saveOrUpdateJobDescription(existingJobDescription);
    }


    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobDescription>> getJobDescriptionsByEmployer(@PathVariable String employerId) {
        String cleanEmployerId = employerId.replace("{", "").replace("}", "");
        List<JobDescription> jobDescriptions = jobDescriptionService.findAllByEmployerId(cleanEmployerId);
        if (jobDescriptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobDescriptions, HttpStatus.OK);
    }

    @DeleteMapping("/{jobID}")
    public ResponseEntity<?> deleteJobDescription(@PathVariable String jobID) {
        JobDescription jobDescription = jobDescriptionService.getJobDescriptionById(jobID)
                .orElseThrow(() -> new RuntimeException("Job Description not found"));

        // Set the employer to null
        jobDescription.setEmployer(null);

        // Save the job description
        jobDescriptionService.saveOrUpdateJobDescription(jobDescription);

        jobDescriptionService.deleteJobDescription(jobID);

        return ResponseEntity.ok("Job Description with ID " + jobID + " deleted successfully.");
    }


}