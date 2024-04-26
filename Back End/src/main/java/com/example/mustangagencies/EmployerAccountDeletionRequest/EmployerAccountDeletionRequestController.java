package com.example.mustangagencies.EmployerAccountDeletionRequest;

import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/employerAccountDeletionRequests")
public class EmployerAccountDeletionRequestController {
    private final EmployerAccountDeletionRequestService service;
    private final UserRepository userRepository;

    @Autowired
    public EmployerAccountDeletionRequestController(EmployerAccountDeletionRequestService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createRequest(@RequestBody EmployerAccountDeletionRequest request) {
        boolean userExists = userRepository.existsById(request.getUsername());
        if (!userExists) {
            // If the user does not exist, return a 404 Not Found response with a message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username '" + request.getUsername() + "' does not exist.");
        }

        // Set status as PENDING and timestamp as now
        request.setStatus("PENDING");
        request.setTimestamp(LocalDateTime.now());

        EmployerAccountDeletionRequest savedRequest = service.createOrUpdateRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployerAccountDeletionRequest> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployerAccountDeletionRequest>> getAllRequests() {
        List<EmployerAccountDeletionRequest> requests = service.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/allPending")
    public ResponseEntity<List<EmployerAccountDeletionRequest>> getAllPendingRequests() {
        List<EmployerAccountDeletionRequest> requests = service.getAllPendingRequests();
        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        EmployerAccountDeletionRequest existingRequest = service.getRequestById(id).orElse(null);
        if (existingRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found with id: " + id);
        }
        existingRequest.setStatus(status);
        EmployerAccountDeletionRequest updatedRequest = service.createOrUpdateRequest(existingRequest);
        return ResponseEntity.ok(updatedRequest);
    }


}
