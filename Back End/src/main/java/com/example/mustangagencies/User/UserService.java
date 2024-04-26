package com.example.mustangagencies.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> addUser(User user) {
        if (userRepository.existsById(user.getUsername())) {
            // Handle the case where the user already exists.
            // You could also throw an exception here if you prefer.
            // Return error response

        }
        userRepository.save(user);
        return ResponseEntity.ok("User added successfully.");
    }
    public String updatePassword(String username, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Assuming you store passwords in plain text for this example.
            // In a real application, passwords should be hashed and securely managed.
            if (user.getPasswordHash().equals(oldPassword)) {
                user.setPasswordHash(newPassword);
                user.setIsPasswordChanged(true);
                userRepository.save(user);
                return "Password updated successfully.";
            } else {
                return "Old password is incorrect.";
            }
        } else {
            return "User not found.";
        }
    }

    public boolean checkIfUserActive (String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getIsActive();
        }
        return false;
    }

    public boolean authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Again, assuming plain text passwords for simplicity.
            return user.getPasswordHash().equals(password);
        }
        return false;
    }

    public String deactivateUser(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setIsActive(false);
            userRepository.save(user);
            return "User deactivated successfully.";
        } else {
            return "User not found.";
        }
    }
    // You can also add a method for updating a user here if needed.
    public String activateUser(String username){
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setIsActive(true);
            userRepository.save(user);
            return "User activated successfully.";
        } else {
            return "User not found.";
        }
    }
    public UserType getUserType(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getUserType();
        }
        return null;
    }


    public String updatePasswordChanged(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setIsPasswordChanged(false);
            userRepository.save(user);
            return "Password changed status updated successfully.";
        } else {
            return "User not found.";
        }
    }
}
