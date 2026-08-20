# Plano de Otimização da Página de Vendas

Este plano detalha 4 ajustes estratégicos na copy e oferta da página de vendas para aumentar a conversão e o valor percebido, mantendo a consistência dos preços.

## 1. Correção de Ancoragem de Preço
Corrigir as inconsistências onde o valor "riscado" é igual ao valor final.
- Atualizar o card "ACESSO VITALÍCIO" para exibir "De R$ 225" riscado (novo total após bônus).
- Atualizar o bloco final de fundo escuro para exibir "De R$ 225" riscado.
- Unificar a ancoragem em todas as seções para refletir a nova soma total dos itens.

## 2. Nova Headline para Seção de Problemas
Adicionar um título de impacto antes dos cards de problemas para criar consciência sobre a causa raiz.
- **Headline:** "Não é falta de esforço. É isso que está travando seu resultado." (H2 estilizado).
- Localização: Logo após a seção de diagnóstico inicial.

## 3. Expansão do Pacote de Bônus
Adicionar 2 novos bônus estratégicos para aumentar o valor percebido.
- **Bônus 2:** "Checklist de Ativação Diária" (Valor: R$ 27).
- **Bônus 3:** "Grupo de Acompanhamento VIP" (Valor: R$ 37).
- Atualizar a lista de entregáveis e a soma total ("Valor total") de R$ 161 para R$ 225.
- Manter o preço promocional final em R$ 99,90 (ou R$ 29,90 com o desconto do timer).

## 4. Variação de CTAs (Chamadas para Ação)
Personalizar o texto dos botões de acordo com o contexto da seção.
- **Hero:** "Quero ativar meu protocolo agora — R$ 99,90"
- **Seção de Bônus:** "Quero todos os bônus — R$ 99,90"
- **Garantia:** "Quero testar sem risco — R$ 99,90"
- **Bloco Final:** "Sim, quero começar hoje — R$ 99,90"
- **Sticky Bar:** Mantém o padrão "Quero meu protocolo — R$ 99,90".

## Detalhes Técnicos
- Edição do arquivo `src/routes/sales.tsx`.
- Atualização da constante `anchorPrice` para `225`.
- Inclusão dos novos itens no array de entregáveis na `SECTION 4`.
- Inclusão da nova headline H2 na `SECTION 2`.
- Ajuste das strings de texto nos componentes `button`.
