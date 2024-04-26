package com.example.mustangagencies.ProfessionalAccountDeletionRequest;

import com.example.mustangagencies.EmployerAccountDeletionRequest.EmployerAccountDeletionRequest;
import com.example.mustangagencies.EmployerAccountRequest.EmployerAccountRequest;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/professionalAccountDeletionRequests")
public class ProfessionalAccountDeletionRequestController {

    private final ProfessionalAccountDeletionRequestService service;
    private final UserRepository userRepository;

    @Autowired
    public ProfessionalAccountDeletionRequestController(ProfessionalAccountDeletionRequestService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/add") // Corrected this line
    public ResponseEntity<?> createRequest(@RequestBody ProfessionalAccountDeletionRequest request) {
        boolean userExists = userRepository.existsById(request.getUsername());
        if (!userExists) {
            // If the user does not exist, return a 404 Not Found response with a message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username '" + request.getUsername() + "' does not exist.");
        }
        // Set status as PENDING and timestamp as now
        request.setStatus("PENDING");
        request.setTimestamp(LocalDateTime.now());

        ProfessionalAccountDeletionRequest savedRequest = service.createOrUpdateRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalAccountDeletionRequest> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProfessionalAccountDeletionRequest>> getAllRequests() {
        List<ProfessionalAccountDeletionRequest> requests = service.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/allPending")
    public ResponseEntity<List<ProfessionalAccountDeletionRequest>> getAllPendingRequests() {
        List<ProfessionalAccountDeletionRequest> requests = service.getAllPendingRequests();
        return ResponseEntity.ok(requests);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        ProfessionalAccountDeletionRequest existingRequest = service.getRequestById(id).orElse(null);
        if (existingRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found with id: " + id);
        }
        existingRequest.setStatus(status);
        ProfessionalAccountDeletionRequest updatedRequest = service.createOrUpdateRequest(existingRequest);
        return ResponseEntity.ok(updatedRequest);
    }
}