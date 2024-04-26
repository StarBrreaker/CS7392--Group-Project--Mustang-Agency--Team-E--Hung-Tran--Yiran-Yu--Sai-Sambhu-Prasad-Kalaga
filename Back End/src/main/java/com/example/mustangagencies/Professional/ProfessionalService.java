package com.example.mustangagencies.Professional;

import com.example.mustangagencies.Qualification.Qualification;
import com.example.mustangagencies.Qualification.QualificationRepository;
import com.example.mustangagencies.Staff.Staff;
import com.example.mustangagencies.Staff.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessionalService {
    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private QualificationRepository qualificationRepository;

    @Transactional
    public ResponseEntity<String> updateProfessional(String professionalID, String firstName, String lastName, String dob, String email, String phoneNumber,
                                                     String mailAddress, String degree, String institution, String dateOfAward,
                                                     List<String> qualificationCategories, List<String> qualificationKeywords) {
        Optional<Professional> professionalOptional = professionalRepository.findById(professionalID);
        if (professionalOptional.isPresent()) {
            Professional professional = professionalOptional.get();

            if (firstName != null && firstName != "") professional.setFirstName(firstName);
            if (lastName != null && lastName != "") professional.setLastName(lastName);
            if (dob != null && dob != "") professional.setDob(LocalDate.parse(dob));
            if (email != null && email != "") professional.setEmail(email);
            if (phoneNumber != null && phoneNumber != "") professional.setPhoneNumber(phoneNumber);
            if (mailAddress != null && mailAddress != "") professional.setMailAddress(mailAddress);
            if (degree != null && degree != "") professional.setDegree(degree);
            if (institution != null && institution != "") professional.setInstitution(institution);
            if (dateOfAward != null && dateOfAward != "") professional.setDateOfAward(YearMonth.parse(dateOfAward));


            if (qualificationCategories != null && qualificationKeywords != null) {
                professional.getQualifications().forEach(qualification -> {
                    qualification.setProfessional(null); // Disassociate the qualification from the professional
                });
                professional.getQualifications().clear();

                for (int i = 0; i < qualificationCategories.size(); i++) {
                    Qualification qualification = new Qualification();
                    qualification.setCategory(qualificationCategories.get(i));
                    qualification.setKeywords(qualificationKeywords.get(i));
                    qualification.setProfessional(professional);
                    professional.getQualifications().add(qualification);
                }
            }

            professionalRepository.save(professional);
            return ResponseEntity.ok("Professional updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
