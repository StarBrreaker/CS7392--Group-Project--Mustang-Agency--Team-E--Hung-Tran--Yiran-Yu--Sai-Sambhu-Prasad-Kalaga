package com.example.mustangagencies.ProfessionalAccountDeletionRequest;


import com.example.mustangagencies.User.User;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessionalAccountDeletionRequestService {

    private final ProfessionalAccountDeletionRequestRepository requestRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfessionalAccountDeletionRequestService(ProfessionalAccountDeletionRequestRepository requestRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    public ProfessionalAccountDeletionRequest createOrUpdateRequest(ProfessionalAccountDeletionRequest request) {
        // Check if the username exists
        String userId  = request.getUsername();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Professional not found with id: " + userId));

        // Save the request if the user exists

        return requestRepository.save(request);
    }

    public Optional<ProfessionalAccountDeletionRequest> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public List<ProfessionalAccountDeletionRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public List<ProfessionalAccountDeletionRequest> getAllPendingRequests() {
        return requestRepository.findAllByStatus("PENDING");
    }
}
