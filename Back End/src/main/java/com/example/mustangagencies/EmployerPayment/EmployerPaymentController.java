package com.example.mustangagencies.EmployerPayment;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.Employer.Employer;
import com.example.mustangagencies.Employer.EmployerRepository;
import com.example.mustangagencies.EmployerPayment.EmployerPayment;
import com.example.mustangagencies.EmployerPayment.EmployerPaymentService;
import com.example.mustangagencies.ProfessionalPayment.ProfessionalPayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/employerPayments")
public class EmployerPaymentController {
    private final EmployerPaymentService employerPaymentService;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    public EmployerPaymentController(EmployerPaymentService employerPaymentService) {
        this.employerPaymentService = employerPaymentService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createEmployerPayment(@RequestParam String paymentID, @RequestParam Double paymentBalance, @RequestParam String dueDate) {
        Optional<Employer> employerOptional = employerRepository.findById(paymentID);
        if (!employerOptional.isPresent()) {
            // User not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employer not found with ID: " + paymentID);
        }
        Employer employer = employerOptional.get();
        String email = employer.getPrimaryContactEmail();

        EmployerPayment employerPayment = new EmployerPayment();
        employerPayment.setPaymentID(paymentID);
        employerPayment.setPaymentBalance(paymentBalance);
        employerPayment.setDueDate(LocalDate.parse(dueDate));
        employerPayment.setNextBillingDate(LocalDate.now().plusMonths(1));
        EmployerPayment savedEmployerPayment = employerPaymentService.createOrUpdateEmployerPayment(employerPayment);

        // Send an email to the user with the professional information
        String emailBody = String.format("Employer Payment Information:\n\n Payment ID: %s\n Payment Balance: %s\n Next Billing Date: %s",
                paymentID, employerPayment.getPaymentBalance(), employerPayment.getNextBillingDate());

        // Send email
        emailService.sendEmail(email, "New Professional Payment", emailBody);

        return ResponseEntity.ok("Employer Payment added successfully");
    }

    @GetMapping("/{paymentID}")
    public ResponseEntity<EmployerPayment> getEmployerPaymentById(@PathVariable String paymentID) {
        return employerPaymentService.getEmployerPaymentById(paymentID)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{paymentID}/balance")
    public ResponseEntity<?> updateEmployerPaymentBalance(@PathVariable String paymentID, @RequestBody Map<String, Object> updates) {
        return employerPaymentService.getEmployerPaymentById(paymentID).map(employerPayment -> {
            if (updates.containsKey("paymentBalance")) {
                try {
                    double newBalance = ((Number) updates.get("paymentBalance")).doubleValue();
                    employerPayment.setPaymentBalance(newBalance);
                    employerPayment.setPaymentStatus("UNPAID");
                    EmployerPayment updatedEmployerPayment = employerPaymentService.createOrUpdateEmployerPayment(employerPayment);
                    return ResponseEntity.ok(updatedEmployerPayment);
                } catch (ClassCastException | NullPointerException e) {
                    return ResponseEntity.badRequest().body("Invalid payment balance value");
                }
            } else {
                return ResponseEntity.badRequest().body("Missing payment balance update data");
            }
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("EmployerPayment not found with id: " + paymentID));
    }

@PatchMapping("/{paymentID}/processPayment")
public ResponseEntity<?> processPayment(@PathVariable String paymentID, @RequestParam double amountPaid) {
    return employerPaymentService.getEmployerPaymentById(paymentID).map(employerPayment -> {
        try {
            //double amountPaid = ((Number) paymentData.get("amountPaid")).doubleValue();
            double initialBalance = employerPayment.getPaymentBalance();
            double newBalance = initialBalance - amountPaid;

            if (newBalance < 0) {
                return ResponseEntity.badRequest().body("Insufficient funds for the transaction.");
            }

            employerPayment.setPaymentBalance(newBalance);
            //employerPayment.setPreviousBillingDate(employerPayment.getNextBillingDate());
            // professionalPayment.setNextBillingDate(...);

            if (employerPayment.getPaymentBalance() == 0.00) {
                employerPayment.setPaymentStatus("PAID");
            }
            String status = employerPayment.getPaymentStatus();


            EmployerPayment updatedEmployerPayment = employerPaymentService.createOrUpdateEmployerPayment(employerPayment);
            // Return both initial and updated balance for demonstration
            Map<String, Object> response = new HashMap<>();
            response.put("initialBalance", initialBalance);
            response.put("updatedBalance", newBalance);
            response.put("employerPayment", updatedEmployerPayment);
            response.put("Status", status);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing payment: " + e.getMessage());
        }
    }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("employerPayment not found with id: " + paymentID));
}

    @GetMapping("/all")
    public ResponseEntity<List<EmployerPayment>> getAllEmployerPayments() {
        List<EmployerPayment> employerPayments = employerPaymentService.getAllEmployerPayments();
        return ResponseEntity.ok(employerPayments);
    }

    @DeleteMapping("/{paymentID}")
    public ResponseEntity<Void> deleteEmployerPayment(@PathVariable String paymentID) {
        employerPaymentService.deleteEmployerPayment(paymentID);
        return ResponseEntity.ok().build();
    }

    // Add more endpoints as needed for your business logic
}
