package com.example.mustangagencies.ProfessionalAccountRequest;


import com.example.mustangagencies.ProfessionalAccountDeletionRequest.ProfessionalAccountDeletionRequest;
import com.example.mustangagencies.Qualification.Qualification;
import com.example.mustangagencies.User.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/professionalAccountRequests")
public class ProfessionalAccountRequestController {

    @Autowired
    private ProfessionalAccountRequestService professionalAccountRequestService;


    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> createRequest(
            @RequestParam String preferredUsername,
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String dob,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String mailingAddress,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam String zip,
            @RequestParam String degree,
            @RequestParam String institution,
            @RequestParam YearMonth dateOfAward,
            @RequestParam List<String> qualificationCategories,
            @RequestParam List<String> qualificationKeywords
    ) {


        ProfessionalAccountRequest request = new ProfessionalAccountRequest();
        request.setPreferredUsername(preferredUsername);
        request.setFirstName(firstName);
        request.setLastName(lastName);
        request.setDob(LocalDate.parse(dob));
        request.setEmail(email);
        request.setPhone(phone);
        request.setMailingAddress(mailingAddress);
        request.setCity(city);
        request.setState(state);
        request.setZip(zip);
        request.setDegree(degree);
        request.setInstitution(institution);
        request.setDateOfAward(dateOfAward);

        for (int i = 0; i < qualificationCategories.size(); i++) {
            Qualification qualification = new Qualification();
            qualification.setCategory(qualificationCategories.get(i));
            qualification.setKeywords(qualificationKeywords.get(i));
            request.addQualification(qualification);
        }


        // Check if the username already exists
        boolean userExists = userRepository.findByUsername(request.getPreferredUsername()).isPresent();


        if (userExists) {
            // If the username exists, return a conflict response
            return ResponseEntity.status(409).body("Error: Username '" + request.getPreferredUsername() + "' is already taken.");
        }

        // If the username does not exist, proceed with creating the new account request
        ProfessionalAccountRequest savedRequest = professionalAccountRequestService.createRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalAccountRequest> getRequestById(@PathVariable String id) {
        ProfessionalAccountRequest request = professionalAccountRequestService.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProfessionalAccountRequest>> getAllRequests() {
        List<ProfessionalAccountRequest> requests = professionalAccountRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequestStatus(@PathVariable String id, @RequestParam String status) {
        ProfessionalAccountRequest existingRequest = professionalAccountRequestService.getRequestById(id);
        if (existingRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found with id: " + id);
        }
        existingRequest.setStatus(status);
        ProfessionalAccountRequest updatedRequest = professionalAccountRequestService.updateRequest(id, existingRequest);
        return ResponseEntity.ok(updatedRequest);
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<?> updateRequestEmail(@PathVariable String id, @RequestParam String email) {
        ProfessionalAccountRequest existingRequest = professionalAccountRequestService.getRequestById(id);
        if (existingRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found with id: " + id);
        }
        existingRequest.setEmail(email);
        ProfessionalAccountRequest updatedRequest = professionalAccountRequestService.updateRequest(id, existingRequest);
        return ResponseEntity.ok(updatedRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable String id) {
        professionalAccountRequestService.deleteRequest(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/allPending")
    public ResponseEntity<List<ProfessionalAccountRequest>> getAllPendingRequests() {
        List<ProfessionalAccountRequest> requests = professionalAccountRequestService.getAllPendingRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/next")
    public ResponseEntity<ProfessionalAccountRequest> getNextRequest() {
        ProfessionalAccountRequest request = professionalAccountRequestService.getNextRequest();
        if (request != null) {
            return ResponseEntity.ok(request);
        }
        return ResponseEntity.notFound().build();
    }
}
