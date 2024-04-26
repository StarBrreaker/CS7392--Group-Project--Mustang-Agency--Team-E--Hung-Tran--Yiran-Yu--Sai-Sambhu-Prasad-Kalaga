package com.example.mustangagencies.Professional;

import com.example.mustangagencies.Qualification.Qualification;
import com.example.mustangagencies.User.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.time.LocalDate;
@Entity
public class Professional {
    @Id
    private String professionalID;

    @OneToOne()
    //@JoinColumn(name = "username", referencedColumnName = "username")
    private User user;

    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String phoneNumber;
    private String mailAddress;
    private String city;
    private String state;
    private String zip;
    private String degree;
    private String institution;
    private YearMonth dateOfAward;

    @OneToMany(mappedBy = "professional", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Qualification> qualifications = new ArrayList<>();


    // Constructors, Getters, and Setters
    public Professional() {}

    public void setProfessionalID(String professionalID) { this.professionalID = professionalID;}
    public String getProfessionalID () {return professionalID;}
    public void setUser(User user) {this.user = user;}
    public User getUser() {return user;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    public String getFirstName () {return firstName;}
    public void setLastName(String lastName) {this.lastName = lastName;}
    public String getLastName() {return lastName;}
    public void setDob(LocalDate dob) {this.dob = dob;}
    public LocalDate getDob() {return dob;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getPhoneNumber() {return phoneNumber;}
    public void setPhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}
    public String getMailAddress () {return mailAddress;}
    public void setMailAddress(String mailAddress) {this.mailAddress = mailAddress;}
    public String getCity () {return city;}
    public void setCity (String city) {this.city = city;}
    public String getState () {return state;}
    public void setState (String state) {this.state = state;}
    public String getZip () {return zip;}
    public void setZip (String zip) {this.zip = zip;}

    public String getDegree () {return degree;}
    public void setDegree (String degree) {this.degree = degree;}
    public String getInstitution() {return institution;}
    public void setInstitution(String institution) {this.institution = institution;}
    public YearMonth getDateOfAward() {return dateOfAward;}
    public void setDateOfAward(YearMonth dateOfAward) {this.dateOfAward = dateOfAward;}

    public List<Qualification> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<Qualification> qualifications) {
        this.qualifications = qualifications;
    }

    public void addQualification(Qualification qualification) {
        qualifications.add(qualification);
        qualification.setProfessional(this);
    }

    public void removeQualification(Qualification qualification) {
        qualifications.remove(qualification);
        qualification.setProfessional(null);
    }


    public Qualification getQualification(Long qualificationID) {
        for (Qualification qualification : qualifications) {
            if (qualification.getId().equals(qualificationID)) {
                return qualification;
            }
        }
        return null;
    }

}



