package com.novus.backend.controller;

import com.novus.backend.common.response.ApiResponse;
import com.novus.backend.domain.interaction.UserFavorite;
import com.novus.backend.domain.user.User;
import com.novus.backend.service.InteractionService;
import com.novus.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
@Tag(name = "Interactions", description = "User favorites and interactions")
public class InteractionController {

    private final InteractionService interactionService;
    private final UserService userService;

    @PostMapping("/{type}/{id}")
    @Operation(summary = "Add Favorite", description = "Adds an item (QUOTE, BOOK, MOVIE) to favorites")
    public ApiResponse<UserFavorite> addFavorite(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String type,
            @PathVariable Long id) {
        
        User user = userService.getUserByKeycloakId(jwt.getSubject());
        UserFavorite.ItemType itemType = UserFavorite.ItemType.valueOf(type.toUpperCase());
        
        return ApiResponse.success(interactionService.addFavorite(user, itemType, id));
    }

    @DeleteMapping("/{type}/{id}")
    @Operation(summary = "Remove Favorite", description = "Removes an item from favorites")
    public ApiResponse<String> removeFavorite(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String type,
            @PathVariable Long id) {
        
        User user = userService.getUserByKeycloakId(jwt.getSubject());
        UserFavorite.ItemType itemType = UserFavorite.ItemType.valueOf(type.toUpperCase());
        
        interactionService.removeFavorite(user, itemType, id);
        return ApiResponse.success("Favorite removed successfully");
    }

    @GetMapping
    @Operation(summary = "Get Favorites", description = "Returns all favorites for the current user")
    public ApiResponse<List<UserFavorite>> getFavorites(@AuthenticationPrincipal Jwt jwt) {
        User user = userService.getUserByKeycloakId(jwt.getSubject());
        return ApiResponse.success(interactionService.getUserFavorites(user));
    }
}
