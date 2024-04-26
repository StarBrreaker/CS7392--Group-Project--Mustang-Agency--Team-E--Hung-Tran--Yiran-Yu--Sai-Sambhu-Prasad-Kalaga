package com.example.mustangagencies.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.security.SecureRandom;
import java.util.Base64;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@Controller // This means that this class is a Controller
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser (@RequestParam String username, @RequestParam String userType) {
        //Check if user already exists
        if (userRepository.existsById(username)) {
            return ResponseEntity.status(409).body("User already exists.");
        }

        User user = new User();
        user.setUsername(username);

        // Generate a random password
        SecureRandom secureRandom = new SecureRandom();
        String upperAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerAlphabets = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*()_-+=<>?/{}~|";
        String allCharacters = upperAlphabets + lowerAlphabets + numbers + specialCharacters;

        StringBuilder passwordBuilder = new StringBuilder();
        passwordBuilder.append(upperAlphabets.charAt(secureRandom.nextInt(upperAlphabets.length())));
        passwordBuilder.append(lowerAlphabets.charAt(secureRandom.nextInt(lowerAlphabets.length())));
        passwordBuilder.append(numbers.charAt(secureRandom.nextInt(numbers.length())));
        passwordBuilder.append(specialCharacters.charAt(secureRandom.nextInt(specialCharacters.length())));

        for (int i = 4; i < 10; i++) { // You can adjust the length
            passwordBuilder.append(allCharacters.charAt(secureRandom.nextInt(allCharacters.length())));
        }

        String generatedPassword = passwordBuilder.toString();

        // Consider hashing the generated password before storing
        user.setPasswordHash(generatedPassword);

        try {
            UserType type = UserType.valueOf(userType.toUpperCase());
            user.setUserType(type);
        } catch (IllegalArgumentException e) {
            //return "Invalid user type: " + userType +". Valid User Types: Professional, Employer, Staff";
            return ResponseEntity.status(400).body("Invalid user type: " + userType +". Valid User Types: Professional, Employer, Staff");
        }
        user.setIsActive(true);

        return userService.addUser(user);
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Method to remove a user by username
    @DeleteMapping(path="/remove") // Map ONLY DELETE Requests
    public @ResponseBody String removeUserByUsername(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return "Deleted";
        } else {
            return "User not found with username: " + username;
        }
    }
    @PostMapping(path="/updatePassword")
    public @ResponseBody String updatePassword(@RequestParam String username, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return userService.updatePassword(username, oldPassword, newPassword);
    }

    @PatchMapping(path="/deactivate")
    public @ResponseBody String deactivateUser(@RequestParam String username) {
        return userService.deactivateUser(username);
    }

    @PatchMapping(path="/activate")
    public @ResponseBody String activateUser(@RequestParam String username) {
        return userService.activateUser(username);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping(path="/login")
    public @ResponseBody String login(@RequestParam String username, @RequestParam String password) {
        boolean isActive = userService.checkIfUserActive(username);
        if (!isActive) {
            return "User is not active.";
        }
        boolean isAuthenticated = userService.authenticateUser(username, password);
        if (isAuthenticated) {
            UserType userType = userService.getUserType(username);
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null && !user.getIsPasswordChanged()) {
                return userType.name() + "*";
            }

            return userType.name();
        } else {
            return "Login failed.";
        }
    }

    //Add a method to update isPasswordChanged field in User entity
    @PatchMapping(path="/updatePasswordChanged")
    public @ResponseBody String updatePasswordChanged(@RequestParam String username) {
        return userService.updatePasswordChanged(username);
    }
}
