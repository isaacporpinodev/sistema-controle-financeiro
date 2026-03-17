# Guia Rapido Do CSS E JS

Este arquivo resume o que seu `CSS` e seu `JavaScript` fazem, sem entrar em detalhe demais.

---

## Visao Geral

Seu projeto tem 3 partes:

- `index.html`: estrutura da pagina
- `style.css`: visual da pagina
- `script.js`: comportamento da pagina

O HTML cria a tela.
O CSS estiliza a tela.
O JavaScript faz a tela funcionar.

---

## CSS

O `style.css` cuida da aparencia e da organizacao visual.

### 1. Reset inicial

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Esse bloco remove espacos padrao do navegador e deixa o layout mais previsivel.

### 2. Variaveis no `:root`

Voce guardou:

- fonte principal
- cores do projeto
- sombras

Exemplo:

```css
--accent-color: #186135;
```

Depois voce reutiliza com:

```css
color: var(--accent-color);
```

Isso ajuda a manter consistencia e facilita futuras alteracoes.

### 3. `body`

O `body` centraliza o app na horizontal, deixa o conteudo com espaco nas bordas e define:

- cor de fundo geral
- cor do texto
- fonte principal

### 4. `.app`

Esse e o container principal do sistema.

Ele recebe:

- largura maxima
- padding
- borda
- fundo
- sombra

Na pratica, ele funciona como a caixa principal da aplicacao.

### 5. Secoes principais

As classes:

- `.balance-section`
- `.form-section`
- `.transactions-section`

compartilham o mesmo estilo base de card:

- margem
- padding
- borda
- cantos arredondados
- fundo
- sombra

Isso deixa o layout consistente.

### 6. `.transactions-section`

Ela tem:

```css
overflow-x: auto;
```

Isso permite rolagem horizontal se a tabela ficar larga demais em telas pequenas.

### 7. Formulario

As principais classes sao:

- `.form-group`: organiza label e input em coluna
- `.form-label`: estilo dos textos do formulario
- `.form-input`: estilo dos campos
- `.form-button`: estilo do botao principal

No `:focus`, os inputs ganham destaque visual.

### 8. Botoes

Voce tem:

- `.form-button`
- `.edit-button`
- `.delete-button`

Eles compartilham propriedades como:

- sem borda
- cursor pointer
- transicao suave

Depois cada um recebe sua cor propria.

### 9. `:hover` e `:active`

- `:hover` muda a cor quando o mouse passa por cima
- `:active` aplica:

```css
transform: translateY(1px);
```

Isso faz o botao descer `1px` no clique, criando um efeito sutil.

### 10. Tabela

A `.transactions-table` controla a tabela de transacoes.

Ela tem:

- largura total
- largura minima
- colapso de bordas
- layout fixo

Os `th` sao os cabecalhos.
Os `td` sao as celulas.

### 11. `th:nth-child(2)`

Esse seletor aponta para a segunda coluna da tabela.

No seu caso:

1. Nome
2. Valor
3. Acoes

Entao `th:nth-child(2)` significa a coluna `Valor`.

Voce usou isso para alinhar e controlar melhor essa coluna.

### 12. `.actions-cell`

Essa classe organiza os botoes `Editar` e `Excluir` dentro da tabela.

Ela usa:

- `display: flex`
- `flex-wrap: wrap`
- `gap`

Isso ajuda os botoes a se adaptarem melhor ao espaco.

### 13. `.transaction-value`

Essa classe estiliza os valores numericos da tabela.

Ela deixa o valor:

- mais destacado
- centralizado
- sem quebrar linha

### 14. `.valor-positivo` e `.valor-negativo`

Essas classes mudam a cor do valor:

- positivo fica verde
- negativo fica vermelho

### 15. `@media`

Seu CSS tem responsividade.

#### `@media (max-width: 768px)`

Faz ajustes para telas menores:

- reduz paddings
- diminui alguns textos
- reduz espacamento entre botoes

#### `@media (max-width: 480px)`

Faz ajustes mais fortes para celular pequeno:

- diminui ainda mais os espacos
- reduz titulo e saldo
- empilha os botoes da coluna de acoes
- faz os botoes ocuparem toda a largura

Resumo: seu CSS esta organizado em blocos de layout, formulario, tabela, botoes e responsividade.

---

## JavaScript

O `script.js` cuida do comportamento da pagina e da comunicacao com a API.

### 1. Variavel `edicao`

```js
let edicao = null;
```

Essa variavel diz se o formulario esta:

- criando uma nova transacao
- ou editando uma ja existente

Se `edicao` for `null`, cria.
Se tiver um `id`, edita.

### 2. Pegando o formulario

```js
const form = document.getElementById("transaction-form");
```

Aqui o JavaScript pega o formulario do HTML para poder trabalhar com ele.

### 3. Evento de submit

```js
form.addEventListener("submit", async (ev) => {
```

Esse bloco executa quando o formulario e enviado.

### 4. `ev.preventDefault()`

Impede que a pagina recarregue ao enviar o formulario.

Assim, tudo acontece de forma dinamica.

### 5. Pegando os valores dos inputs

O codigo busca:

- nome da transacao
- valor da transacao

O valor numerico usa:

```js
Number(valueInput.value);
```

para converter texto em numero.

### 6. Criando o objeto

```js
const newTransaction = {
  nome: name,
  valor: value,
};
```

Esse objeto representa a transacao que sera enviada para a API.

### 7. Criar ou editar

O `if` verifica:

```js
if (edicao === null)
```

Se for `null`:

- usa `POST`
- cria uma nova transacao

Se nao for `null`:

- usa `PUT`
- atualiza a transacao existente

### 8. `fetch`

`fetch` e usado para fazer requisicoes HTTP.

No seu codigo ele faz:

- `GET`: buscar transacoes
- `POST`: criar
- `PUT`: editar
- `DELETE`: excluir

### 9. `JSON.stringify`

Quando envia os dados para a API, voce usa:

```js
JSON.stringify(newTransaction)
```

Isso transforma o objeto JavaScript em JSON.

### 10. Atualizando a tela depois do envio

Depois de criar ou editar, o codigo:

- chama `buscarTransacoes()`
- limpa os inputs
- volta `edicao` para `null`

### 11. Funcao `buscarTransacoes`

Essa e a funcao principal do arquivo.

Ela:

- busca as transacoes na API
- limpa a tabela atual
- cria as linhas da tabela
- calcula o saldo total

### 12. Requisicao inicial

```js
const response = await fetch("http://localhost:3000/transactions");
const transactions = await response.json();
```

Aqui o codigo pega os dados da API e transforma em array JavaScript.

### 13. Limpando a tabela

```js
transactionsBody.innerHTML = "";
```

Isso apaga as linhas anteriores para nao duplicar conteudo.

### 14. `forEach`

```js
transactions.forEach((transaction) => {
```

Esse bloco percorre cada transacao e monta uma linha da tabela.

### 15. Criando elementos com JavaScript

O codigo usa:

- `document.createElement("tr")`
- `document.createElement("td")`
- `document.createElement("button")`

Ou seja, a tabela nao esta pronta no HTML.
Ela e montada dinamicamente no JS.

### 16. Nome e valor

Para cada transacao, o codigo cria:

- uma celula para o nome
- uma celula para o valor

O valor e formatado com:

```js
toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});
```

Isso transforma o numero em moeda brasileira.

### 17. Botoes de acao

Para cada linha, o codigo cria:

- botao `Excluir`
- botao `Editar`

### 18. Botao excluir

No clique, ele faz `DELETE` para a API e depois atualiza a lista.

### 19. Botao editar

No clique, ele:

- pega o `id` da transacao
- guarda em `edicao`
- preenche os inputs com os valores atuais

Assim, quando o usuario enviar o formulario, o sistema entende que deve editar, e nao criar.

### 20. Classes positivas e negativas

O codigo verifica:

```js
if (transaction.valor >= 0)
```

Se for positivo:

- adiciona `valor-positivo`

Se for negativo:

- adiciona `valor-negativo`

Essas classes existem no CSS e mudam a cor do valor.

### 21. `append`

O codigo usa `append` para montar a linha:

- coloca as celulas dentro da linha
- coloca a linha dentro do `tbody`

### 22. `reduce`

```js
const total = transactions.reduce((acc, item) => {
  return acc + item.valor;
}, 0);
```

Esse bloco soma todos os valores das transacoes.

`reduce` pega varios itens e transforma em um unico resultado.

Aqui o resultado final e o saldo total.

### 23. Atualizando o saldo

Depois da soma, o codigo pega:

```js
document.getElementById("balance");
```

e mostra o total formatado em moeda.

### 24. `DOMContentLoaded`

```js
document.addEventListener("DOMContentLoaded", () => {
  buscarTransacoes();
});
```

Esse evento garante que o JavaScript espere o HTML carregar.

Quando a pagina abre:

- a funcao `buscarTransacoes()` roda
- a tabela aparece
- o saldo aparece

---

## Fluxo Geral Da Aplicacao

### Ao abrir a pagina

1. o HTML carrega
2. o CSS estiliza
3. o JS chama `buscarTransacoes()`
4. a tabela e o saldo sao preenchidos

### Ao adicionar uma transacao

1. o usuario preenche o formulario
2. o JS impede o reload
3. envia os dados para a API
4. atualiza a lista
5. recalcula o saldo

### Ao editar

1. o usuario clica em `Editar`
2. os dados vao para o formulario
3. `edicao` guarda o `id`
4. ao enviar, o sistema usa `PUT`

### Ao excluir

1. o usuario clica em `Excluir`
2. a API remove a transacao
3. a tabela e atualizada
4. o saldo e recalculado

---

## Resumo Final

### O CSS do seu projeto

Cuida de:

- layout
- cores
- formulario
- tabela
- botoes
- responsividade

### O JavaScript do seu projeto

Cuida de:

- formulario
- API
- renderizacao da tabela
- edicao
- exclusao
- calculo do saldo

### Em uma frase

Seu CSS deixa a aplicacao organizada visualmente, e seu JavaScript faz a aplicacao funcionar de verdade.

