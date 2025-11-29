# Implementation Plan - Novus (Spin-off)

## Goal Description
Replicate the comprehensive onboarding and engagement flow of the rival app (as analyzed from `docs/references/structure.json`) while injecting the unique "Novus" identity: a futuristic, AI-driven motivational companion. The goal is to match the rival's depth in user segmentation and psychological hooking but surpass them in visual fidelity (Glassmorphism) and personalization.

## User Review Required
> [!IMPORTANT]
> **Unique Aspect Proposal**: The "Spin-off" twist will be **"AI-Generated Daily Briefings"**. Instead of just a feed of static quotes, Novus will curate a "Daily Briefing" based on the user's specific mood and goals input during onboarding.
> **Visual Style**: We will strictly adhere to the "Futuristic Glassmorphism" aesthetic defined in previous sessions, distinguishing us from the likely generic look of the rival.

## Proposed Changes

### Phase 1: The "Hook" Onboarding (Screens 1-13)
Replicate the high-conversion acquisition flow.
#### [NEW] app/onboarding/
- `welcome.tsx`: Value prop (IMG_1134)
- `attribution.tsx`: Marketing source (IMG_1135)
- `demographics.tsx`: Age, Name, Identity (IMG_1137-1141)
- `psychographics.tsx`: Motivation source, Pain points (IMG_1142-1145)

### Phase 2: Engagement & Commitment (Screens 14-21)
Lock in the user with "Soft Contracts" and customization.
#### [NEW] app/onboarding/
- `commitment.tsx`: Streak contract & Habit alarm (IMG_1148, IMG_1151)
- `notifications.tsx`: Soft ask & Frequency (IMG_1149-1150)
- `customization.tsx`: Icon & Theme selection (IMG_1152, IMG_1154)

### Phase 3: Deep Personalization (Screens 22-37)
The "Therapy-lite" section to build emotional investment.
#### [NEW] app/onboarding/
- `wellness.tsx`: Mental health, Obstacles, Vision (IMG_1159-1161)
- `mood-baseline.tsx`: Initial mood tracker (IMG_1164-1166)
- `goals.tsx`: Outcome definition & Custom input (IMG_1167-1169)

### Phase 4: Monetization (Screens 38-43)
The Conversion Engine.
#### [NEW] app/paywall/
- `trial-offer.tsx`: Timeline visualization of the trial (IMG_1173)
- `value-prop.tsx`: "Priming" education before price (IMG_1171-1172)

### Phase 5: Core Experience (Screens 44-48)
The "Spin-off" differentiator.
#### [MODIFY] app/(tabs)/index.tsx
- Transform into "Daily Briefing" mode.
#### [NEW] app/(tabs)/discovery.tsx
- Category browsing (IMG_1179)
#### [NEW] app/(tabs)/profile.tsx
- Settings & Streak management (IMG_1181)

## Verification Plan
### Automated Tests
- Verify navigation flow from Welcome -> Onboarding -> Paywall -> Home.
- Test data persistence (saving user name, goals, mood).

### Manual Verification
- **Flow Test**: Run through the entire 48-screen sequence to ensure it feels "snappy" and not tedious.
- **Visual Check**: Ensure the Glassmorphism theme is consistent across all new screens.
