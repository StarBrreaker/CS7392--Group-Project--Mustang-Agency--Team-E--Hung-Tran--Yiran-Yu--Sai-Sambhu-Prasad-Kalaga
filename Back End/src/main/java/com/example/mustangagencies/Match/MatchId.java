package com.example.mustangagencies.Match;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MatchId implements Serializable {
    private String jobID;
    private String employerID;
    private String professionalID;

    // Default constructor
    public MatchId() {}

    // Parameterized constructor
    public MatchId(String jobID, String employerID, String professionalID) {
        this.jobID = jobID;
        this.employerID = employerID;
        this.professionalID = professionalID;
    }

    // Getters and setters
    public String getJobID() {
        return jobID;
    }

    public void setJobID(String jobID) {
        this.jobID = jobID;
    }

    public String getEmployerID() {
        return employerID;
    }

    public void setEmployerID(String employerID) {
        this.employerID = employerID;
    }

    public String getProfessionalID() {
        return professionalID;
    }

    public void setProfessionalID(String professionalID) {
        this.professionalID = professionalID;
    }

}