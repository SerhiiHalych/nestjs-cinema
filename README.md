# Example Project (Movie Session Service): Implementing Clean Architecture and Domain Driven Design with Nest.js

This repository contains an example project demonstrating the implementation of Clean Architecture and Domain Driven Design principles using Nest.js framework. This project serves as a practical guide for developers interested in building scalable, maintainable, and well-structured applications.

## Introduction

The combination of Clean Architecture and Domain Driven Design (DDD) provides a robust framework for developing complex applications that are easy to understand, maintain, and extend. Nest.js, with its modular structure and dependency injection system, is an excellent choice for implementing these architectural patterns in TypeScript.

## Features

- **Modular Design:** The project is structured into modules representing different layers of the application, such as Domain, Application, Infrastructure, and Presentation layers.
  
- **Domain Driven Design:** The domain layer encapsulates the business logic and entities, ensuring that the application's core concepts are well-defined and independent of implementation details.

- **Separation of Concerns:** Clean Architecture enforces clear boundaries between layers, promoting separation of concerns and reducing coupling between components.

- **Dependency Injection:** Nest.js leverages TypeScript's dependency injection to manage dependencies and promote testability and flexibility.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:** `git clone https://github.com/SerhiiHalych/nestjs-cinema.git`
2. **Install Dependencies:** `cd nestjs-cinema && npm ci`
3. **Start the docker:** `docker-compose up -d`
4. **Run migrations:** `npm run typeorm:run-migrations`
5. **Run the Application:** `npm start`

## Project Structure

The project structure follows the principles of Clean Architecture and Domain Driven Design:

    src
    ├── common                   # Common logic for project
    │   ├── application/         # Application layer containing common application-level logic
    │   ├── domain/              # Domain layer containing base logic for domain events
    │   └── infrastructure/      # Infrastructure layer containing base logic for persistence, event handling and configuration
    ├── movieSession             # Movie Session domain context
    │   ├── application/         # Application layer containing use cases
    │   ├── domain/              # Domain layer containing business logic and entities
    │   └── infrastructure/      # Infrastructure layer containing external services and implementations
    └── ...

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Resources

- [Nest.js Documentation](https://nestjs.com/)
- [Clean Architecture by Robert C. Martin](https://www.google.com.ua/books/edition/Clean_Architecture/uGE1DwAAQBAJ?hl=en&gbpv=0&bsq=clean%20architecture)
- [Implementing Domain-Driven Design — Vaughn Vernon](https://www.google.com.ua/books/edition/Implementing_Domain_driven_Design/aVJsAQAAQBAJ?hl=en)
- [Hexagonal Architecture with NestJS](https://khalilstemmler.com/articles/enterprise-typescript/hexagonal-architecture/)