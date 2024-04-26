package com.example.mustangagencies.Match;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.JobDescription.JobDescription;
import com.example.mustangagencies.JobDescription.JobDescriptionRepository;
import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.Professional.ProfessionalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;
    @Autowired
    private ProfessionalRepository professionalRepository;
    @Autowired
    private JobDescriptionRepository jobDescriptionRepository;
    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.findAllMatches();
    }

    @GetMapping("/{jobID}/{employerID}/{professionalID}")
    public ResponseEntity<Match> getMatch(@PathVariable String jobID, @PathVariable String employerID, @PathVariable String professionalID) {
        MatchId id = new MatchId(jobID, employerID, professionalID);
        return matchService.findMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{jobID}/{employerID}/{professionalID}")
    public ResponseEntity<Match> updateMatch(@PathVariable String jobID, @PathVariable String employerID, @PathVariable String professionalID, @RequestBody Match matchDetails) {
        MatchId id = new MatchId(jobID, employerID, professionalID);
        matchDetails.setId(id); // Ensure the ID is set in the matchDetails object

        Optional<Match> existingMatch = matchService.findMatchById(id);

        if (existingMatch.isPresent()) {
            Match updatedMatch = matchService.updateMatch(matchDetails);
            return ResponseEntity.ok(updatedMatch);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/employer/{employerID}")
    public ResponseEntity<List<Match>> getMatchesByEmployer(@PathVariable String employerID) {
        List<Match> matches = matchService.findMatchesByEmployer(employerID);
        return ResponseEntity.ok(matches);
    }


    @PostMapping(path = "/add")
    public ResponseEntity<Match> createMatch(
            @RequestParam String jobID,
            @RequestParam String employerID,
            @RequestParam String professionalID,
            @RequestParam Double matchScore

    ) {
        Match match = new Match();
        MatchId id = new MatchId(jobID, employerID, professionalID);
        match.setId(id);
        match.setMatchScore(matchScore);


        Match createdMatch = matchService.saveMatch(match);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMatch);
    }

    @DeleteMapping("/{jobID}/{employerID}/{professionalID}")
    public ResponseEntity<Void> deleteMatch(@PathVariable String jobID, @PathVariable String employerID, @PathVariable String professionalID) {
        MatchId id = new MatchId(jobID, employerID, professionalID);
        matchService.deleteMatch(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findMatches/{professionalId}")
    public ResponseEntity<?> findMatchesForProfessional(@PathVariable String professionalId) {
        Professional professional = professionalRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        List<JobDescription> jobs = jobDescriptionRepository.findAll(); // Assuming a method to get all jobs
        List<JobDescription> matchedJobs = matchService.matchJobs(professional, jobs, 1, 1, 1);

        return ResponseEntity.ok(matchedJobs);
    }

    @GetMapping("/findMatchesAndNotify/{professionalId}")
    public ResponseEntity<?> findMatchesAndNotifyProfessional(@PathVariable String professionalId) {
        Professional professional = professionalRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        List<JobDescription> jobs = jobDescriptionRepository.findAll(); // Assuming a method to get all jobs
        List<JobDescription> matchedJobs = matchService.matchJobs(professional, jobs, 1, 1, 1);

        // Send an email to the professional with the matched jobs
        String subject = "Matched jobs for " + professionalId;
        StringBuilder text = new StringBuilder("You have matched jobs:\n");
        for (JobDescription job : matchedJobs) {
            text.append("Job ID: ").append(job.getJobID()).append(". Position Name: ").append(job.getPositionName()).append("\n");
        }
        emailService.sendEmail(professional.getEmail(), subject, text.toString());

        // Send an email to the contact email on the job description
        for (JobDescription job : matchedJobs) {
            String jobSubject = "Matched professional for " + job.getJobID();
            String jobText = "Professional ID: " + professionalId + " has matched with this job.";
            emailService.sendEmail(job.getEmail(), jobSubject, jobText);
        }

        return ResponseEntity.ok("Notification emails sent successfully!");
    }
}
