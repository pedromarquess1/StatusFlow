📌 Visão Geral do Projeto

O StatusFlow é um sistema leve e de alta performance para telemetria e monitoramento de microsserviços em tempo real, construído com Java 21 (Spring Boot) no backend e React + TypeScript + Tailwind CSS no frontend.

O objetivo principal da aplicação é fornecer um painel visual de status, disparar health checks periódicos nos serviços cadastrados, registrar métricas de latência e disponibilidade, e emitir alertas automáticos em caso de queda.

🏗️ Arquitetura & Princípios Fundamentais

1. Padrão Arquitetural: Arquitetura Hexagonal (Ports and Adapters)

Para garantir alta testabilidade e manutenibilidade a longo prazo, o backend segue estritamente a Arquitetura Hexagonal:

Core Domain (domain/): Java puro. Sem dependências do Spring, Hibernate ou qualquer outro framework externo.

Ports (ports/): Interfaces que definem as capacidades de entrada (casos de uso) e os requisitos de saída (repositórios, clientes HTTP).

Use Cases (usecase/): Serviços da aplicação que orquestram a lógica de negócio.

Infrastructure (infrastructure/): Adaptadores para Controllers REST, entidades do Spring Data JPA, persistência PostgreSQL e clientes HTTP de verificação.

2. Clean Architecture & Padrões de Código

Backend API Desacoplado: O Spring Boot atua exclusivamente como um servidor de API JSON/REST. O frontend em React assume toda a renderização da interface.

Integridade do Domínio: O modelo de domínio protege suas próprias regras no momento da instanciação (ex: validação de formato de URL, garantindo que valores nulos não sejam aceitos).

📂 Mapeamento de Pastas e Pacotes (Backend)

src/main/java/com/statusflow/
│
├── domain/                      # 🧠 Core Domain (Java 21 Puro)
│   ├── model/
│   │   └── MonitoredService.java # Entidade principal de negócio
│   └── exception/               # Exceções puras do domínio
│
├── ports/                       # 🔌 Contratos Hexagonais (Interfaces)
│   ├── inbound/                 # Ports de Entrada (Casos de Uso / Endpoints REST)
│   └── outbound/                # Ports de Saída (Persistência / HTTP Externo)
│
├── usecase/                     # ⚙️ Lógica da Aplicação / Interactors
│
└── infrastructure/              # 🌍 Mundo Externo (Adaptadores & Frameworks)
    ├── adapters/
    │   ├── inbound/rest/        # Spring @RestController & DTOs
    │   └── outbound/
    │       ├── persistence/     # Entidades e Repositórios Spring Data JPA
    │       └── http/            # Adaptadores RestClient / WebClient
    └── configuration/           # Beans do Spring & Configurações Globais



⚙️ Stack Técnica & Dependências

Backend (Spring Boot 3.3.x / Java 21)

Spring Web (spring-boot-starter-web): Endpoints para a API REST.

Spring Data JPA (spring-boot-starter-data-jpa): ORM para persistência no PostgreSQL.

PostgreSQL Driver (postgresql): Driver JDBC para conexão com o banco.

Spring Boot Actuator (spring-boot-starter-actuator): Métricas e telemetria da aplicação.

Lombok (lombok): Redução de código boilerplate (getters, setters, construtores).

Configuração do Banco de Dados (application.yml)

SGBD: PostgreSQL (jdbc:postgresql://localhost:5432/statusflow_db)

Gerenciamento DDL: hibernate.ddl-auto: update (Modo de desenvolvimento)

Porta do Servidor: 8080

📋 Progresso Atual da Implementação

1. Entidade do Domínio Principal: MonitoredService

Pacote: com.statusflow.domain.model

Atributos:

Long id

String name

String url

Boolean status

Regras de Negócio & Validações:

O construtor valida se a url não é nula e não está em branco (url.isBlank()), lançando uma exceção IllegalArgumentException caso seja inválida.