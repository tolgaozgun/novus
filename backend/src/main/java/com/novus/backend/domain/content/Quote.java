package com.novus.backend.domain.content;

import com.novus.backend.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "quotes")
@Getter
@Setter
public class Quote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    private String category;

    @Column(name = "is_premium")
    private boolean isPremium = false;

    @Column(name = "is_religious")
    private boolean isReligious = false;

    @Column(name = "background_image_url", columnDefinition = "TEXT")
    private String backgroundImageUrl;
}
