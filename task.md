# Tasks

## Phase 1: Infrastructure & Backend Setup
- [x] Create implementation plan (STRATEGIC_PLAN.md)
- [x] Restructure repo (mobile/backend split)
- [x] Initialize Spring Boot Backend (Java 21, Maven)
- [x] Docker & CI/CD Setup (`build.yaml`, `Dockerfile`)
- [x] Database Schema Design (Entities Implemented)
    - [x] `User`, `Quote`, `Book`, `Movie`, `UserFavorite` Entities
    - [x] JPA Repositories
- [x] Core Backend Configuration
    - [x] Security (OAuth2 Resource Server + Basic Auth for Swagger)
    - [x] Swagger/OpenAPI setup
    - [x] Global Exception Handling & Request Logging
    - [x] Keycloak Role Mapping (`JwtAuthenticationConverter`)
- [x] Service Layer Implementation
    - [x] `QuoteService` & `QuoteController`
    - [x] `ContentService` (Books/Movies)
    - [x] `InteractionService` (Favorites)
    - [x] `UserService` (Sync with Keycloak)

## Phase 2: Mobile App Integration
- [x] Refactor API Client in React Native (Axios + Services Structure)
- [ ] Implement Auth Flow (Keycloak)
- [ ] Replace local JSON usage with Backend API calls

## Phase 3: Production Readiness
- [ ] Keycloak Production Configuration
- [ ] Kubernetes Deployment (Manifests)

## Deferred / Skipped
- [-] Import `quotes.json` to PostgreSQL (User requested skip)
- [ ] Populate Books & Movies data (To be done later via CMS or Script)
