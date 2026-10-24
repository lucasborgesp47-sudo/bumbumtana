/**
 * Configuração do pós-compra (upsell → downsell → obrigado).
 *
 * COMO ATIVAR O UPSELL DE 1 CLIQUE DA KIWIFY
 * 1. Kiwify → Produtos → Truque do Bumbum na Nuca → Configurações →
 *    "Página de obrigado e upsell" → ligar "Este produto possui página de obrigado ou upsell
 *    personalizada" → URL: https://SEU-DOMINIO/upsell
 * 2. No gerador de upsell, escolha o produto "Turbo do Bumbum na Nuca",
 *    copie o HTML gerado e cole em KIWIFY_SNIPPET_UPSELL (entre as crases).
 * 3. Repita para a oferta do downsell (URL /downsell) e cole em KIWIFY_SNIPPET_DOWNSELL.
 * 4. Teste abrindo /upsell?token=123 — o clique deve abrir a confirmação de pagamento.
 *
 * Enquanto os snippets estiverem vazios, as páginas usam o modo reserva:
 * botão "sim" leva ao checkout normal do produto (FALLBACK_*) e o "não" segue o fluxo.
 */

// Cole aqui o HTML gerado pela Kiwify (upsell de 1 clique). Vazio = modo reserva.
export const KIWIFY_SNIPPET_UPSELL = ``;
export const KIWIFY_SNIPPET_DOWNSELL = ``;

// Checkout normal dos produtos (usado só no modo reserva). Preencha com os links da Kiwify.
export const FALLBACK_CHECKOUT_UPSELL = "";
export const FALLBACK_CHECKOUT_DOWNSELL = "";

export const UPSELL = {
  name: "Turbo do Bumbum na Nuca",
  price: "37,00",
  priceValue: 37,
  anchor: "67,00",
};

export const DOWNSELL = {
  name: "Turbo Essencial",
  price: "19,90",
  priceValue: 19.9,
};

export const SUPPORT_EMAIL = "sacbumbumperfeito@gmail.com";
