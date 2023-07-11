# Aplicação de Ficha Médica

A aplicação de Ficha Médica tem como objetivo fornecer uma plataforma para pacientes acessarem suas fichas médicas, enquanto os médicos têm controle total sobre o gerenciamento das fichas. Com essa aplicação, pacientes podem visualizar suas informações médicas de forma segura, enquanto os médicos podem realizar todas as operações de criação, leitura, atualização e exclusão (CRUD) das fichas.

## Libs/Ferramentas

- Next.js
- TypeScript
- Tailwind
- Axios
- Zustand

## Uso
Para fazer nosso primeiro contato com a aplicação, ao rodar a migração no backend, irá criar um usuário default. Sendo assim, pode ser feito o login na aplicação com o usuários:
- email: teodoro@example.com
- senha: 123456
### Usuário do tipo Médico
- Acesso à aplicação para controle completo do CRUD de usuários e fichas médicas.
- Interface intuitiva e de fácil utilização para o controle de usuários.
- Para criar uma ficha médica, ao acessar a lista de usuários, os do tipo 'paciente' terão uma opção em ações para criar a ficha médica para ele.
- Acesso às fichas médicas, permitindo a visualização de informações resumidas.
- Opções no menu da ficha médica, permitindo:
  - Visualização completa das informações.
  - Edição das informações.
  - Exclusão da ficha médica.

### Usuário do tipo Paciente
- Possibilidade de fazer login na aplicação.
- Acesso somente à visualização da sua própria ficha médica.

## Backend

Está aplicação está utilizando [MedicalRecords-Back](https://github.com/TeodoroRaulino/MedicalRecords-Back) como backend.
