package com.example.mustangagencies.Professional;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.Qualification.Qualification;
import com.example.mustangagencies.User.User;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/professional")
public class ProfessionalController {
    @Autowired
    private ProfessionalRepository professionalRepository;
    @Autowired
    private ProfessionalService professionalService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;



    //Add a mew Professional
    @PostMapping(path="/add")
    public ResponseEntity<?> addProfessional(@RequestParam String username, @RequestParam String firstName,
                                      @RequestParam String lastName, @RequestParam String dob,
                                      @RequestParam String email, @RequestParam String phoneNumber,
                                      @RequestParam String mailAddress, @RequestParam String city,
                                        @RequestParam String state, @RequestParam String zip,
                                             @RequestParam String degree,
                                      @RequestParam String institution, @RequestParam String dateOfAward,
                                      @RequestParam List<String> qualificationCategories,
                                        @RequestParam List<String> qualificationKeywords
                                             )  {
        Optional<User> userOptional = userRepository.findById(username);
        if (!userOptional.isPresent()) {
            // User not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + username);
        }

        User user = userOptional.get();
        Professional professional = new Professional();
        professional.setProfessionalID(username);
        professional.setUser(user);
        professional.setFirstName(firstName);
        professional.setLastName(lastName);
        professional.setDob(LocalDate.parse(dob)); // Ensure dob is in the correct format
        professional.setEmail(email);
        professional.setPhoneNumber(phoneNumber);
        professional.setMailAddress(mailAddress);
        professional.setCity(city);
        professional.setState(state);
        professional.setZip(zip);
        professional.setDegree(degree);
        professional.setInstitution(institution);
        professional.setDateOfAward(YearMonth.parse(dateOfAward));

        for (int i = 0; i < qualificationCategories.size(); i++) {
            Qualification qualification = new Qualification();
            qualification.setCategory(qualificationCategories.get(i));
            qualification.setKeywords(qualificationKeywords.get(i));
            professional.addQualification(qualification);
        }
        professionalRepository.save(professional);

        // Send an email to the user with their username and password hash
        userRepository.findUserWithCredentialsByUsername(username).ifPresent(userinfo -> {
                    // Extract the username and passwordHash
                    String extractedUsername = userinfo.getUsername();
                    String passwordHash = userinfo.getPasswordHash();

            String emailContent = String.format("Here is your username: %s and your password hash: %s", extractedUsername, passwordHash);

            // Call your email service to send the email
            emailService.sendEmail(email, "Your Professional Credentials", emailContent);
        });

        // Send an email to the user with the professional information
        String emailBody = String.format("Professional Information:\n\nName: %s %s\nDOB: %s\nEmail: %s\nPhone: %s\nAddress: %s\nDegree: %s\nInstitution: %s\nDate of Award: %s",
                firstName, lastName, dob, email, phoneNumber, mailAddress, degree, institution, dateOfAward);

        // Send email
        emailService.sendEmail(email, "New Professional Added", emailBody);

        return ResponseEntity.ok("Professional added successfully");
    }

    //Show all Professional
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Professional> getAllUsers() {
        return professionalRepository.findAll();
    }

    //Remove Professional
    @DeleteMapping("/{professionalID}")
    public ResponseEntity<?> deleteProfessional(@PathVariable String professionalID) {
        if (professionalRepository.existsById(professionalID)) {
            professionalRepository.deleteById(professionalID);
            return ResponseEntity.ok().body("Professional with ID " + professionalID + " deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Updating Professional information
    @PutMapping("/{professionalID}")
    public ResponseEntity<String> updateProfessional(@PathVariable String professionalID,
                                                     @RequestParam(required = false) String firstName,
                                                     @RequestParam(required = false) String lastName,
                                                     @RequestParam(required = false) String dob,
                                                     @RequestParam(required = false) String email,
                                                     @RequestParam(required = false) String phoneNumber,
                                                     @RequestParam(required = false) String mailAddress,
                                                     @RequestParam(required = false) String degree,
                                                     @RequestParam(required = false) String institution,
                                                     @RequestParam(required = false) String dateOfAward,
                                                     @RequestParam(required = false) List<String> qualificationCategories,
                                                     @RequestParam(required = false) List<String> qualificationKeywords) {
        return professionalService.updateProfessional(professionalID, firstName, lastName, dob, email, phoneNumber,
                mailAddress, degree, institution, dateOfAward, qualificationCategories, qualificationKeywords);
    }

    @GetMapping("/{professionalID}")
    public ResponseEntity<?> getProfessional(@PathVariable String professionalID) {
        Optional<Professional> professionalOptional = professionalRepository.findById(professionalID);
        if (!professionalOptional.isPresent()) {
            // Professional not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professional not found with username: " + professionalID);
        }

        Professional professional = professionalOptional.get();
        return ResponseEntity.ok(professional);
    }

}
