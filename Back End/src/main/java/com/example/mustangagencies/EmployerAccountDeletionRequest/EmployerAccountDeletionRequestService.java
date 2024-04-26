package com.example.mustangagencies.EmployerAccountDeletionRequest;


import com.example.mustangagencies.User.User;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerAccountDeletionRequestService {
    private final EmployerAccountDeletionRequestRepository deletionRequestRepository; // Corrected repository type
    private final UserRepository userRepository;

    @Autowired
    public EmployerAccountDeletionRequestService(EmployerAccountDeletionRequestRepository deletionRequestRepository, UserRepository userRepository) {
        this.deletionRequestRepository = deletionRequestRepository; // Corrected repository assignment
        this.userRepository = userRepository;
    }

    public EmployerAccountDeletionRequest createOrUpdateRequest(EmployerAccountDeletionRequest request) {
        // Check if the username exists
        String userId = request.getUsername();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Employer not found with id: " + userId));

        // Save the request if the user exists
        return deletionRequestRepository.save(request); // Corrected repository call
    }

    public Optional<EmployerAccountDeletionRequest> getRequestById(Long id) { // Corrected return type
        return deletionRequestRepository.findById(id); //
    }

    public List<EmployerAccountDeletionRequest> getAllRequests() {
        return deletionRequestRepository.findAll();
    }

    public void deleteRequest(Long id) {
        deletionRequestRepository.deleteById(id);
    }

    public List<EmployerAccountDeletionRequest> getAllPendingRequests() {
        return deletionRequestRepository.findAllByStatus("PENDING");
    }
    //get next account request


}