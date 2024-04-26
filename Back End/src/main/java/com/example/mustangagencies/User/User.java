package com.example.mustangagencies.User;

import com.example.mustangagencies.Staff.Staff;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	@Column(unique = true)
	@JsonIgnore
	private String username;
	@JsonIgnore
	private String passwordHash;
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private UserType userType;

	@JsonIgnore
	private Boolean isActive;

	@JsonIgnore
	private Boolean isPasswordChanged = false;

	@OneToOne(mappedBy = "user")
	private Staff staff;

	public User(){}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {this.passwordHash = passwordHash;}

	public UserType getUserType() { return userType;}

	public void setUserType (UserType userType) { this.userType = userType;}

	public Boolean getIsActive() { return isActive;}

	public void setIsActive(Boolean isActive) { this.isActive = isActive;}

	public Boolean getIsPasswordChanged() { return isPasswordChanged;}

	public void setIsPasswordChanged(Boolean isPasswordChanged) { this.isPasswordChanged = isPasswordChanged;}
}
