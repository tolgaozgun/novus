package com.novus.backend.controller;

import com.novus.backend.common.response.ApiResponse;
import com.novus.backend.domain.content.Quote;
import com.novus.backend.service.QuoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quotes")
@RequiredArgsConstructor
@Tag(name = "Quotes", description = "Operations related to quotes")
public class QuoteController {

    private final QuoteService quoteService;

    @GetMapping("/random")
    @Operation(summary = "Get random quotes", description = "Fetches a specified number of random quotes")
    public ApiResponse<List<Quote>> getRandomQuotes(
            @RequestParam(defaultValue = "10") int limit) {
        return ApiResponse.success(quoteService.getRandomQuotes(limit));
    }

    @GetMapping
    @Operation(summary = "Get quotes by category or author", description = "Filter quotes by category or author")
    public ApiResponse<List<Quote>> getQuotes(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String author) {
        
        if (category != null) {
            return ApiResponse.success(quoteService.getQuotesByCategory(category));
        }
        if (author != null) {
            return ApiResponse.success(quoteService.getQuotesByAuthor(author));
        }
        return ApiResponse.success(quoteService.getRandomQuotes(10));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get quote by ID", description = "Fetches a single quote by its ID")
    public ApiResponse<Quote> getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id)
                .map(ApiResponse::success)
                .orElseThrow(() -> new IllegalArgumentException("Quote not found with id: " + id));
    }
}
