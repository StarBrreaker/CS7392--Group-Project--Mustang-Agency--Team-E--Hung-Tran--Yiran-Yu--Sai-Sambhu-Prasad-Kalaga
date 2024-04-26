package com.example.mustangagencies.JobDescription;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDescriptionRepository extends JpaRepository<JobDescription, String> {
    @Query("SELECT jd FROM JobDescription jd WHERE jd.employer.employerID = :employerId")
    List<JobDescription> findByEmployer_EmployerID(@Param("employerId") String employerId); // This assumes your Employer entity has a field named employerID.
}
