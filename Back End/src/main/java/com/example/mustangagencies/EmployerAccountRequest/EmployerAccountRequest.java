package com.example.mustangagencies.EmployerAccountRequest;

import com.example.mustangagencies.User.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
public class EmployerAccountRequest {
    @Id
    private String preferredUsername;

    private String status = "PENDING"; // Consider using an enum here for "Pending", "Approved", "Rejected"

    @ManyToOne
    @JoinColumn(name = "approvedByStaffId", referencedColumnName = "username")
    private User approvedBy;
    @CreationTimestamp
    private LocalDateTime timestamp;

    private String companyName;
    private String registrationNumber;
    private String industry;
    private String size;
    private String primaryContactFirstName;
    private String primaryContactLastName;

    private String primaryContactEmail;
    private String primaryContactPhoneNumber;
    private String primaryContactMailAddress;
    private String city;
    private String state;
    private String zip;
    private String websiteLink;

    public EmployerAccountRequest() {}

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

    public void setCompanyName(String companyName) {this.companyName = companyName;}
    public String getCompanyName() {return companyName;}
    public void setRegistrationNumber(String registrationNumber) {this.registrationNumber = registrationNumber;}
    public String getRegistrationNumber() {return registrationNumber;}
    public void setIndustry (String industry) {this.industry = industry;}
    public String getIndustry () {return industry;}
    public void setSize (String size) {this.size = size;}
    public String getSize () {return size;}
    public void setPrimaryContactFirstName(String firstName) {this.primaryContactFirstName = firstName;}
    public String getPrimaryContactFirstName () {return primaryContactFirstName;}
    public void setPrimaryContactLastName(String lastName) {this.primaryContactLastName = lastName;}
    public String getPrimaryContactLastName() {return primaryContactLastName;}
    public String getPrimaryContactEmail() {return primaryContactEmail;}
    public void setPrimaryContactEmail(String email) {this.primaryContactEmail = email;}
    public String getPrimaryContactPhoneNumber() {return primaryContactPhoneNumber;}
    public void setPrimaryContactPhoneNumber(String phoneNumber) {this.primaryContactPhoneNumber = phoneNumber;}
    public String getPrimaryContactMailAddress () {return primaryContactMailAddress;}
    public void setPrimaryContactMailAddress(String mailAddress) {this.primaryContactMailAddress = mailAddress;}
    public String getWebsiteLink () {return websiteLink;}
    public void setWebsiteLink (String websiteLink) {this.websiteLink = websiteLink;}
    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}
    public String getState() {return state;}
    public void setState(String state) {this.state = state;}
    public String getZip() {return zip;}
    public void setZip(String zip) {this.zip = zip;}

}
