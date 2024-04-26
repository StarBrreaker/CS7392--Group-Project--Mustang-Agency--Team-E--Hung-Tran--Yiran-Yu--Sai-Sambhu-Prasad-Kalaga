package com.example.mustangagencies.MatchRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRequestRepository extends JpaRepository<MatchRequest, Long>{
    // Additional query methods can be defined here
    List<MatchRequest> findAllByStatus(String status);
}
