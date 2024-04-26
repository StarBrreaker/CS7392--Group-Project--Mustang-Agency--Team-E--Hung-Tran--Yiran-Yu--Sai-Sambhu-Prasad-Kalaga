package com.example.mustangagencies.Staff;

import com.example.mustangagencies.User.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import java.time.LocalDate;
@Entity
public class Staff {
    @Id
    private String staffID;

    @OneToOne()
    private User user;

    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String phoneNumber;

    // Constructors, Getters, and Setters
    public Staff() {}

    public void setStaffID(String staffID) { this.staffID = staffID;}
    public String getStaffID () {return staffID;}
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
}
