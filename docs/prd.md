Here is a detailed Product Requirements Document (PRD) for your local motivational quotes app. This document is designed to be a "blueprint" you can follow while coding.

-----

# Product Requirements Document (PRD): "QuoteDeck" (Working Title)

| Version | 1.0 |
| :--- | :--- |
| **Status** | Draft |
| **Platform** | iOS & Android (via Expo) |
| **Type** | Offline-First, Local Utility |

-----

## 1\. Executive Summary

**Product Vision:** A minimalist, distraction-free mobile application that provides daily motivation through a "deck" of curated quotes. The app operates 100% offline, respecting user privacy and requiring no sign-up.

**Core Value Proposition:**

  * **Instant Gratification:** Zero load times, no login walls.
  * **Tactile Experience:** TikTok-style vertical scrolling for effortless consumption.
  * **Shareable Content:** Turns text into beautiful images for social media.

-----

## 2\. Feature Specifications

### 2.1 Infinite Quote Scroll (The "Deck")

  * **User Story:** As a user, I want to swipe vertically to see a new quote so that I can quickly get inspired without navigating menus.
  * **Functional Requirements:**
      * App launches directly into the quote feed.
      * Vertical swipe (up/down) snaps to the next/previous quote (paging).
      * Quotes loop infinitely or randomize order on app refresh.
  * **Technical Implementation:**
      * **Component:** `FlatList`
      * **Props:** `pagingEnabled={true}`, `showsVerticalScrollIndicator={false}`, `snapToAlignment="start"`, `decelerationRate="fast"`.
      * **Data Source:** Local `quotes.json` file.

### 2.2 Favorites System

  * **User Story:** As a user, I want to save quotes that resonate with me so I can read them again later.
  * **Functional Requirements:**
      * "Heart" icon overlay on every quote.
      * Tapping the heart toggles the saved state.
      * Dedicated "Favorites" screen listing all saved quotes.
  * **Technical Implementation:**
      * **Storage:** `AsyncStorage`.
      * **Key:** `@favorites`.
      * **Value:** JSON array of Quote IDs (e.g., `[1, 45, 12]`).

### 2.3 "Share as Image"

  * **User Story:** As a user, I want to share a quote as an aesthetically pleasing image on Instagram/WhatsApp, not just as plain text.
  * **Functional Requirements:**
      * "Share" button overlay on the quote screen.
      * On tap, the app generates a PNG image of the current quote + background.
      * Native OS share sheet opens with the image attached.
  * **Technical Implementation:**
      * **Libraries:** `react-native-view-shot` (to capture), `expo-sharing` (to share).
      * **Logic:** Wrap the text container in a `<View collapsable={false} ref={viewRef}>`. Use `captureRef(viewRef, {format: 'png'})` to get the URI.

### 2.4 Daily Notification (Local)

  * **User Story:** As a user, I want to receive a notification every morning at 9:00 AM so I remember to open the app.
  * **Functional Requirements:**
      * Prompt user for permission on first launch.
      * Schedule a recurring local notification for 9:00 AM.
      * Tapping the notification opens the app.
  * **Technical Implementation:**
      * **Library:** `expo-notifications`.
      * **Method:** `Notifications.scheduleNotificationAsync` with `trigger: { hour: 9, minute: 0, repeats: true }`.

### 2.5 Visual Themes

  * **User Story:** As a user, I want to change the background to match my mood (e.g., Dark Mode, Nature, Minimalist).
  * **Functional Requirements:**
      * Settings icon on the main screen.
      * Menu to select from pre-defined themes (e.g., "Midnight", "Sunrise", "Paper").
      * Theme selection persists after closing the app.
  * **Technical Implementation:**
      * **State:** React Context API to manage current theme.
      * **Persistence:** Save theme ID in `AsyncStorage`.

-----

## 3\. Data & Architecture

### 3.1 Tech Stack

  * **Framework:** React Native (Expo Managed Workflow).
  * **Language:** TypeScript (recommended) or JavaScript.
  * **Icons:** `@expo/vector-icons` (Ionicons).
  * **Navigation:** `expo-router` (File-based routing) OR `react-navigation`.

### 3.2 Data Model (`quotes.json`)

We will use a static JSON file to avoid backend complexity.

```json
[
  {
    "id": "q1",
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "category": "Work"
  },
  {
    "id": "q2",
    "text": "Believe you can and you're halfway there.",
    "author": "Theodore Roosevelt",
    "category": "Motivation"
  }
]
```

### 3.3 Local Storage Schema (AsyncStorage)

| Key | Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `@favorites` | String (JSON Array) | `["q1", "q5"]` | List of favorited quote IDs. |
| `@theme_pref` | String | `"dark_mode"` | ID of the selected theme. |
| `@has_launched` | String (Boolean) | `"true"` | Check to show onboarding only once. |

-----

## 4\. User Interface (UI) Wireframes

### Screen 1: The Feed (Home)

  * **Layout:** Full screen. Status bar hidden or transparent.
  * **Center:** Large Typography Quote.
  * **Bottom Center:** Author Name (smaller, italic).
  * **Bottom Right Vertical Stack:**
      * Heart Icon (Outline = Unsaved, Filled Red = Saved).
      * Share Icon.
      * Theme/Settings Icon.
  * **Interaction:** Swipe Up/Down to change content.

### Screen 2: Favorites

  * **Layout:** Standard List View.
  * **Header:** "Your Collection".
  * **Body:** A simple list of cards. Tapping a card opens it in full-screen view (modal).
  * **Action:** Swipe left on a row to delete from favorites.

-----

## 5\. Non-Functional Requirements

1.  **Offline Capability:** The app must function perfectly without an internet connection (after initial download).
2.  **Performance:** Scrolling must be 60fps. No lag when snapping between quotes.
3.  **App Size:** Keep bundle size small by avoiding heavy image assets (use CSS/StyleSheet colors/gradients instead of image files for backgrounds where possible).
4.  **Privacy:** No data collection. No analytics.

-----

## 6\. Implementation Roadmap

### Phase 1: MVP (Days 1-2)

  * [ ] Initialize Expo project.
  * [ ] Create `quotes.json` with 50 sample quotes.
  * [ ] Implement `FlatList` with `pagingEnabled`.
  * [ ] Style the Quote Card (Typography/Centering).

### Phase 2: Interactivity (Days 3-4)

  * [ ] Install `AsyncStorage`.
  * [ ] Implement "Toggle Heart" logic.
  * [ ] Build "Favorites" screen.

### Phase 3: Polish (Days 5-6)

  * [ ] Implement `react-native-view-shot` for sharing.
  * [ ] Add `expo-notifications` logic.
  * [ ] Add app icon and splash screen.