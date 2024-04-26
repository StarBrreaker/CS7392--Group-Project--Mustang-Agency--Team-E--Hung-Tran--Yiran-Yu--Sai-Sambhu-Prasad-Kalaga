package com.example.mustangagencies.User;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Optional;
import java.util.List;


public interface UserRepository extends JpaRepository<User, String> {
        Optional<User> findByUsername(String username);

        List<User> findByUserType(UserType userType);
        @Query("SELECT u FROM User u WHERE u.username = :username")
        Optional<User> findUserWithCredentialsByUsername(String username);
}
