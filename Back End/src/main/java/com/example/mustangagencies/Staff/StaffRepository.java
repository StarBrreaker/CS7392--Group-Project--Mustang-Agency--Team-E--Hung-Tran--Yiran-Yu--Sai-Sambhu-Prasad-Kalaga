package com.example.mustangagencies.Staff;


import org.springframework.data.repository.CrudRepository;

public interface StaffRepository extends CrudRepository<Staff, String> {
    // Custom query methods if needed
    //Optional<Staff> findByUsername(String username);
}