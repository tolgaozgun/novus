# Strategic Implementation Plan: Motivational Quotes Daily Evolution

## Executive Summary
This document outlines the strategic roadmap to transform the "Motivational Quotes Daily" app from a static, local-content application to a dynamic, backend-driven platform. The goal is to increase user retention and revenue through personalized content, social-style discovery, and flexible monetization while maintaining architectural rigor using **Spring Boot**, **Keycloak**, and **Kubernetes**.

## 1. Architecture Renovation
**Current State**: Content hardcoded in `quotes.json`.
**Target State**: API-driven content delivery with local caching, managed via K8s.

### Tech Stack
*   **Backend**: **Spring Boot 3.x** (Java 21 / Kotlin).
    *   Robust, scalable, and easy to deploy in K8s.
    *   Integrates well with Keycloak (Spring Security).
*   **Database**: **PostgreSQL**.
    *   Stores Users, Quotes, Books, Movies, and User Preferences.
*   **Auth**: **Keycloak**.
    *   Self-hosted identity provider (IdP).
    *   Handles user sessions, tokens, and identity federation.
*   **CMS (Content Management)**: **Directus** (Recommended).
    *   *Analysis*: Building a custom Admin UI is time-consuming. Directus is a "Headless CMS" that wraps your existing SQL database.
    *   *K8s Strategy*: Deploy as a stateless container in your cluster. Connects to the shares PostgreSQL instance.
    *   *Workflow*: You define the schema in Postgres (or via Directus UI), and Directus instantly provides a beautiful Admin Dashboard for managing Quotes, Movies, and Books. It is "least cumbersome" because it requires zero frontend code for the admin panel.

## 2. Current App Architecture & Decisions (Confirmed)

### Goals
- Support a **true guest mode** (no login required).
- Allow guests to become **paying customers**.
- Use **Keycloak** only when the user explicitly signs up/logs in.
- Use **App Store / Google Play billing** (no Stripe).
- Prevent **one subscription from cascading to multiple accounts**.

### Identity Model

#### Guest Users
- No Keycloak user is created.
- Backend maintains a **guest session identity** (guest token / guest ID).
- RevenueCat runs in **anonymous mode** (SDK-generated anonymous App User ID).
- Do **not** assume anonymous RevenueCat IDs persist across reinstall.

#### Identified Users
- On signup/login:
  - Create a Keycloak user.
  - Use Keycloak `sub` (or internal user ID mapped 1:1) as RevenueCat **custom App User ID**.
  - Call RevenueCat `logIn` to merge the current anonymous RevenueCat user into the stable ID when appropriate.

### Billing & Entitlements

#### Billing Rails
- iOS: Apple App Store In-App Purchases
- Android: Google Play Billing
- Stripe is not used.

#### Entitlements
- RevenueCat is the **source of truth** for subscription/entitlement state.
- Backend gates premium features by checking entitlement state (cached or queried).
- Store subscriptions are controlled by Apple/Google; your app controls **access**, not cancellation.

#### Preventing Subscription Cascading
- Each subscription/entitlement is treated as **single-owner** at a time.
- Ownership changes mean **access transfer**, not subscription cancellation.

### Restore Purchases
- App exposes a **Restore Purchases** action.
- Restore is driven by store receipts (Apple/Google) and synced via RevenueCat.
- RevenueCat restore behavior determines whether entitlements transfer between App User IDs.
- **Preferred safe default**: Require login to restore/claim subscriptions to avoid ownership ambiguity.

### Logout Behavior
- On logout:
  - Call RevenueCat `logOut`.
  - Device switches to a new anonymous RevenueCat App User ID.
- If restore is allowed while logged out:
  - Entitlement access may transfer to the anonymous identity (depending on restore behavior).
- Backend must simply reflect RevenueCat’s entitlement state; do not cancel subscriptions.

### Webhooks & Backend Sync
- RevenueCat webhooks are used to keep backend entitlement cache in sync.
- On entitlement transfer:
  - Previous identity loses access.
  - New identity gains access.
- This is **access management**, not billing control.

### Explicit Non-Decisions (What We Are NOT Doing)
- No Keycloak accounts for guests.
- No reliance on anonymous RevenueCat ID persistence.
- No programmatic subscription cancellation on transfer.

### Remaining Product Policy Choice
**Option B — Require login to restore/claim (ownership-safe)**
*Recommendation*: We should proceed with Option B. It prevents access shifting on shared devices and enforces a clear "subscription belongs to an account" rule, which reduces support overhead.

## 3. Key Features & Requirements

### A. Data & Content Strategy
*   **Multi-Source Content**:
    *   **Quotes**: Database stored.
    *   **Media**: Movies (Posters + Metadata), Books (Covers + Summaries).
*   **Categorization**:
    *   Genre-based tagging (managed in CMS).
    *   **"Religious" Content**: Handled as an opt-in boolean flag in `UserPreferences`.

### B. User Experience (UX)
*   **Onboarding Flow**:
    *   Value Prop -> Interest Selection -> Religious Opt-in -> Guest Entry.
*   **The "Feed"**:
    *   Infinite scroll (TikTok style) backed by paginated API endpoints.
*   **Explore Page**:
    *   Dynamic categories fetched from backend.

## 4. Implementation Pathway

### Phase 1: Foundation (Infrastructure)
1.  **K8s Configuration**:
    *   Deploy **PostgreSQL** (with PVC).
    *   Deploy **Keycloak** (connected to Postgres).
    *   Deploy **Directus** (connected to Postgres).
2.  **Schema Design**:
    *   Create tables: `users`, `guest_sessions`, `quotes`, `books`, `movies`.
    *   Configure Keycloak Realm/Client.

### Phase 2: Backend Development (Spring Boot)
1.  **Project Init**: Spring Boot + Kotlin + Gradle.
2.  **Auth Module**:
    *   Security Filter Chain for JWT validation (Keycloak).
    *   Guest Token Interceptor (for anonymous access identifiers).
3.  **Data Module**:
    *   JPA Entities.
    *   Flyway Migrations (to keep DB schema versioned).
4.  **API Endpoints**:
    *   GET `/api/v1/feed` (Personalized)
    *   POST `/api/v1/onboarding/interests`
    *   GET `/api/v1/content/explore`

### Phase 3: Frontend Refactor
1.  **Network Layer**: Build Axios/TanStack Query client.
2.  **Auth Layer**: Integrate `react-native-keycloak` (or generic AppAuth) + RevenueCat SDK.

### Phase 4: Integration & Monetization
1.  **RevenueCat Setup**:
    *   Configure Webhooks pointing to Spring Boot.
    *   Implement entitlements check in backend.
2.  **Validation**:
    *   Test "Guest -> Subscriber -> Registered" flow.
