# Sales Page Visual Refinement Plan - Phase 2

Refining visual treatments for social proof, scarcity, and purchase triggers on `/sales`.

## User Review Required

> [!IMPORTANT]
> This plan focuses exclusively on visual style and layout order. No pricing, copy, or logic will be changed.

1.  **Testimonials**: Avatars for Carla, Mariana, and Fernanda will be increased to **64x64px** and changed to a **square format with rounded corners** (`rounded-2xl`).
2.  **Scarcity Timer**: The timer block will be redesigned for high urgency:
    *   Background: `--brand` (#E0245E) or a soft red variation.
    *   Icon: Lucide `Clock` icon added next to the countdown.
    *   Styling: Enhanced border and shadow to make it pop.
3.  **Section Reordering**:
    *   Current order: `Hero -> Problem Cards -> Comparison -> Mockup -> Stack -> Testimonials`.
    *   New order: `Hero -> Problem Cards -> Mockup -> Comparison -> Stack -> Testimonials`.
4.  **Purchase Triggers Highlight**:
    *   **Stack card** (what you receive) and **Final Vitality card** will receive a **2px solid `--brand` border** and a **stronger shadow** to distinguish them from informational content.

## Technical Details

### 1. Testimonials Refactor
- Update `item.photo` container in `SECTION 5` to use `w-16 h-16` (64px) and `rounded-2xl`.

### 2. Timer Urgent Style
- Replace current `bg-[var(--surface-2)]` container in `SECTION 1` with a styled `div`:
    *   `bg-[var(--brand)] text-white shadow-2xl shadow-[var(--brand)]/40 border-2 border-white/20`.
    *   Add `Clock` icon from `lucide-react`.
    *   Adjust text colors inside (white instead of `--ink-2`/`--brand`).

### 3. DOM Reordering
- Move the entire `SECTION 3: O PRODUTO (VISUAL)` (lines 250-291) to be placed between `SECTION 2: O QUE TRAVA O RESULTADO` and `SECTION: ANTES E DEPOIS DO PROTOCOLO`.

### 4. Visual Emphasis
- Add `border-2 border-[var(--brand)] shadow-2xl shadow-[var(--brand)]/10` to:
    *   The container of the stack list items (Section 4).
    *   The Final Offer card (Section 6).

### 5. File Changes
- `src/routes/sales.tsx`: Multiple `line_replace` calls to implement the reordering and styling updates.
