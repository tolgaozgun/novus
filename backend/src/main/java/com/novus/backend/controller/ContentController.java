package com.novus.backend.controller;

import com.novus.backend.common.response.ApiResponse;
import com.novus.backend.domain.content.Book;
import com.novus.backend.domain.content.Movie;
import com.novus.backend.service.ContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/content")
@RequiredArgsConstructor
@Tag(name = "Content", description = "Operations related to Books and Movies")
public class ContentController {

    private final ContentService contentService;

    @GetMapping("/books")
    @Operation(summary = "Get all books", description = "Fetches a list of all available books")
    public ApiResponse<List<Book>> getBooks(@RequestParam(required = false) String author) {
        if (author != null) {
            return ApiResponse.success(contentService.getBooksByAuthor(author));
        }
        return ApiResponse.success(contentService.getAllBooks());
    }

    @GetMapping("/books/{id}")
    @Operation(summary = "Get book by ID", description = "Fetches a specific book details")
    public ApiResponse<Book> getBookById(@PathVariable Long id) {
        return contentService.getBookById(id)
                .map(ApiResponse::success)
                .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + id));
    }

    @GetMapping("/movies")
    @Operation(summary = "Get all movies", description = "Fetches a list of all available movies")
    public ApiResponse<List<Movie>> getMovies() {
        return ApiResponse.success(contentService.getAllMovies());
    }

    @GetMapping("/movies/{id}")
    @Operation(summary = "Get movie by ID", description = "Fetches a specific movie details")
    public ApiResponse<Movie> getMovieById(@PathVariable Long id) {
        return contentService.getMovieById(id)
                .map(ApiResponse::success)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " + id));
    }
}
