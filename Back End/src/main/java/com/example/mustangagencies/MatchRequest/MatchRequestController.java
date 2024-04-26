package com.example.mustangagencies.MatchRequest;

import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.Professional.ProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matchRequest")
public class MatchRequestController {

    @Autowired
    private ProfessionalRepository professionalRepository;

    private final MatchRequestService matchRequestService;

    @Autowired
    public MatchRequestController(MatchRequestService matchRequestService) {
        this.matchRequestService = matchRequestService;
    }

    @GetMapping
    public ResponseEntity<List<MatchRequest>> getAllMatchRequests() {
        return ResponseEntity.ok(matchRequestService.getAllMatchRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchRequest> getMatchRequestById(@PathVariable Long id) {
        MatchRequest matchRequest = matchRequestService.getMatchRequestById(id);
        if (matchRequest != null) {
            return ResponseEntity.ok(matchRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> createMatchRequest(@RequestParam("professionalID") String professionalID) {
        Professional professional = professionalRepository.findById(professionalID).orElse(null);
        if (professional == null) {
            // Return a ResponseEntity with a string body and NOT_FOUND status
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professional not found with ID: " + professionalID);
        }
        MatchRequest matchRequest = new MatchRequest();
        matchRequest.setRequestBy(professional);
        MatchRequest createdMatchRequest = matchRequestService.createMatchRequest(matchRequest);
        // Return a ResponseEntity with a MatchRequest body and CREATED status
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMatchRequest);
    }

    @PutMapping
    public ResponseEntity<MatchRequest> updateMatchRequest(@RequestBody MatchRequest matchRequest) {
        return ResponseEntity.ok(matchRequestService.updateMatchRequest(matchRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatchRequest(@PathVariable Long id) {
        matchRequestService.deleteMatchRequest(id);
        return ResponseEntity.noContent().build();
    }
    //Get all Pending Match Requests
    @GetMapping("/allPending")
    public ResponseEntity<List<MatchRequest>> getAllPendingMatchRequests() {
        List<MatchRequest> matchRequests = matchRequestService.getAllPendingMatchRequests();
        return ResponseEntity.ok(matchRequests);
    }
}