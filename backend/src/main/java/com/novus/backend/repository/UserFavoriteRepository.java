package com.novus.backend.repository;

import com.novus.backend.domain.interaction.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    List<UserFavorite> findByUserId(UUID userId);
    Optional<UserFavorite> findByUserIdAndItemTypeAndItemId(UUID userId, UserFavorite.ItemType itemType, Long itemId);
}
