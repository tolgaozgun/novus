package com.novus.backend.service;

import com.novus.backend.domain.content.Quote;
import com.novus.backend.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface QuoteService {
    List<Quote> getRandomQuotes(int limit);
    List<Quote> getQuotesByAuthor(String author);
    List<Quote> getQuotesByCategory(String category);
    Optional<Quote> getQuoteById(Long id);
    Quote saveQuote(Quote quote);
}

@Service
@RequiredArgsConstructor
class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository quoteRepository;

    @Override
    public List<Quote> getRandomQuotes(int limit) {
        return quoteRepository.findRandomQuotes(limit);
    }

    @Override
    public List<Quote> getQuotesByAuthor(String author) {
        return quoteRepository.findByAuthorContainingIgnoreCase(author);
    }

    @Override
    public List<Quote> getQuotesByCategory(String category) {
        return quoteRepository.findByCategory(category);
    }

    @Override
    public Optional<Quote> getQuoteById(Long id) {
        return quoteRepository.findById(id);
    }

    @Override
    public Quote saveQuote(Quote quote) {
        return quoteRepository.save(quote);
    }
}
