/**
 * Configuração do pós-compra (upsell → downsell → obrigado).
 *
 * COMO ATIVAR O UPSELL DE 1 CLIQUE DA KIWIFY
 * 1. Publicar este site na Lovable (bumbumtana.lovable.app) com as rotas /upsell e /downsell.
 * 2. Kiwify → Produtos → Bumbum Perfeito → Configurações → "Página de obrigado e upsell" →
 *    ligar a opção e colar a URL https://bumbumtana.lovable.app/upsell → Salvar.
 * 3. Os códigos abaixo já foram gerados no gerador de upsell da Kiwify (Turbo R$37 e
 *    Turbo Essencial R$19,90). Recusar o upsell leva ao /downsell; aceitar leva à área de membros.
 * 4. Teste abrindo /upsell?token=123 — o clique deve abrir a confirmação de pagamento.
 *
 * Enquanto os snippets estiverem vazios, as páginas usam o modo reserva:
 * botão "sim" leva ao checkout normal do produto (FALLBACK_*) e o "não" segue o fluxo.
 */

// Cole aqui o HTML gerado pela Kiwify (upsell de 1 clique). Vazio = modo reserva.
export const KIWIFY_SNIPPET_UPSELL = `<div id="kiwify-upsell-7YTPxjJ" data-upsell-url="" data-downsell-url="https://bumbumtana.lovable.app/downsell" style="--kiwify-upsell-accept-bg:#059669;--kiwify-upsell-accept-color:#FFFFFF">
  <button id="kiwify-upsell-trigger-7YTPxjJ">SIM, QUERO ACELERAR MEU RESULTADO</button>
  <div id="kiwify-upsell-cancel-trigger-7YTPxjJ">Não, obrigada. Prefiro seguir no ritmo normal.</div>
</div><script src="https://snippets.kiwify.com/upsell-v2/upsell.min.js"></script>`;
export const KIWIFY_SNIPPET_DOWNSELL = `<div id="kiwify-upsell-nUO7dfq" data-upsell-url="" data-downsell-url="" style="--kiwify-upsell-accept-bg:#059669;--kiwify-upsell-accept-color:#FFFFFF">
  <button id="kiwify-upsell-trigger-nUO7dfq">SIM, QUERO O TURBO ESSENCIAL</button>
  <div id="kiwify-upsell-cancel-trigger-nUO7dfq">Não, quero seguir só com o protocolo.</div>
</div><script src="https://snippets.kiwify.com/upsell-v2/upsell.min.js"></script>`;

// Checkout normal dos produtos (usado só no modo reserva). Preencha com os links da Kiwify.
export const FALLBACK_CHECKOUT_UPSELL = "https://pay.kiwify.com.br/7YTPxjJ";
export const FALLBACK_CHECKOUT_DOWNSELL = "https://pay.kiwify.com.br/nUO7dfq";

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
