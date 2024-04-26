package com.example.mustangagencies.ProfessionalAccountRequest;


import com.example.mustangagencies.Qualification.Qualification;
import com.example.mustangagencies.User.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;

import java.util.List;



@Entity
public class ProfessionalAccountRequest {
    @Id
    private String preferredUsername;

    private String status = "PENDING"; // Consider using an enum here for "Pending", "Approved", "Rejected"

    @ManyToOne
    @JoinColumn(name = "approvedByStaffId", referencedColumnName = "username")
    private User approvedBy;
    @CreationTimestamp
    private LocalDateTime timestamp;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String phone;
    private String mailingAddress;
    private String city;
    private String state;
    private String zip;
    private String degree;
    private String institution;
    private YearMonth dateOfAward;

    @ElementCollection
    private List<String> qualificationCategories;

    @ElementCollection
    private List<String> qualificationKeywords;

    @OneToMany(mappedBy = "professionalAccountRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Qualification> qualifications = new ArrayList<>();

    // Constructors, getters, and setters
    public ProfessionalAccountRequest () {}



    public String getPreferredUsername() {
        return preferredUsername;
    }

    public void setPreferredUsername(String preferredUsername) {
        this.preferredUsername = preferredUsername;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMailingAddress() {
        return mailingAddress;
    }

    public void setMailingAddress(String mailingAddress) {
        this.mailingAddress = mailingAddress;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public YearMonth getDateOfAward() {
        return dateOfAward;
    }

    public void setDateOfAward(YearMonth dateOfAward) {
        this.dateOfAward = dateOfAward;
    }

    public List<Qualification> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<Qualification> qualifications) {
        this.qualifications = qualifications;
    }

    public void addQualification(Qualification qualification) {
        qualifications.add(qualification);
        qualification.setProfessionalAccountRequest(this);
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

    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }
}
