package com.example.mustangagencies.Email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestParam String toEmail, @RequestParam String subject, @RequestParam String message) {
        emailService.sendEmail(toEmail, subject, message);
        return ResponseEntity.ok("Email sent successfully");
    }
}