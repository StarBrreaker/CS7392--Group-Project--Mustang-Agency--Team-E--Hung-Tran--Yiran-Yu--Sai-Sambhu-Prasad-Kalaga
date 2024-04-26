package com.example.mustangagencies.EmployerPayment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerPaymentRepository extends JpaRepository<EmployerPayment, String> {
}
