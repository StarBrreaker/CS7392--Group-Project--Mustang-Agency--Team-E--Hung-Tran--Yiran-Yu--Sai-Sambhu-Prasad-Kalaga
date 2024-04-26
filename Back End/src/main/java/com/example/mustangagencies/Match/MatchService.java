package com.example.mustangagencies.Match;

import com.example.mustangagencies.JobDescription.JobDescription;
import com.example.mustangagencies.Professional.Professional;
import com.example.mustangagencies.Qualification.Qualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> findAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> findMatchById(MatchId id) {
        return matchRepository.findById(id);
    }

    public Match saveMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateMatch(Match match) {
        // Ensure the match exists before updating
        MatchId id = new MatchId(match.getJobID(), match.getEmployerID(), match.getProfessionalID());
        if (matchRepository.existsById(id)) {
            return matchRepository.save(match);
        } else {
            throw new RuntimeException("Match not found with id: " + id);
        }
    }


    public List<Match> findMatchesByEmployer(String employerID) {
        return matchRepository.findByEmployerID(employerID);
    }

    public void deleteMatch(MatchId id) {
        matchRepository.deleteById(id);
    }

    public List<JobDescription> matchJobs(Professional professional, List<JobDescription> jobList, double ThC, double ThK, int NK) {
        List<JobDescription> matchedJobs = new ArrayList<>();

        for (JobDescription job : jobList) {
            boolean categoryMatched = false;
            for (Qualification jobQualification : job.getQualifications()) {
                for (Qualification proQualification : professional.getQualifications()) {
                    if (calculateSimilarity(jobQualification.getCategory(), proQualification.getCategory()) >= ThC) {
                        int keywordMatches = 0;
                        // Assuming keywords are separated by commas and stored as a single String
                        String[] jobKeywords = jobQualification.getKeywords().split(",");
                        String[] proKeywords = proQualification.getKeywords().split(",");
                        for (String jobKeyword : jobKeywords) {
                            for (String proKeyword : proKeywords) {
                                if (calculateSimilarity(jobKeyword.trim(), proKeyword.trim()) >= ThK) {
                                    keywordMatches++;
                                }
                            }
                        }
                        if (keywordMatches >= NK) {
                            categoryMatched = true;
                            break;
                        }
                    }
                }
                if (categoryMatched) {
                    matchedJobs.add(job);
                    break;
                }
            }
        }
        return matchedJobs;
    }

    private double calculateSimilarity(String str1, String str2) {
        str1 = str1.toLowerCase(); // Convert to lower case for case-insensitive comparison
        str2 = str2.toLowerCase();

        // Check if either string contains the other
        if (str1.contains(str2) || str2.contains(str1)) {
            return 1.0; // Return a high similarity for partial matches
        } else {
            return 0.0; // Return zero similarity if there's no match
        }

    }


}
