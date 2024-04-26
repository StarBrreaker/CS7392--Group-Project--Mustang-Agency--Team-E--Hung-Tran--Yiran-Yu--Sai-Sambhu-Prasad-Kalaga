package com.example.mustangagencies.EmployerAccountRequest;

import com.example.mustangagencies.EmployerAccountRequest.EmployerAccountRequest;
import com.example.mustangagencies.EmployerAccountRequest.EmployerAccountRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EmployerAccountRequestService {
    @Autowired
    private EmployerAccountRequestRepository employerAccountRequestRepository;

    public EmployerAccountRequest createRequest(EmployerAccountRequest request) {
        // Additional business logic can be added here
        return employerAccountRequestRepository.save(request);
    }

    public EmployerAccountRequest getRequestById(String id) {
        Optional<EmployerAccountRequest> request = employerAccountRequestRepository.findById(id);
        if (request.isPresent()) {
            return request.get();
        } else {
            throw new RuntimeException("Request not found with id: " + id);
        }
    }

    public List<EmployerAccountRequest> getAllRequests() {
        return employerAccountRequestRepository.findAll();
    }

    public EmployerAccountRequest updateRequest(String id, EmployerAccountRequest requestDetails) {
        EmployerAccountRequest request = getRequestById(id);
        request.setPreferredUsername(requestDetails.getPreferredUsername());
        request.setStatus(requestDetails.getStatus());
        request.setApprovedBy(requestDetails.getApprovedBy());
        request.setTimestamp(requestDetails.getTimestamp());
        // Update other fields as necessary
        return employerAccountRequestRepository.save(request);
    }

    public List<EmployerAccountRequest> getAllPendingRequests() {
        return employerAccountRequestRepository.findAllByStatus("PENDING");
    }

    public void deleteRequest(String id) {
        employerAccountRequestRepository.deleteById(id);
    }

    //get next account request
    public EmployerAccountRequest getNextRequest() {
        return employerAccountRequestRepository.findFirstByStatusOrderByTimestampAsc("PENDING");
    }
}
