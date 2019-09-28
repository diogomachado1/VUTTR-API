# VUTTR-API(Very Useful Tools to Remember)

## Sobre
![Preview-Screens](/__tests__/coverage/badges/badge-statements.svg)
[![buddy pipeline](https://app.buddy.works/diogomachado8/desafio-backend-bossabox/pipelines/pipeline/212530/badge.svg?token=3f3eb2f4608d209549269d90401cab8c5f248726aa922c3d4915a0203027c11d "buddy pipeline")](https://app.buddy.works/diogomachado8/desafio-backend-bossabox/pipelines/pipeline/212530)

A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

## Documentação

[https://vuttr-doc.diogomachado.site/](https://vuttr-doc.diogomachado.site/)

## Funcionalidades

- Autentificação
- Criação e edição de usuário.
- Gerenciamento das suas ferramentas
  - Listagem de todas as ferramentas
  - Busca pelo nome
  - Busca por Tag
  - Criação
  - Edição
  - Remoção

## Getting Started

**Clonando o repositorio**

```bash
git clone https://github.com/diogomachado1/desafio-backend.git

cd desafio-backend
```

### Usando docker-compose(Recomendado)

```bash
docker-compose up
```

A aplicação estará rodando na porta 3000, caso esteja rodando o frontend lebrem-se de trocar a porta do backend ou frontend para evitar conflito.

### Instalação convencional

#### Pre-requisito

- Estar rodando banco de dados postgres.
- Estar rodando banco de dados redis.

#### Instalando as dependencias

```bash
yarn
```
**ou**
```bash
npm install
```

#### Conectando ao Banco de dados

Utilizando como exemplo o `.env.example`, crie um `.env` com as variáveis para as conexões com os bancos de dados e a chave do JWT.

.env.exemple:

```
APP_SECRET=

DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

REDIS_HOST=
REDIS_PORT=

SENTRY_DSN=
```

#### Start

Para rodar a aplicação bastar usar:

```bash
yarn dev
```
**ou**
```bash
npm run dev
```

### Testes

Para rodar os testes da aplicação, primeiro precisa configurar o `.env.test` utilizando o `.env.example` como exemplo e estar com Postgrees e Redis rodando.

obs: Recomendo criar outro database no Postgress para os testes.

Depois de configurar o `.env` e banco, basta usar o comando:

```bash
yarn test
```
**ou**
```bash
npm run test
```

### Build

```bash
yarn build
```
**ou**
```bash
npm run build
```
