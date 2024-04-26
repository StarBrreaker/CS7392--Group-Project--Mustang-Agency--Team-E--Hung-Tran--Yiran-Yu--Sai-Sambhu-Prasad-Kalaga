package com.example.mustangagencies.EmployerAccountDeletionRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployerAccountDeletionRequestRepository extends JpaRepository<EmployerAccountDeletionRequest, Long> {
// Additional query methods can be defined here
    List<EmployerAccountDeletionRequest> findAllByStatus(String status);
}