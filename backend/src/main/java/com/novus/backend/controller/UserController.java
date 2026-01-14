package com.novus.backend.controller;

import com.novus.backend.common.response.ApiResponse;
import com.novus.backend.domain.user.User;
import com.novus.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management operations")
public class UserController {

    private final UserService userService;

    @PostMapping("/sync")
    @Operation(summary = "Sync User", description = "Syncs the authenticated Keycloak user to the local database. Idempotent.")
    public ApiResponse<User> syncUser(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name"); // or preferred_username
        
        // Fallback for name if null
        if (name == null) {
            name = jwt.getClaimAsString("preferred_username");
        }

        User user = userService.syncUser(keycloakId, email, name);
        return ApiResponse.success(user);
    }

    @GetMapping("/me")
    @Operation(summary = "Get My Profile", description = "Returns the profile of the currently authenticated user")
    public ApiResponse<User> getMyProfile(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject();
        // We trigger a sync just in case, or we could just fetch
        User user = userService.syncUser(keycloakId, jwt.getClaimAsString("email"), jwt.getClaimAsString("name"));
        return ApiResponse.success(user);
    }
}
