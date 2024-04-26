package com.example.mustangagencies.ProfessionalAccountDeletionRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionalAccountDeletionRequestRepository extends JpaRepository<ProfessionalAccountDeletionRequest, Long> {
    // Additional query methods can be defined here
    List<ProfessionalAccountDeletionRequest> findAllByStatus(String status);
}
