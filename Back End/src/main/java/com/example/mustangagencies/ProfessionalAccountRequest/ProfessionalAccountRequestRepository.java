package com.example.mustangagencies.ProfessionalAccountRequest;

import com.example.mustangagencies.EmployerAccountRequest.EmployerAccountRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessionalAccountRequestRepository extends JpaRepository<ProfessionalAccountRequest, String> {
    // Custom query methods
    List<ProfessionalAccountRequest> findAllByStatus(String status);
    ProfessionalAccountRequest findFirstByStatusOrderByTimestampAsc(String status);
}
