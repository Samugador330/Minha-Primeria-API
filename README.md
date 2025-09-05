# Primeira API - Desafio Node.js

Este repositório contém o código-fonte de uma API RESTful desenvolvida em Node.js utilizando o framework Fastify, Drizzle ORM e PostgreSQL. O objetivo deste projeto é praticar e demonstrar conceitos fundamentais de desenvolvimento backend, como criação de rotas, validação de dados, integração com banco de dados e documentação de API.

## Tecnologias Utilizadas

- **Node.js**  
- **Fastify**  
- **Drizzle ORM**  
- **PostgreSQL**  
- **Zod** (validação de dados)
- **Swagger** (documentação automática)
- **Docker** (para ambiente do banco de dados)

## Estrutura do Projeto
. ├── src/ │ ├── database/ │ │ ├── client.ts # Configuração do cliente Drizzle ORM │ │ └── schema.ts # Definição dos esquemas das tabelas │ └── routes/ │ ├── create-courses.ts # Rota para criar cursos │ ├── get-course-by-id.ts # Rota para buscar curso por ID │ └── get-courses.ts # Rota para listar todos os cursos ├── drizzle/ # Migrations e metadados do Drizzle ├── server.ts # Inicialização do servidor Fastify ├── docker-compose.yml # Configuração do container PostgreSQL ├── .env # Variáveis de ambiente └── package.json # Dependências e scripts

## Funcionalidades

- **Criar Curso:**  
  Endpoint para cadastrar um novo curso com título e descrição.

- **Listar Cursos:**  
  Endpoint para listar todos os cursos cadastrados.

- **Buscar Curso por ID:**  
  Endpoint para buscar detalhes de um curso específico pelo seu ID.

- **Documentação Interativa:**  
  Disponível em `/docs` durante o desenvolvimento.