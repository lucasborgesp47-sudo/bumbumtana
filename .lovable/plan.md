# Plano de Refatoração da Página de Vendas

Este plano detalha a reconstrução completa da página de vendas para eliminar bugs de layout, padronizar o design system e otimizar a conversão seguindo as diretrizes mobile-first.

## Design System & Regras Globais

- **Cores**:
  - Rosa Principal (`--brand`): #E0245E (CTAs, Preço, Destaques)
  - Fundo Rosa (`--brand-soft`): #FFF1F5
  - Títulos (`--ink`): #0F172A
  - Texto (`--ink-2`): #475569
  - Superfície (`--surface`): #FFFFFF
  - Fundo Alternativo (`--surface-2`): #F8FAFC
  - Bordas (`--line`): #E2E8F0
  - Sucesso (`--ok`): #059669 (Checkmarks e Garantia)
- **Tipografia**: Fonte Inter (H1 32px, H2 24px, H3 18px, Corpo 16px).
- **Mobile-first**: Largura base de 390px, `overflow-x: hidden`, sem truncamento de texto.
- **Ícones**: Substituição de emojis por `lucide-react`.

## Implementação Técnica

### 1. Timer de Escassez Real
- Persistência em `localStorage` (chave `oferta_inicio`).
- Duração de 15 minutos que não reinicia no reload.
- **Lógica de Expiração**: 
  - Antes de 00:00: Preço R$ 29,90, link checkout 29.
  - Após 00:00: Preço R$ 49,90, link checkout 49, remove badge de desconto.

### 2. Nova Estrutura de Seções (Ordem Exata)
1.  **Diagnóstico Personalizado**: Título dinâmico com nome e resposta do quiz.
2.  **Mecanismo (O que trava o resultado)**: 3 blocos com ícones focados no "vilão externo".
3.  **O Produto (Visual)**: Mockup de celular com carrossel de screenshots reais do PWA.
4.  **Stack de Entregáveis**: Cards com valor ancorado individualmente (Total R$ 198 → R$ 29,90).
5.  **Prova Social**: Carrossel de depoimentos (placeholders para inserção futura). Prazo fixo de 21 dias.
6.  **Oferta**: Card centralizado com âncora R$ 99,90 e preço atual.
7.  **Fluxo Pós-Compra**: 3 passos numerados (Pagamento → E-mail → Início).
8.  **Garantia**: Card verde de 7 dias (enfoque em teste de acesso/conteúdo).
9.  **FAQ**: Perguntas atualizadas focadas em objeções de produto digital.
10. **CTA Final**: Repetição da oferta sem contadores falsos.

### 3. Ajustes de UX e Conformidade
- Refatoração da Barra Fixa inferior (altura 72px, texto em duas linhas).
- Remoção de contadores sociais contraditórios e seções órfãs/fora de ordem.
- Adição de Disclaimer legal no rodapé.
- Substituição de termos técnicos confusos (ex: "Protocolo Base ANS").

## Detalhes Técnicos (Desenvolvedores)
- Atualização do `src/styles.css` com a nova escala de tokens.
- Modificação profunda em `src/routes/sales.tsx` para seguir o novo grid.
- Utilização de `lucide-react` para todos os elementos gráficos.
- Verificação de acessibilidade (`aria-label` nos botões e contraste).
