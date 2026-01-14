package com.novus.backend.repository;

import com.novus.backend.domain.content.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, Long> {
    @Query(value = "SELECT * FROM quotes ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Quote> findRandomQuotes(int limit);
    
    List<Quote> findByAuthorContainingIgnoreCase(String author);
    List<Quote> findByCategory(String category);
}
