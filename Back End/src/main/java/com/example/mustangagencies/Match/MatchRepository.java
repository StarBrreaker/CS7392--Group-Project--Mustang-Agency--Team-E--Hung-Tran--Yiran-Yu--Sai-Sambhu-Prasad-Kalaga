package com.example.mustangagencies.Match;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, MatchId> {

    // Example of using a custom JPQL query to access the embedded id field
    @Query("SELECT m FROM Match m WHERE m.id.employerID = :employerID")
    List<Match> findByEmployerID(@Param("employerID") String employerID);

}

