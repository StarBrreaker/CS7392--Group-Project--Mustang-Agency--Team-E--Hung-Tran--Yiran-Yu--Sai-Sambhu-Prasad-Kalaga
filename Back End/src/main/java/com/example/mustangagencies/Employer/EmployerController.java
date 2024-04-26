package com.example.mustangagencies.Employer;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.Professional.ProfessionalRepository;
import com.example.mustangagencies.Professional.ProfessionalService;
import com.example.mustangagencies.User.User;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping(path="/employer")
public class EmployerController {
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private EmployerService employerService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    //Add a mew Employer
    @PostMapping(path="/add")
    public ResponseEntity<?> addEmployer(@RequestParam String username, @RequestParam String companyName,
                                      @RequestParam String registrationNumber, @RequestParam String industry,
                                      @RequestParam String size, @RequestParam String primaryContactFirstName,
                                      @RequestParam String primaryContactLastName, @RequestParam String primaryContactEmail,
                                      @RequestParam String primaryContactPhoneNumber, @RequestParam String primaryContactMailAddress,
                                         @RequestParam String city, @RequestParam String state, @RequestParam String zip,
                                      @RequestParam String websiteLink) {
        Optional<User> userOptional = userRepository.findById(username);
        if (!userOptional.isPresent()) {
            // User not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + username);
        }

        User user = userOptional.get();
        Employer employer = new Employer();
        employer.setEmployerID(username);
        employer.setUser(user);
        employer.setCompanyName(companyName);
        employer.setRegistrationNumber(registrationNumber);
        employer.setIndustry(industry);
        employer.setSize(size);
        employer.setPrimaryContactFirstName(primaryContactFirstName);
        employer.setPrimaryContactLastName(primaryContactLastName);
        employer.setPrimaryContactEmail(primaryContactEmail);
        employer.setPrimaryContactPhoneNumber(primaryContactPhoneNumber);
        employer.setPrimaryContactMailAddress(primaryContactMailAddress);
        employer.setCity(city);
        employer.setState(state);
        employer.setZip(zip);
        employer.setPrimaryContactEmail(primaryContactEmail);
        employer.setWebsiteLink(websiteLink);

        employerRepository.save(employer);


        //Send an email to the user with their username and password
        userRepository.findUserWithCredentialsByUsername(username).ifPresent(userinfo -> {
            // Extract the username and passwordHash
            String extractedUsername = userinfo.getUsername();
            String passwordHash = userinfo.getPasswordHash();

            String emailContent = String.format("Username: %s\n Password hash: %s\n", extractedUsername, passwordHash);

            // Call your email service to send the email
            emailService.sendEmail(primaryContactEmail, "Your Employer Credentials", emailContent);
        });

        // Send an email to the user with the professional information
        String emailBody = String.format("Employer Information: \n" +
                "Company Name: %s\n" +
                "Registration Number: %s\n" +
                "Industry: %s\n" +
                "Size: %s\n" +
                "Primary Contact First Name: %s\n" +
                "Primary Contact Last Name: %s\n" +
                "Primary Contact Email: %s\n" +
                "Primary Contact Phone Number: %s\n" +
                "Primary Contact Mail Address: %s\n" +
                "Website Link: %s\n", companyName, registrationNumber, industry, size,
                primaryContactFirstName, primaryContactLastName, primaryContactEmail,
                primaryContactPhoneNumber, primaryContactMailAddress, websiteLink);


        // Send email
        emailService.sendEmail(primaryContactEmail, "New Professional Added", emailBody);

        return ResponseEntity.ok("Employer added successfully");
    }

    //Show all Professional
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employer> getAllUsers() {
        return employerRepository.findAll();
    }

    //Remove Professional
    @DeleteMapping("/{employerID}")
    public ResponseEntity<?> deleteProfessional(@PathVariable String employerID) {
        if (employerRepository.existsById(employerID)) {
            employerRepository.deleteById(employerID);
            return ResponseEntity.ok().body("Employer with ID " + employerID + " deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Updating Professional information
    @PutMapping("/{employerID}")
    public ResponseEntity<String> updateEmployer(@PathVariable String employerID,
                                                     @RequestParam(required = false) String companyName,
                                                     @RequestParam(required = false) String registrationNumber,
                                                     @RequestParam(required = false) String industry,
                                                     @RequestParam(required = false) String size,
                                                     @RequestParam(required = false) String primaryContactFirstName,
                                                     @RequestParam(required = false) String primaryContactLastName,
                                                     @RequestParam(required = false) String primaryContactEmail,
                                                     @RequestParam(required = false) String primaryContactPhoneNumber,
                                                     @RequestParam(required = false) String primaryContactMailAddress,
                                                     @RequestParam(required = false) String city,
                                                     @RequestParam(required = false) String state,
                                                     @RequestParam(required = false) String zip,
                                                 @RequestParam(required = false) String websiteLink) {
        return employerService.updateEmployer(employerID, companyName, registrationNumber, industry, size, primaryContactFirstName,
                primaryContactLastName,primaryContactEmail,primaryContactPhoneNumber, primaryContactMailAddress,
                city, state, zip, websiteLink);
    }

    @GetMapping("/{employerID}")
    public ResponseEntity<?> getProfessional(@PathVariable String employerID) {
        Optional<Employer> employerOptional = employerRepository.findById(employerID);
        if (!employerOptional.isPresent()) {
            // Professional not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professional not found with username: " + employerID);
        }

        Employer employer = employerOptional.get();
        return ResponseEntity.ok(employer);
    }
}
