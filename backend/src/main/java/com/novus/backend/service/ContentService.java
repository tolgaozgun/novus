package com.novus.backend.service;

import com.novus.backend.domain.content.Book;
import com.novus.backend.domain.content.Movie;
import com.novus.backend.repository.BookRepository;
import com.novus.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface ContentService {
    List<Book> getAllBooks();
    List<Book> getBooksByAuthor(String author);
    Optional<Book> getBookById(Long id);
    
    List<Movie> getAllMovies();
    Optional<Movie> getMovieById(Long id);
}

@Service
@RequiredArgsConstructor
class ContentServiceImpl implements ContentService {
    
    private final BookRepository bookRepository;
    private final MovieRepository movieRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }
}
