package com.example.mustangagencies.ProfessionalAccountRequest;

import com.example.mustangagencies.Qualification.Qualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessionalAccountRequestService {

    @Autowired
    private ProfessionalAccountRequestRepository professionalAccountRequestRepository;

    public ProfessionalAccountRequest createRequest(ProfessionalAccountRequest request) {
        // Additional business logic can be added here
        if (request.getQualificationCategories() != null && request.getQualificationKeywords() != null) {
            // Your existing logic to process qualifications
            for (String category : request.getQualificationCategories()) {
                for (String keyword : request.getQualificationKeywords()) {
                    Qualification qualification = new Qualification();
                    qualification.setCategory(category);
                    qualification.setKeywords(keyword);
                    request.addQualification(qualification);
                }
            }
        }
        // Create Qualification objects and add them to the request


        return professionalAccountRequestRepository.save(request);
    }

    public ProfessionalAccountRequest getRequestById(String id) {
        Optional<ProfessionalAccountRequest> request = professionalAccountRequestRepository.findById(id);
        if (request.isPresent()) {
            return request.get();
        } else {
            throw new RuntimeException("Request not found with id: " + id);
        }
    }

    public List<ProfessionalAccountRequest> getAllRequests() {
        return professionalAccountRequestRepository.findAll();
    }

    public ProfessionalAccountRequest updateRequest(String id, ProfessionalAccountRequest requestDetails) {
        ProfessionalAccountRequest request = getRequestById(id);
        request.setPreferredUsername(requestDetails.getPreferredUsername());
        request.setStatus(requestDetails.getStatus());
        request.setApprovedBy(requestDetails.getApprovedBy());
        request.setTimestamp(requestDetails.getTimestamp());
        // Update other fields as necessary
        return professionalAccountRequestRepository.save(request);
    }

    public void deleteRequest(String id) {
        professionalAccountRequestRepository.deleteById(id);
    }

    public List<ProfessionalAccountRequest> getAllPendingRequests() {
        return professionalAccountRequestRepository.findAllByStatus("PENDING");
    }
    public ProfessionalAccountRequest getNextRequest() {
        return professionalAccountRequestRepository.findFirstByStatusOrderByTimestampAsc("PENDING");
    }
}

