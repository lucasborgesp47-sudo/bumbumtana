# Implementation Plan - Desafio Bumbum Granada

Complete the 2-part conversion funnel: a mobile-first 6-step quiz followed by a personalized sales page.

## User Review Required

> [!IMPORTANT]
> The project assumes an external checkout link (Kiwify). Please provide the specific URL if available, otherwise a placeholder will be used.

- **Theme**: Dark background (#1A1A2E) with pink primary accents (#E91E63).
- **Mobile First**: All UI components optimized for 90% mobile traffic.
- **Transitional UI**: Framer Motion for slide transitions and loading states.

## Proposed Changes

### 1. Quiz Completion (Steps 3-6)
- **Step 3**: Sentiment question with emotional overlay (3s).
- **Step 4**: Multi-selection for previous attempts + Dopamine #2 overlay.
- **Step 5**: Dual-question layout (Time + Activity Level) + Dopamine #3 overlay.
- **Step 6**: Physical data input (Weight/Height) with numeric validation.
- **Loading Transition**: 2-3s animated progress bar between Step 6 and Final Screen.

### 2. Result & Sales Page Logic
- **Conditional Messaging**: Implement logic to show Y (Skepticism), Z (Time), X (Age 40+), or W (Sedentary) based on quiz responses.
- **Dynamic Result Card**: Display personalized intensity, protocol duration, and starting level based on quiz data.
- **Sales Page Components**:
  - Hero with scarcity timer and discount price.
  - Stacked cards for product modules + bonus.
  - Transformation proof cards (Lucide icons).
  - Before vs After comparison.
  - FAQ Accordion.
  - Dynamic spot counter (JavaScript decrement logic).

### 3. Polish & Integration
- **Persistent State**: Store quiz progress in localStorage.
- **Navigation**: Enforce forward-only flow.
- **Checkout Bridge**: Redirect to Kiwify with URL params (name, level, objective).

## Technical Details
- **Styling**: Tailwind CSS v4 using semantic tokens (`--color-primary`, etc.).
- **Animations**: Framer Motion `AnimatePresence` for route/step transitions.
- **Icons**: Lucide React for all visual indicators (no heavy images).
- **State Management**: React `useState` and `useEffect` with local storage persistence.
