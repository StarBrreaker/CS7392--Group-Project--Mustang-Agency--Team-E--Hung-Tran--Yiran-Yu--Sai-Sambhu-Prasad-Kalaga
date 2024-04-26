package com.example.mustangagencies.Match;

import com.example.mustangagencies.JobDescription.JobDescription;
import com.example.mustangagencies.User.User;
import jakarta.persistence.*;



@Entity
@Table(name = "`match`") // Note the backticks around match

public class Match {
//implements Serializable
    @EmbeddedId
    private MatchId id; // Composite ID that includes (JobID, EmployerID)


    // Relationship mapping and other fields
    @ManyToOne //different professionals could be matched with a job
    @JoinColumn(name = "jobID", insertable = false, updatable = false)
    private JobDescription jobDescription;


    @ManyToOne
    @JoinColumn(name = "employerID", insertable = false, updatable = false, nullable = true)
    private User employer;

    @ManyToOne
    @JoinColumn(name = "professionalID", insertable = false, updatable = false) // Adjust the 'name' to match your User's ID column if User is your Professional entity
    private User professional;

    private Double matchScore;

    // other attributes and annotations

    public String getJobID() {
        return this.id.getJobID();
    }

    public String getEmployerID() {
        return this.id.getEmployerID();
    }


    public String getProfessionalID() {
        return this.id.getProfessionalID();
    }

    // Getters and setters
    public MatchId getId() {
        return id;
    }

    public void setId(MatchId id) {
        this.id = id;
    }

    public User getProfessional() {

        return professional;
    }

    public void setProfessional(User professional) {
        this.professional = professional;
    }

    public User getEmployer() {
        return employer;
    }

    public void setEmployer(User employer) {
        this.employer = employer;
    }


    public JobDescription getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(JobDescription jobDescription) {
        this.jobDescription = jobDescription;
    }


    public Double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(Double matchScore) {
        this.matchScore = matchScore;
    }
}
