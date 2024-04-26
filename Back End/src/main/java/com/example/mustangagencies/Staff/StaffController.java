package com.example.mustangagencies.Staff;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.User.User;
import com.example.mustangagencies.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping(path="/staff")
public class StaffController {
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StaffService staffService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    //Add a mew Staff
    @PostMapping(path="/add")
    public ResponseEntity<?> addStaff(@RequestParam String username, @RequestParam String firstName,
                                      @RequestParam String lastName, @RequestParam String dob,
                                      @RequestParam String email, @RequestParam String phoneNumber) {
        Optional<User> userOptional = userRepository.findById(username);
        if (!userOptional.isPresent()) {
            // User not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + username);
        }
        if (dob == null || dob.isEmpty()) {
            return new ResponseEntity<>("Date of birth is required", HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();
        Staff staff = new Staff();
        staff.setStaffID(username);
        staff.setUser(user);
        staff.setFirstName(firstName);
        staff.setLastName(lastName);
        staff.setDob(LocalDate.parse(dob)); // Ensure dob is in the correct format
        staff.setEmail(email);
        staff.setPhoneNumber(phoneNumber);

        staffRepository.save(staff);

        //Send an email to the user with their username and password
        try {
            userRepository.findUserWithCredentialsByUsername(username).ifPresent(userinfo -> {
                // Extract the username and passwordHash
                String extractedUsername = userinfo.getUsername();
                String passwordHash = userinfo.getPasswordHash();

                String emailContent = String.format("Username: %s\n Password hash: %s\n", extractedUsername, passwordHash);

                // Call your email service to send the email
                emailService.sendEmail(email, "Your Staff Credentials", emailContent);
            });
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while sending the email: " + e.getMessage());
        }
        try {
            // Send an email to the user with the staff information
            String emailBody = String.format("Staff Information:\n\n First Name: %s\n Last Name: %s\n Date of Birth: %s\n Email: %s\n Phone Number: %s",
                    firstName, lastName, dob, email, phoneNumber);
            emailService.sendEmail(email, "New Staff Added", emailBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while sending the email: " + e.getMessage());
        }



        return ResponseEntity.ok("Staff added successfully");
    }
    //Show all Staff
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Staff> getAllUsers() {
        return staffRepository.findAll();
    }
    //Remove Staff
    @DeleteMapping("/{staffID}")
    public ResponseEntity<?> deleteStaff(@PathVariable String staffID) {
        if (staffRepository.existsById(staffID)) {
            staffRepository.deleteById(staffID);
            return ResponseEntity.ok().body("Staff with ID " + staffID + " deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Updating Staff information
    @PutMapping("/{staffID}")
    public ResponseEntity<String> updateStaff(@PathVariable String staffID,
                                              @RequestParam(required = false) String firstName,
                                              @RequestParam(required = false) String lastName,
                                              @RequestParam(required = false) String dob,
                                              @RequestParam(required = false) String email,
                                              @RequestParam(required = false) String phoneNumber) {
        return staffService.updateStaff(staffID, firstName, lastName, dob, email, phoneNumber);
    }

    @GetMapping("/{staffID}")
    public ResponseEntity<?> getStaff(@PathVariable String staffID) {
        Optional<Staff> staffOptional = staffRepository.findById(staffID);
        if (!staffOptional.isPresent()) {
            // Staff not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff not found with username: " + staffID);
        }

        Staff staff = staffOptional.get();
        return ResponseEntity.ok(staff);
    }
}
