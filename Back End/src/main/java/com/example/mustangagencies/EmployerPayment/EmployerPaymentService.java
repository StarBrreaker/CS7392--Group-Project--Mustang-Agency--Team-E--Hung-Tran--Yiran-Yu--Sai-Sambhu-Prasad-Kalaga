package com.example.mustangagencies.EmployerPayment;

import com.example.mustangagencies.Employer.EmployerRepository;
import com.example.mustangagencies.Employer.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class EmployerPaymentService {
    private final EmployerPaymentRepository employerPaymentRepository;
    private final EmployerRepository employerRepository;

    @Autowired
    public EmployerPaymentService(EmployerPaymentRepository employerPaymentRepository, EmployerRepository employerRepository) {
        this.employerPaymentRepository = employerPaymentRepository;
        this.employerRepository = employerRepository;
    }

    public EmployerPayment createOrUpdateEmployerPayment(EmployerPayment employerPayment) {

        String employerId = employerPayment.getPaymentId();
        Employer employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found with id: " + employerId));

        return employerPaymentRepository.save(employerPayment);
    }

    public Optional<EmployerPayment> getEmployerPaymentById(String paymentId) {
        return employerPaymentRepository.findById(paymentId);
    }

    public List<EmployerPayment> getAllEmployerPayments() {
        return employerPaymentRepository.findAll();
    }

    public void deleteEmployerPayment(String paymentId) {
        employerPaymentRepository.deleteById(paymentId);
    }


}
