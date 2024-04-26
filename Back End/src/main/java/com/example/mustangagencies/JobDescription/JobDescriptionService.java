package com.example.mustangagencies.JobDescription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobDescriptionService {

    @Autowired
    private JobDescriptionRepository jobDescriptionRepository;

    public List<JobDescription> getAllJobDescriptions() {
        return jobDescriptionRepository.findAll();
    }

    public Optional<JobDescription> getJobDescriptionById(String jobID) {
        return jobDescriptionRepository.findById(jobID);
    }

    public JobDescription saveOrUpdateJobDescription(JobDescription jobDescription) {
        return jobDescriptionRepository.save(jobDescription);
    }

    public List<JobDescription> findAllByEmployerId(String employerId) {
        return jobDescriptionRepository.findByEmployer_EmployerID(employerId);
    }
    public void deleteJobDescription(String jobID) {
        jobDescriptionRepository.deleteById(jobID);
    }
}