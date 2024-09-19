# Projeto de Backend Lemon - Elegibilidade

Este projeto é uma API desenvolvida em NestJS para verificar a elegibilidade de clientes com base em critérios específicos. A API recebe dados do cliente e retorna se ele é elegível ou não, juntamente com os motivos da inelegibilidade, se aplicável.

## Funcionalidades

- **Verificar elegibilidade de clientes** com base em critérios predefinidos.
- **Validação de dados** de entrada, incluindo CPF e CNPJ válidos.
- **Retorno de mensagens de erro** detalhadas em caso de dados inválidos.
- **Cálculo de economia anual de CO₂** para clientes elegíveis.
- **Documentação da API** utilizando Swagger.
- **Testes unitários e de integração** para garantir a qualidade do código.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/get-npm) (geralmente instalado com o Node.js)
- [Git](https://git-scm.com/)

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/W-ON/lemon-test
   
2. **Entre no diretório**

    ```bash
    cd lemon-test
   
3. **Instale as dependências**

    ```bash
    npm install

4. **Rode a aplicação**

    ```bash
    npm run start:dev

## Acessando a Documentação da API

A documentação completa da API está disponível no Swagger. Você pode acessá-la quando a api estiver rodando  utilizando o seguinte link:

[Documentação da API - Swagger](http://localhost:3000/api)

## Exemplos de uso da API

**Requisição Elegível com cURL**

    curl -X POST http://localhost:3000/eligibility \
      -H 'Content-Type: application/json' \
      -d '{
        "documentNumber": "38274439899",
        "connectionType": "bifasico",
        "consumptionClass": "comercial",
        "rateModality": "convencional",
        "consumptionHistory": [3878, 9760, 5976]
      }
      
*Resposta Esperada:*

    {
      "eligible": true,
      "annualCO2Savings": 5553.24
    }

**Requisição Inelegível com cURL**

    curl -X POST http://localhost:3000/eligibility \
      -H 'Content-Type: application/json' \
      -d '{
        "documentNumber": "38274439899",
        "connectionType": "monofasico",
        "consumptionClass": "rural",
        "rateModality": "verde",
        "consumptionHistory": [100, 200, 150]
      }'
      
*Resposta Esperada:*

```bash
{
  "eligible": false,
  "ineligibilityReasons": [
    "Classe de consumo não aceita",
    "Modalidade tarifária não aceita",
    "Consumo muito baixo para tipo de conexão"
  ]
}
