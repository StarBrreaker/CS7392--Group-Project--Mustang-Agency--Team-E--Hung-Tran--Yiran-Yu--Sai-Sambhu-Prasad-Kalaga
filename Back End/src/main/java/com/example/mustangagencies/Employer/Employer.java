package com.example.mustangagencies.Employer;


import com.example.mustangagencies.User.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;


@Entity
public class Employer {
    @Id
    private String employerID;

    @OneToOne()
    private User user;

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


    public Employer() {}

    public void setEmployerID(String employerID) { this.employerID = employerID;}
    public String getEmployerID () {return employerID;}
    public void setUser(User user) {this.user = user;}
    public User getUser() {return user;}
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

