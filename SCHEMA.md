# Database Schema Design

This document outlines the database schema for the **Motivational Quotes Daily** backend.

## Overview
- **Database**: PostgreSQL 15+
- **ORM**: Hibernate / JPA

## Tables

### 1. Identity & Users

We need to support both authenticated users (Keycloak) and guest users (Anonymous).

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keycloak_id VARCHAR(255) UNIQUE, -- Nullable for guests or strictly for auth users? 
                                     -- Better: Only store AUTH users here. Guests are ephemeral or separate.
    email VARCHAR(255),
    display_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- For guest "sessions" or preferences tracking before signup
CREATE TABLE guest_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(255) UNIQUE NOT NULL, -- The revenueCat anonymous ID or a generated one
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

*Decision*: We will merge `guest_profiles` into `users` upon signup. `keycloak_id` will be populated then.

### 2. Content (Managed via Directus)

#### Quotes
```sql
CREATE TABLE quotes (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author VARCHAR(255),
    category VARCHAR(50), -- Enum-like string (STOICISM, DISCIPLINE)
    is_premium BOOLEAN DEFAULT FALSE,
    is_religious BOOLEAN DEFAULT FALSE, -- Filterable flag
    background_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Books
```sql
CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    description TEXT,
    cover_image_url TEXT,
    amazon_link TEXT,
    is_religious BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Movies
```sql
CREATE TABLE movies (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    poster_image_url TEXT,
    director VARCHAR(255),
    release_year INT,
    is_religious BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. User Preferences & Interactions

#### User Interests
```sql
CREATE TABLE user_interests (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest VARCHAR(50), -- e.g., 'WEALTH', 'FITNESS'
    PRIMARY KEY (user_id, interest)
);
```

#### Likes / Favorites
```sql
CREATE TABLE user_favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(20) NOT NULL, -- 'QUOTE', 'BOOK', 'MOVIE'
    item_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);
```

## Relationships (DBML)

```dbml
Table users {
  id uuid [pk]
  keycloak_id varchar [unique]
  email varchar
}

Table quotes {
  id bigserial [pk]
  content text
  author varchar
  category varchar
  is_religious bool
}

Table user_favorites {
  id bigserial [pk]
  user_id uuid [ref: > users.id]
  item_type varchar
  item_id bigint
}
```

## Migration Strategy
1.  **V1__Init_Schema.sql**: Create base tables.
2.  **V2__Seed_Data.sql**: Import initial `quotes.json` data.
