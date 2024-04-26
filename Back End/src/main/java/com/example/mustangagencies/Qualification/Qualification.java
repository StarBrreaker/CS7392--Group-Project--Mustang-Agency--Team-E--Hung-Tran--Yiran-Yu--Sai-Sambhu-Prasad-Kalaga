package com.example.mustangagencies.Qualification;

import com.example.mustangagencies.JobDescription.JobDescription;
import com.example.mustangagencies.Professional.*;
import com.example.mustangagencies.ProfessionalAccountRequest.ProfessionalAccountRequest;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String category;
    private String keywords;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professionalId", nullable = true)
    @JsonBackReference
    private Professional professional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preferredUsername", nullable = true)
    @JsonBackReference
    private ProfessionalAccountRequest professionalAccountRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jobID", nullable = true)
    @JsonBackReference
    private JobDescription jobDescription;

    // Constructors, getters, and setters
    public Qualification() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getKeywords() { return keywords; }
    public void setKeywords(String keywords) { this.keywords = keywords; }
    public Professional getProfessional() { return professional; }
    public void setProfessional(Professional professional) { this.professional = professional; }

    public ProfessionalAccountRequest getProfessionalAccountRequest() {
        return professionalAccountRequest;
    }

    public void setProfessionalAccountRequest(ProfessionalAccountRequest professionalAccountRequest) {
        this.professionalAccountRequest = professionalAccountRequest;
    }
    public JobDescription getJobDescription() { return jobDescription; }
    public void setJobDescription(JobDescription jobDescription) { this.jobDescription = jobDescription; }
}