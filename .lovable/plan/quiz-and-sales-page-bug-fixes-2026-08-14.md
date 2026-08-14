# Quiz and Sales Page Bug Fixes

Correct a series of content, layout, and UX bugs in the quiz and sales funnel.

## Content Fixes

1.  **Sales Page Prova Social**: Fix the text under "O que você vai receber" to show the full phrase: "🔥 MAIS DE 47.832 MULHERES já usaram esse método nos últimos 6 meses."
2.  **Quiz Question Options**: Replace "🚀 bustos" with "💉 Procedimentos estéticos" in Step 4.
3.  **Sales Page Badges**: Fix the truncated "É" badge to "Privacidade".
4.  **Before/After Typo**: Change "Mensating cara" to "Mensalidade cara".
5.  **Before/After Header**: Change "DEPÓSITO" to "DEPOIS".
6.  **FAQ Completion**: Complete the question "Precisa de um grande?" to "Precisa de espaço grande em casa?".
7.  **Testimonial Consistency**: Fix "Carla, 43 anos" quote to a fixed version: "minha calça jeans ficou dois números mais folgada". Add a second testimonial to avoid repetition.
8.  **Results Personalization**: Display the actual age range and physical data (weight/height) in the results screen instead of placeholder text.

## Layout and UX Fixes

9.  **Fullscreen Layout**: Refactor containers using `h-screen` to `min-h-screen` with `py-8` to prevent content being cut off on small viewports.
10. **Padding Consistency**: Add horizontal padding to the "⚠️ PREÇO DE VALIDAÇÃO" block on mobile.
11. **Button Spacing**: Add spacing between the inline CTA and sticky bottom CTA on the sales page. Sync button text to "Garantir Minha Vaga Agora".
12. **Quiz Step Split**: Separate Step 5 (Time and Activity Level) into two distinct screens.
13. **Timer Persistence**: Save the scarcity timer start time in `localStorage` so it doesn't reset on reload.
14. **Mobile Keyboards**: Add `inputmode="numeric"` to weight and height inputs.
15. **Progress Bar Calibration**: Adjust the progress bar calculation to account for all steps (including loading and results).

## Technical Details

- **State Management**: Update `useQuiz` hook to handle the split steps and persistent timer.
- **Components**: Modify `DopamineOverlay`, `Index` (quiz), and `SalesPage`.
- **CSS**: Ensure `min-h-screen` and `overflow-y-auto` are used for all major views.
