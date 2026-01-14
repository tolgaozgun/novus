package com.novus.backend.service;

import com.novus.backend.domain.user.User;
import com.novus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserService {
    User syncUser(String keycloakId, String email, String displayName);
    User getUserByKeycloakId(String keycloakId);
}

@Slf4j
@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public User syncUser(String keycloakId, String email, String displayName) {
        return userRepository.findByKeycloakId(keycloakId)
                .map(existingUser -> {
                    boolean updated = false;
                    if (email != null && !email.equals(existingUser.getEmail())) {
                        existingUser.setEmail(email);
                        updated = true;
                    }
                    if (displayName != null && !displayName.equals(existingUser.getDisplayName())) {
                        existingUser.setDisplayName(displayName);
                        updated = true;
                    }
                    if (updated) {
                        existingUser.setUpdatedAt(LocalDateTime.now());
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    log.info("Creating new user for Keycloak ID: {}", keycloakId);
                    User newUser = new User();
                    newUser.setKeycloakId(keycloakId);
                    newUser.setEmail(email);
                    newUser.setDisplayName(displayName);
                    return userRepository.save(newUser);
                });
    }

    @Override
    public User getUserByKeycloakId(String keycloakId) {
        // This is used internally, we ensure the user exists via sync usually
        return userRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + keycloakId));
    }
}
