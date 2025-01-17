# Projeto To-Do

## Descrição
O projeto To-Do é uma aplicação de gerenciamento de tarefas desenvolvida com **Java** no backend, utilizando o framework **Spring Boot**, e **React** no frontend. Toda a aplicação foi configurada para ser executada em contêiners Docker.

## Tecnologias Utilizadas

### Backend
- **Java**
- **Spring Boot**
  - Spring Web
  - Spring Data JPA
  - PostgreSQL

### Frontend
- **React**
  - React Hooks
  - Axios (ou outro cliente HTTP para comunicação com o backend)
  - Tailwindcss

### Infraestrutura
- **Docker**
- **Docker Compose**

## Manual de Instalação

### 1. Requisitos Prévios
- Docker instalado na máquina.
- Docker Compose configurado.

### 2. Passos para Instalação

#### Clonar o Repositório
Execute o comando a seguir para clonar o repositório do projeto:
```bash
git clone https://github.com/davistz/to-do.git
cd to-do
```

#### Configurar o Arquivo `.env` (Opcional)
Crie um arquivo `.env` na raiz do projeto (se ainda não existir) e configure as variáveis de ambiente necessárias para o backend e frontend, como portas ou credenciais.

#### Construir e Executar os Contêineres
Na raiz do projeto, execute o comando:
```bash
docker-compose up --build
```
Este comando irá:
1. Construir as imagens Docker para o backend e o frontend.
2. Inicializar os contêineres definidos no arquivo `docker-compose.yml`.

#### Acessar a Aplicação
- **Frontend:** Acesse `http://localhost:8000` no navegador.
- **Backend:** A API estará acessível em `http://localhost:8080/tasks`.


### 3. Comandos Adicionais

#### Parar os Contêineres
Para parar os contêineres em execução, utilize:
```bash
docker-compose down
```

#### Reconstruir Contêineres
Se houver alterações no código ou nas dependências, reconstrua os contêineres com:
```bash
docker-compose up --build
```

---

## Endpoints da API

### 1. Obter todas as tarefas (GET)
**URL:** `http://localhost:8080/tasks`

**Método HTTP:** GET

**Descrição:** Retorna a lista de todas as tarefas cadastradas.

**Resposta de Exemplo:**
```json
[
  {
            "id": 1,
            "title": "Teste 1",
            "description": "Teste 1",
            "status": "NAO_INICIADO"
  },
]
```

---

### 2. Criar uma nova tarefa (POST)
**URL:** `http://localhost:8080/tasks`

**Método HTTP:** POST

**Descrição:** Cria uma nova tarefa com base nos dados fornecidos no corpo da requisição.

**Corpo da Requisição (Exemplo):**
```json
{
    "title": "Teste 1",
    "description": "Teste description 1"
}
```

**Resposta de Sucesso:**
```json
{
    "id": 1,
    "title": "Teste 1",
    "description": "Teste description 1",
    "status": "NAO_INICIADO"
}
```

---

### 3. Atualizar uma tarefa (PUT)
**URL:** `http://localhost:8080/tasks/change/{id}`

**Método HTTP:** PUT

**Descrição:** Atualiza os detalhes de uma tarefa existente, identificada pelo seu `id`.

**Parâmetros:**
- `id` (obrigatório): ID da tarefa que será atualizada.

**Corpo da Requisição (Exemplo):**
```json
{
    "title": "Teste 2",
    "description": "Teste description 2",
    "status": "CONCLUIDO"
}
```

**Resposta de Sucesso:**
```json
{
    "title": "Teste 2",
    "description": "Teste description 2",
    "status": "CONCLUIDO"
}
```

---

### 4. Excluir uma tarefa (DELETE)
**URL:** `http://localhost:8080/tasks/{id}`

**Método HTTP:** DELETE

**Descrição:** Remove uma tarefa existente, identificada pelo seu `id`.

**Parâmetros:**
- `id` (obrigatório): ID da tarefa que será excluída.

**Resposta de Sucesso:**
- **Código HTTP:** 204 (No Content)

---
## Contato
Entre em contato através das seguintes plataformas:

- **LinkedIn:** [Seu LinkedIn](https://www.linkedin.com/in/davi-souza-40b3892a6/)
- **Email:** davi.santos07@souunit.com.br
- **Instagram:** [@davisnz_](https://www.instagram.com/davisnz_/)

