package com.example.mustangagencies.MatchRequest;

import com.example.mustangagencies.Professional.Professional;
import jakarta.persistence.*;

@Entity
public class MatchRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchRequestID;
    @ManyToOne
    @JoinColumn(name = "professionalID")
    private Professional requestBy;

    private String status = "PENDING"; // Default status is PENDING

    private String matchedByStaffID;

    // Getters and setters
    public Professional getRequestBy() {
        return requestBy;
    }

    public Long getMatchRequestID() {
        return matchRequestID;
    }

    public void setMatchRequestID(Long matchRequestID) {
        this.matchRequestID = matchRequestID;
    }

    public void setRequestBy(Professional requestBy) {
        this.requestBy = requestBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMatchedByStaffID() {
        return matchedByStaffID;
    }

    public void setMatchedByStaffID(String matchedByStaffID) {
        this.matchedByStaffID = matchedByStaffID;
    }
}