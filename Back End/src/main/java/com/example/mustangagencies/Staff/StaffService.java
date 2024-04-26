package com.example.mustangagencies.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;

    public ResponseEntity<String> updateStaff(String staffID, String firstName, String lastName, String dob, String email, String phoneNumber) {
        Optional<Staff> staffOptional = staffRepository.findById(staffID);
        if (staffOptional.isPresent()) {
            Staff staff = staffOptional.get();

            if (firstName != null) staff.setFirstName(firstName);
            if (lastName != null) staff.setLastName(lastName);
            if (dob != null) staff.setDob(LocalDate.parse(dob));
            if (email != null) staff.setEmail(email);
            if (phoneNumber != null) staff.setPhoneNumber(phoneNumber);

            staffRepository.save(staff);
            return ResponseEntity.ok("Staff updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
