package com.example.mustangagencies.EmployerPayment;

import com.example.mustangagencies.Employer.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "employer_payment")
public class EmployerPayment {
    @Id
    private String paymentID; // PK and FK to ProfessionalID

    @OneToOne
    //@JoinColumn(name = "professionalID", referencedColumnName = "professionalID")
    private Employer employer;

    private String subscriptionSituation;
    private Double paymentBalance;
    private LocalDate nextBillingDate;
    private LocalDate dueDate;
    private String paymentStatus = "UNPAID";

    // Constructors, Getters, and Setters
    public EmployerPayment() {}
    public String getPaymentId() {
        return paymentID;
    }
    public void setPaymentID(String paymentID) {
        this.paymentID = paymentID;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
        //this.paymentID = professional.getProfessionalID(); // Ensure the paymentID matches the professionalID
    }

    public String getSubscriptionSituation() {
        return subscriptionSituation;
    }

    public void setSubscriptionSituation(String subscriptionSituation) {
        this.subscriptionSituation = subscriptionSituation;
    }

    public Double getPaymentBalance() {
        return paymentBalance;
    }

    public void setPaymentBalance(Double paymentBalance) {
        this.paymentBalance = paymentBalance;
    }

    public LocalDate getNextBillingDate() {
        return nextBillingDate;
    }

    public void setNextBillingDate(LocalDate nextBillingDate) {
        this.nextBillingDate = nextBillingDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

}
