package com.example.mustangagencies.ProfessionalPayment;

import com.example.mustangagencies.Professional.ProfessionalRepository;
import com.example.mustangagencies.Professional.Professional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ProfessionalPaymentService {
    private final ProfessionalPaymentRepository professionalPaymentRepository;
    private final ProfessionalRepository professionalRepository;

    @Autowired
    public ProfessionalPaymentService(ProfessionalPaymentRepository professionalPaymentRepository, ProfessionalRepository professionalRepository) {
        this.professionalPaymentRepository = professionalPaymentRepository;
        this.professionalRepository = professionalRepository;
    }

    public ProfessionalPayment createOrUpdateProfessionalPayment(ProfessionalPayment professionalPayment) {

        String professionalId = professionalPayment.getPaymentId();
        Professional professional = professionalRepository.findById(professionalId)
                        .orElseThrow(() -> new RuntimeException("Professional not found with id: " + professionalId));

        return professionalPaymentRepository.save(professionalPayment);
    }

    public Optional<ProfessionalPayment> getProfessionalPaymentById(String paymentId) {
        return professionalPaymentRepository.findById(paymentId);
    }

    public List<ProfessionalPayment> getAllProfessionalPayments() {
        return professionalPaymentRepository.findAll();
    }

    public void deleteProfessionalPayment(String paymentId) {
        professionalPaymentRepository.deleteById(paymentId);
    }

    // Add more methods as needed for your business logic
}