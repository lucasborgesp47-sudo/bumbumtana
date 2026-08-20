# Sales Page Visual Refresh Plan

Enhance the visual identity of `/sales` by adding a results photo, alternating section backgrounds, and expressive emoji-based iconography.

## User Review Required

> [!IMPORTANT]
> This plan focuses exclusively on visual style and layout. No pricing, copy, or logic will be changed.

- **Hero Image**: The before/after photo of Mariana (Carla's variant from the quiz) will be added to the hero section.
- **Section Backgrounds**: Using the existing `--brand-soft` (#FFF1F5) color to create visual rhythm by alternating backgrounds.
- **Iconography**: Swapping standard Lucide icons for expressive emojis (🍑, 🔥, 💪, ⏰, ✅) while maintaining the current circular container style.

## Technical Details

### 1. Asset Integration
- Use the newly created asset pointer `src/assets/result-hero.jpeg.asset.json` for the hero image.
- Apply `loading="eager"` for the hero image to improve LCP.
- Use `rounded-3xl shadow-xl shadow-[var(--brand)]/10` to match existing card styles.

### 2. Layout & Styles
- **Hero**: Insert `<img />` between the diagnosis text and the timer block.
- **Backgrounds**:
    - Section "Não é falta de esforço...": `bg-[var(--brand-soft)]`.
    - Section "O Desafio Bumbum Granada": `bg-[var(--brand-soft)]`.
    - Section "Resultados reais em 21 dias": `bg-[var(--brand-soft)]`.
    - Other sections remain `bg-[var(--surface)]` or `bg-[var(--surface-2)]` where appropriate to maintain contrast.
- **Icons**:
    - Problem cards: ⏰ -> ⏰, 🔳 -> 🍑, ⚡ -> 🔥.
    - Stack list items: Lucide CheckCircle2 -> ✅.

### 3. File Changes
- `src/routes/sales.tsx`: Update section classes, add hero image, and swap icons.
- `src/styles.css`: No changes required as `--brand-soft` is already defined.
