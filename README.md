# Consultador de CPF com Máscara

Uma aplicação web em JavaScript que encontra todos os CPFs válidos compatíveis com um padrão informado pelo usuário, permitindo utilizar caracteres coringa (`x`, `X`, `?` ou `*`) para representar dígitos desconhecidos.

🔗 Uma demonstração está disponível no [Pages](https://thomaz-s.github.io/Consultar-UF-Original/](https://seu-usuario.github.io/gerador-cpf/)).

## Como funciona

O usuário informa um CPF contendo números e caracteres coringa.

Exemplos:

```text
12345678909
12345x78909
12?45*789xx
xxxxxxxxxxx
```

O sistema:

1. Identifica os caracteres não numéricos.
2. Gera todas as combinações possíveis para os dígitos desconhecidos.
3. Calcula os dígitos verificadores (DV) de cada combinação.
4. Exibe todos os CPFs válidos que correspondem ao padrão informado.

---

## Funcionalidades

* Aceita números e os caracteres coringa:

  * `x`
  * `X`
  * `?`
  * `*`
* Validação automática do tamanho da entrada.
* Geração de todas as combinações possíveis.
* Cálculo dos dígitos verificadores do CPF.
* Exibição dos CPFs válidos encontrados.
* Placeholder aleatório para demonstrar exemplos de uso.
* Limitação de até **1.000.000 de combinações** para evitar travamentos.

---

## Estrutura do Código

### `buscarNaoNumericos()`

Função executada ao enviar o formulário.

Responsável por:

* Impedir o recarregamento da página.
* Separar os nove primeiros dígitos dos verificadores.
* Contar os caracteres desconhecidos.
* Iniciar a busca das combinações válidas.

---

### `aceitarSomenteNumerosCoringa()`

Filtra os caracteres digitados.

Permite apenas:

```text
0-9
x
X
?
*
```

Também habilita ou desabilita o botão de consulta conforme o tamanho da entrada.

---

### `substituirNaoNumericos()`

Função principal da aplicação.

Responsável por:

* Gerar todas as combinações possíveis.
* Substituir os caracteres coringa.
* Calcular os dígitos verificadores.
* Validar os CPFs encontrados.
* Armazenar os resultados.

---

### `calcular_dv()`

Calcula um dígito verificador do CPF utilizando o algoritmo oficial.

Passos:

1. Multiplica cada dígito pelo peso correspondente.
2. Soma os resultados.
3. Calcula o resto da divisão por 11.
4. Retorna o DV calculado.

---

### `criarLista()`

Atualiza a lista de resultados exibida na página.

Caso nenhum CPF válido seja encontrado, exibe:

```text
Não há CPF's válidos nesse padrão
```

---

### `mostrarValorConsultado()`

Exibe o CPF pesquisado no formato:

```text
123.456.789-09
```

---

### `preencherPlaceholder()`

Gera um exemplo aleatório para o campo de entrada sempre que a página é carregada ou após uma consulta.

Exemplo:

```text
Ex.: 12x45678x90
```

---

## Exemplo de Uso

Entrada:

```text
123456789xx
```

Saída:

```text
12345678909
```

Como os dois últimos dígitos são desconhecidos, o sistema calcula quais combinações produzem um CPF válido.

---

## Limitações

Para evitar consumo excessivo de memória e processamento, o sistema interrompe a busca após:

```text
1.000.000 de combinações
```

Quando isso acontece, é exibido um aviso indicando quantas combinações deixaram de ser processadas.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)

---

## Executando o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Entre na pasta do projeto:

```bash
cd seu-repositorio
```

3. Abra o arquivo `index.html` em qualquer navegador moderno.

Não é necessário instalar dependências ou executar servidor.

---

## Licença

Este projeto é distribuído sob a licença MIT. Sinta-se livre para utilizar, modificar e distribuir.
