# Delivery - Plataforma de Delivery para Hortifruti

O **Delivery** é uma plataforma de delivery desenvolvida para hortifrutis, permitindo que os clientes realizem pedidos online de produtos frescos. O projeto é composto por duas partes principais:

- **Front-end**: Aplicação desenvolvida com **Angular** (utilizando **HTML**, **CSS**, **JavaScript** e **TypeScript**).
- **Back-end**: API desenvolvida com **Spring Boot** e **Maven** para gerenciar dependências e build, com a utilização de **PostgreSQL** para persistência dos dados.

## Tabela de Conteúdo

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Banco de Dados](#banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

## Descrição

O **Delivery** foi desenvolvido para permitir que os clientes de um hortifruti possam comprar produtos frescos e recebê-los no conforto de suas casas. O projeto está dividido em dois módulos principais:

- **Back-end (API)**: Desenvolvido com **Spring Boot** e **Maven** para gerenciar as dependências do projeto. Ele fornece os endpoints REST para gerenciar as operações de produtos, clientes e pedidos.
- **Front-end**: Desenvolvido com **Angular**, proporcionando uma interface moderna e responsiva para os usuários finais.

Até o momento, a base de dados contém informações sobre **produtos**. A parte de **clientes** e **pedidos** está em desenvolvimento.

## Tecnologias Utilizadas

- **Front-end**:
  - Angular
  - HTML
  - CSS
  - JavaScript
  - TypeScript

- **Back-end**:
  - Spring Boot
  - Maven (para gerenciar dependências)
  - PostgreSQL (para persistência de dados)
  
- **Banco de Dados**:
  - PostgreSQL

## Como Rodar o Projeto

### Pré-requisitos

- **Java 11** ou superior
- **Node.js** (para o front-end)
- **PostgreSQL** (configurado corretamente)

### Configuração do Banco de Dados

Para rodar o back-end, você precisará configurar o banco de dados **PostgreSQL** localmente.

1. Crie um banco de dados no PostgreSQL chamado `delivery_db`.
2. Se você não alterou a configuração do banco no código, ele irá conectar automaticamente ao banco `delivery_db` com as credenciais padrão:
   - **Usuário**: `postgres`
   - **Senha**: `admin`
   
Caso precise modificar essas configurações, edite o arquivo `src/main/resources/application.properties` 


