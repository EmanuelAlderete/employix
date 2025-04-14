# Employee – Projeto de Gerenciamento de Funcionários

Este é um projeto em desenvolvimento utilizando [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/) e [SQLite3](https://www.sqlite.org/index.html). Até o momento, foram implementadas as entidades principais e um script de seed para popular o banco com dados iniciais.

## 🚀 Tecnologias Utilizadas

- **NestJS** – Framework para aplicações Node.js escaláveis
- **TypeORM** – ORM para TypeScript e JavaScript
- **SQLite3** – Banco de dados leve e embutido
- **TypeScript** – Linguagem com tipagem estática para maior segurança no desenvolvimento

## 📦 Entidades Criadas

- `Employee` – Representa o funcionário (**Many-to-one** com `Employee` para a função de Gerente)
- `ContactInfo` – Informações de contato do funcionário (**One-to-one** com `Employee`)
- `Task` – Tarefas atribuídas aos funcionários (**Many-to-one** com `Employee`)
- `Meeting` – Reuniões entre funcionários (**Many-to-many** com `Employee`)

## 🔧 Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute a aplicação:

   ```bash
   npm run start:dev
   ```

---

📌 _Este projeto está em fase inicial de desenvolvimento. Futuras etapas incluirão criação de serviços, controllers e endpoints RESTful._
