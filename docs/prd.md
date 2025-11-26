# Product Requirements Document (PRD): "Novus" (App Pivot)

| Version | 2.0 |
| :--- | :--- |
| **Status** | Active |
| **Platform** | iOS & Android (via Expo) |
| **Type** | Offline-First, Mental Wellness Utility |

-----

## 1. Executive Summary

**Product Vision:** A personalized mental wellness companion that combines daily emotional check-ins with curated motivational content. The app helps users track their mood, journal their thoughts, and receive quotes tailored to their current state of mind.

**Core Value Proposition:**
*   **Mindful Check-ins:** A structured flow to assess mood and needs.
*   **Personalized Content:** Quotes served based on the user's emotional state.
*   **Creative Expression:** A rich editor to customize and share quotes.
*   **Privacy First:** 100% offline, local storage, no data collection.

-----

## 2. Feature Specifications

### 2.1 Daily Check-in Flow
*   **User Story:** As a user, I want to start my day by reflecting on how I feel so I can get relevant motivation.
*   **Flow Steps:**
    1.  **Mood Selection:** Grid of moods (Happy, Sad, Anxious, etc.).
    2.  **Topic Selection:** What do you need? (Motivation, Peace, Strength, etc.).
    3.  **Journaling (Optional):** A text area to write down thoughts.
    4.  **Result:** A personalized quote card.

### 2.2 Journal History
*   **User Story:** As a user, I want to see my past check-ins to track my mood over time.
*   **Functional Requirements:**
    *   List view of all past entries.
    *   Displays Mood Icon, Date, Topics, and Note.
    *   Ability to delete entries.
    *   **Storage:** `AsyncStorage` (Key: `@journal_entries`).

### 2.3 Quote Editor & Sharing
*   **User Story:** As a user, I want to customize a quote and share it on Instagram.
*   **Functional Requirements:**
    *   **Canvas:** Renders the quote text and author.
    *   **Backgrounds:** Selectable solid colors and gradients.
    *   **Typography:** Change font family, color, and size.
    *   **Export:** Generate a high-quality PNG image.
    *   **Share:** Native OS share sheet integration.

### 2.4 Explore Feed (Legacy Feature)
*   **User Story:** As a user, I still want to browse random quotes when I'm bored.
*   **Functional Requirements:**
    *   Infinite vertical scroll (TikTok style).
    *   "Heart" to save to Favorites.

### 2.5 Visual Themes
*   **User Story:** As a user, I want the app to look good in different lighting.
*   **Themes:** Midnight (Dark), Sunrise (Light), Forest (Nature).
*   **Implementation:** Context API + AsyncStorage.

-----

## 3. Data & Architecture

### 3.1 Tech Stack
*   **Framework:** React Native (Expo).
*   **Navigation:** `expo-router` (Tabs + Stack).
*   **State Management:** React Context (`JournalContext`, `FavoritesContext`, `ThemeContext`).

### 3.2 Data Models

**Journal Entry:**
```typescript
interface JournalEntry {
  id: string;
  date: string; // ISO String
  mood: 'happy' | 'sad' | 'anxious' | 'neutral' | 'excited' | 'tired';
  topics: string[];
  note: string;
  quoteId?: string;
}
```

**Quote:**
```typescript
interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}
```

-----

## 4. Navigation Structure

### Tab Layout
1.  **Home:** Dashboard with "Daily Check-in" CTA.
2.  **Explore:** Infinite quote feed.
3.  **Journal:** List of past check-ins.
4.  **Favorites:** Saved quotes.

### Check-in Stack
*   `mood.tsx` -> `topics.tsx` -> `note.tsx` -> `result.tsx`

### Editor Stack
*   `editor/[id].tsx`: Modal or separate screen for editing.

-----

## 5. Non-Functional Requirements
1.  **Offline Capability:** Fully functional without internet.
2.  **Performance:** Smooth animations (60fps) for the check-in flow.
3.  **Privacy:** All data stays on the device.