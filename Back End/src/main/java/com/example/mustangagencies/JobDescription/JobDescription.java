package com.example.mustangagencies.JobDescription;

import com.example.mustangagencies.Employer.Employer;
import com.example.mustangagencies.Qualification.Qualification;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class JobDescription {
    @Id
    private String jobID;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employer_id", referencedColumnName = "employerID")
    private Employer employer;

    private String positionName;
    private String primaryContactFirstName;
    private String primaryContactLastName;
    private String email;
    private String phoneNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double payPerHour;
    private LocalTime startTime;
    private LocalTime endTime;

    @ElementCollection
    private List<String> qualificationCategories;

    @ElementCollection
    private List<String> qualificationKeywords;

    @OneToMany(mappedBy = "jobDescription", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Qualification> qualifications = new ArrayList<>();

    public JobDescription() {
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public String getJobID() {
        return jobID;
    }

    public void setJobID(String jobID) {
        this.jobID = jobID;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getPrimaryContactFirstName() {
        return primaryContactFirstName;
    }

    public void setPrimaryContactFirstName(String primaryContactFirstName) {
        this.primaryContactFirstName = primaryContactFirstName;
    }

    public String getPrimaryContactLastName() {
        return primaryContactLastName;
    }

    public void setPrimaryContactLastName(String primaryContactLastName) {
        this.primaryContactLastName = primaryContactLastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getPayPerHour() {
        return payPerHour;
    }

    public void setPayPerHour(Double payPerHour) {
        this.payPerHour = payPerHour;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public List<Qualification> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<Qualification> qualifications) {
        this.qualifications = qualifications;
    }

    public void addQualification(Qualification qualification) {
        qualifications.add(qualification);
        qualification.setJobDescription(this);
    }

    public void removeQualification(Qualification qualification) {
        qualifications.remove(qualification);
        qualification.setProfessionalAccountRequest(null);
    }

    public List<String> getQualificationCategories() {
        return qualificationCategories;
    }

    public void setQualificationCategories(List<String> qualificationCategories) {
        this.qualificationCategories = qualificationCategories;
    }

    public List<String> getQualificationKeywords() {
        return qualificationKeywords;
    }

    public void setQualificationKeywords(List<String> qualificationKeywords) {
        this.qualificationKeywords = qualificationKeywords;
    }


}