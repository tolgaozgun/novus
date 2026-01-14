package com.novus.backend.domain.content;

import com.novus.backend.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "movies")
@Getter
@Setter
public class Movie extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "poster_image_url", columnDefinition = "TEXT")
    private String posterImageUrl;

    private String director;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(name = "is_religious")
    private boolean isReligious = false;
}
