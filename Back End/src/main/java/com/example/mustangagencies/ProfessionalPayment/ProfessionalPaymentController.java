package com.example.mustangagencies.ProfessionalPayment;

import com.example.mustangagencies.Email.EmailService;
import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.Professional.ProfessionalRepository;
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
@RequestMapping("/professionalPayments")
public class ProfessionalPaymentController {

    private final ProfessionalPaymentService professionalPaymentService;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    public ProfessionalPaymentController(ProfessionalPaymentService professionalPaymentService) {
        this.professionalPaymentService = professionalPaymentService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createProfessionalPayment(@RequestParam String paymentID, @RequestParam Double paymentBalance, @RequestParam LocalDate dueDate) {
        Optional<Professional> professionalOptional = professionalRepository.findById(paymentID);
        if (!professionalOptional.isPresent()) {
            // User not found, return a 404 Not Found response with a custom error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professional not found with ID: " + paymentID);
        }

        Professional professional = professionalOptional.get();
        String email = professional.getEmail();
        //System.out.println(email);

        ProfessionalPayment professionalPayment = new ProfessionalPayment();
        professionalPayment.setPaymentID(paymentID);
        professionalPayment.setPaymentBalance(paymentBalance);
        professionalPayment.setDueDate(dueDate);
        professionalPayment.setNextBillingDate(dueDate.plusMonths(1));
        ProfessionalPayment savedProfessionalPayment = professionalPaymentService.createOrUpdateProfessionalPayment(professionalPayment);


        // Send an email to the user with the professional information
        String emailBody = String.format("Professional Payment Information:\n\n Payment ID: %s\n Payment Balance: %s\n Next Billing Date: %s",
                paymentID, professionalPayment.getPaymentBalance(), professionalPayment.getNextBillingDate());

        // Send email
        emailService.sendEmail(email, "New Professional Payment", emailBody);


        return ResponseEntity.ok("Professional Payment added successfully");
    }

    @GetMapping("/{paymentID}")
    public ResponseEntity<ProfessionalPayment> getProfessionalPaymentById(@PathVariable String paymentID) {
        return professionalPaymentService.getProfessionalPaymentById(paymentID)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{paymentID}/balance")
    public ResponseEntity<?> updateProfessionalPaymentBalance(@PathVariable String paymentID, @RequestBody Map<String, Object> updates) {
        return professionalPaymentService.getProfessionalPaymentById(paymentID).map(professionalPayment -> {
            if (updates.containsKey("paymentBalance")) {
                try {
                    double newBalance = ((Number) updates.get("paymentBalance")).doubleValue();
                    professionalPayment.setPaymentBalance(newBalance);
                    professionalPayment.setPaymentStatus(newBalance == 0.00 ? "PAID" : "UNPAID");
                    ProfessionalPayment updatedProfessionalPayment = professionalPaymentService.createOrUpdateProfessionalPayment(professionalPayment);
                    return ResponseEntity.ok(updatedProfessionalPayment);
                } catch (ClassCastException | NullPointerException e) {
                    return ResponseEntity.badRequest().body("Invalid payment balance value");
                }
            } else {
                return ResponseEntity.badRequest().body("Missing payment balance update data");
            }
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProfessionalPayment not found with id: " + paymentID));
    }

    @PatchMapping("/{paymentID}/processPayment")
    public ResponseEntity<?> processPayment(@PathVariable String paymentID, @RequestParam double amountPaid) {
        return professionalPaymentService.getProfessionalPaymentById(paymentID).map(professionalPayment -> {
            try {
                //double amountPaid = ((Number) paymentData.get("amountPaid")).doubleValue();
                double initialBalance = professionalPayment.getPaymentBalance();
                double newBalance = initialBalance - amountPaid;

                if (newBalance < 0) {
                    return ResponseEntity.badRequest().body("Insufficient funds for the transaction.");
                }

                professionalPayment.setPaymentBalance(newBalance);

                if (professionalPayment.getPaymentBalance() == 0.00) {
                    professionalPayment.setPaymentStatus("PAID");
                }
                String status = professionalPayment.getPaymentStatus();

                ProfessionalPayment updatedProfessionalPayment = professionalPaymentService.createOrUpdateProfessionalPayment(professionalPayment);
                // Return both initial and updated balance for demonstration
                Map<String, Object> response = new HashMap<>();
                response.put("initialBalance", initialBalance);
                response.put("updatedBalance", newBalance);
                response.put("professionalPayment", updatedProfessionalPayment);
                response.put("Status", status);

                return ResponseEntity.ok(response);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error processing payment: " + e.getMessage());
            }
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProfessionalPayment not found with id: " + paymentID));
    }


    @GetMapping("/all")
    public ResponseEntity<List<ProfessionalPayment>> getAllProfessionalPayments() {
        List<ProfessionalPayment> professionalPayments = professionalPaymentService.getAllProfessionalPayments();
        return ResponseEntity.ok(professionalPayments);
    }

    @DeleteMapping("/{paymentID}")
    public ResponseEntity<Void> deleteProfessionalPayment(@PathVariable String paymentID) {
        professionalPaymentService.deleteProfessionalPayment(paymentID);
        return ResponseEntity.ok().build();
    }

    // Add more endpoints as needed for your business logic
}
