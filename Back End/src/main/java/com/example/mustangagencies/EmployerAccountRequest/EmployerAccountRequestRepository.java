package com.example.mustangagencies.EmployerAccountRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployerAccountRequestRepository  extends JpaRepository<EmployerAccountRequest, String>{
    List<EmployerAccountRequest> findAllByStatus(String status);
    EmployerAccountRequest findFirstByStatusOrderByTimestampAsc(String status);

}
