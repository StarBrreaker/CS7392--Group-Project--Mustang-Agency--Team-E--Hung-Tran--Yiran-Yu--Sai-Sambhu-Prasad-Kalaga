package com.example.mustangagencies.ProfessionalPayment;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionalPaymentRepository extends JpaRepository<ProfessionalPayment, String> {
}