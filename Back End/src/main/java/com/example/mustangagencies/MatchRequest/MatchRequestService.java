package com.example.mustangagencies.MatchRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchRequestService {

    private final MatchRequestRepository matchRequestRepository;

    @Autowired
    public MatchRequestService(MatchRequestRepository matchRequestRepository) {
        this.matchRequestRepository = matchRequestRepository;
    }

    public List<MatchRequest> getAllMatchRequests() {
        return matchRequestRepository.findAll();
    }

    public MatchRequest getMatchRequestById(Long id) {
        return matchRequestRepository.findById(id).orElse(null);
    }

    public MatchRequest createMatchRequest(MatchRequest matchRequest) {
        return matchRequestRepository.save(matchRequest);
    }

    public MatchRequest updateMatchRequest(MatchRequest matchRequest) {
        return matchRequestRepository.save(matchRequest);
    }

    public void deleteMatchRequest(Long id) {
        matchRequestRepository.deleteById(id);
    }

    public List<MatchRequest> getAllPendingMatchRequests() {
        return matchRequestRepository.findAllByStatus("PENDING");
    }
}