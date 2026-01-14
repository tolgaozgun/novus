package com.novus.backend.domain.interaction;

import com.novus.backend.common.entity.BaseEntity;
import com.novus.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_favorites", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "item_type", "item_id"})
})
@Getter
@Setter
public class UserFavorite extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "item_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    public enum ItemType {
        QUOTE,
        BOOK,
        MOVIE
    }
}
