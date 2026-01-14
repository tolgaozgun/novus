package com.novus.backend.service;

import com.novus.backend.domain.interaction.UserFavorite;
import com.novus.backend.domain.user.User;
import com.novus.backend.repository.UserFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InteractionService {
    UserFavorite addFavorite(User user, UserFavorite.ItemType itemType, Long itemId);
    void removeFavorite(User user, UserFavorite.ItemType itemType, Long itemId);
    List<UserFavorite> getUserFavorites(User user);
}

@Service
@RequiredArgsConstructor
class InteractionServiceImpl implements InteractionService {

    private final UserFavoriteRepository userFavoriteRepository;

    @Override
    @Transactional
    public UserFavorite addFavorite(User user, UserFavorite.ItemType itemType, Long itemId) {
        // Check if already exists
        return userFavoriteRepository.findByUserIdAndItemTypeAndItemId(user.getId(), itemType, itemId)
                .orElseGet(() -> {
                    UserFavorite favorite = new UserFavorite();
                    favorite.setUser(user);
                    favorite.setItemType(itemType);
                    favorite.setItemId(itemId);
                    return userFavoriteRepository.save(favorite);
                });
    }

    @Override
    @Transactional
    public void removeFavorite(User user, UserFavorite.ItemType itemType, Long itemId) {
        userFavoriteRepository.findByUserIdAndItemTypeAndItemId(user.getId(), itemType, itemId)
                .ifPresent(userFavoriteRepository::delete);
    }

    @Override
    public List<UserFavorite> getUserFavorites(User user) {
        return userFavoriteRepository.findByUserId(user.getId());
    }
}
