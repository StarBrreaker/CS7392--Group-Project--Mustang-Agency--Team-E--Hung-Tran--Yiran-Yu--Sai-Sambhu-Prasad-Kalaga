package com.example.mustangagencies.Employer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;

    public Optional<Employer> getEmployerById(String employerID) {
        return employerRepository.findById(employerID);
    }
    public ResponseEntity<String> updateEmployer(String employerID, String companyName, String registrationNumber,
                                                 String industry, String size, String primaryContactFirstName,
                                                 String primaryContactLastName, String primaryContactEmail, String primaryContactPhoneNumber,
                                                 String primaryContactMailAddress, String city, String state, String zip, String websiteLink) {
        Optional<Employer> employerOptional = employerRepository.findById(employerID);
        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();

            if (companyName != null && companyName != "") employer.setCompanyName(companyName);
            if (registrationNumber != null && registrationNumber != "") employer.setRegistrationNumber(registrationNumber);
            if (industry != null && industry != "") employer.setIndustry(industry);
            if (size != null && size != "") employer.setSize(size);
            if (primaryContactFirstName != null && primaryContactFirstName != "") employer.setPrimaryContactFirstName(primaryContactFirstName);
            if (primaryContactLastName != null && primaryContactLastName != "") employer.setPrimaryContactLastName(primaryContactLastName);
            if (primaryContactEmail != null && primaryContactEmail != "") employer.setPrimaryContactEmail(primaryContactEmail);
            if (primaryContactPhoneNumber != null && primaryContactPhoneNumber != "") employer.setPrimaryContactPhoneNumber(primaryContactPhoneNumber);
            if (primaryContactMailAddress != null && primaryContactMailAddress != "") employer.setPrimaryContactMailAddress(primaryContactMailAddress);
            if (city != null && city != "") employer.setCity(city);
            if (state != null && state != "") employer.setState(state);
            if (zip != null && zip != "") employer.setZip(zip);
            if (websiteLink != null && websiteLink != "") employer.setWebsiteLink(websiteLink);


            employerRepository.save(employer);
            return ResponseEntity.ok("Employer updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}