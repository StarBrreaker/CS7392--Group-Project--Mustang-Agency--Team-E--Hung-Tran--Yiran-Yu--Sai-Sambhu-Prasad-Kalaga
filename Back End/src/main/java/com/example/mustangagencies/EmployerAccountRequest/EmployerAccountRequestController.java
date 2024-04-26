package com.example.mustangagencies.EmployerAccountRequest;

import com.example.mustangagencies.User.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employerAccountRequests")
public class EmployerAccountRequestController {
    @Autowired
    private EmployerAccountRequestService employerAccountRequestService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;

    @PostMapping("/add")
    public ResponseEntity<?> createRequest(
            @RequestParam String preferredUsername,
            @RequestParam String companyName,
            @RequestParam String registrationNumber,
            @RequestParam String industry,
            @RequestParam String size,
            @RequestParam String primaryContactFirstName,
            @RequestParam String primaryContactLastName,
            @RequestParam String primaryContactEmail,
            @RequestParam String primaryContactPhoneNumber,
            @RequestParam String primaryContactMailAddress,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam String zip,
            @RequestParam String websiteLink
    ) {
        EmployerAccountRequest request = new EmployerAccountRequest();
        request.setPreferredUsername(preferredUsername);
        request.setCompanyName(companyName);
        request.setRegistrationNumber(registrationNumber);
        request.setIndustry(industry);
        request.setSize(size);
        request.setPrimaryContactFirstName(primaryContactFirstName);
        request.setPrimaryContactLastName(primaryContactLastName);
        request.setPrimaryContactEmail(primaryContactEmail);
        request.setPrimaryContactPhoneNumber(primaryContactPhoneNumber);
        request.setPrimaryContactMailAddress(primaryContactMailAddress);
        request.setCity(city);
        request.setState(state);
        request.setZip(zip);
        request.setWebsiteLink(websiteLink);

        // Check if the username already exists
        boolean userExists = userRepository.findByUsername(request.getPreferredUsername()).isPresent();
        if (userExists) {
            // If the username exists, return a conflict response
            return ResponseEntity.status(409).body("Error: Username '" + request.getPreferredUsername() + "' is already taken.");
        }


        if (userExists) {
            // If the username exists, return a conflict response
            return ResponseEntity.status(409).body("Error: Username '" + request.getPreferredUsername() + "' is already taken.");
        }

        // If the username does not exist, proceed with creating the new account request
        EmployerAccountRequest savedRequest = employerAccountRequestService.createRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployerAccountRequest> getRequestById(@PathVariable String id) {
        EmployerAccountRequest request = employerAccountRequestService.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployerAccountRequest>> getAllRequests() {
        List<EmployerAccountRequest> requests = employerAccountRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequestStatus(@PathVariable String id, @RequestParam String status) {
        EmployerAccountRequest existingRequest = employerAccountRequestService.getRequestById(id);
        if (existingRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found with id: " + id);
        }
        existingRequest.setStatus(status);
        EmployerAccountRequest updatedRequest = employerAccountRequestService.updateRequest(id, existingRequest);
        return ResponseEntity.ok(updatedRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable String id) {
        employerAccountRequestService.deleteRequest(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/allPending")
    public ResponseEntity<List<EmployerAccountRequest>> getAllPendingRequests() {
        List<EmployerAccountRequest> requests = employerAccountRequestService.getAllPendingRequests();
        return ResponseEntity.ok(requests);

    }

    @GetMapping("/next")
    public ResponseEntity<EmployerAccountRequest> getNextRequest() {
        EmployerAccountRequest request = employerAccountRequestService.getNextRequest();
        if (request != null) {
            return ResponseEntity.ok(request);
        }
        return ResponseEntity.noContent().build();
    }
}
