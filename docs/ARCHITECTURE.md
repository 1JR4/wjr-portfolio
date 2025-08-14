# 🏗️ System Architecture

## Overview

Flying Nimbus follows a **provider-agnostic, modular architecture** designed for flexibility and scalability while maintaining simplicity (NO OVER-ENGINEERING principle).

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App   │  │  Mobile App  │  │   CLI/API    │  │
│  │  (Hotwire)  │  │(React Native)│  │   Clients    │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┴─────────────────┴─────────────────┴──────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    API Gateway                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │          GraphQL API (Apollo Server)            │   │
│  │    Rate Limiting │ Auth │ Caching │ Logging    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Business Logic Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   Use Cases  │  │   Services   │  │   Domain    │  │
│  │              │  │              │  │   Models    │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Provider Abstraction Layer                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Provider Interfaces (Adapters)          │   │
│  │   Database │ Storage │ Auth │ Email │ Payment  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 External Providers                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Firebase │  │ Supabase │  │   AWS    │  Others...  │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Provider Agnosticism
All external services are accessed through abstract interfaces, allowing easy switching between providers.

```typescript
// Example: Database Interface
interface DatabaseProvider {
  create<T>(collection: string, data: T): Promise<T>;
  read<T>(collection: string, id: string): Promise<T>;
  update<T>(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
}

// Implementations
class FirebaseDatabase implements DatabaseProvider { }
class SupabaseDatabase implements DatabaseProvider { }
class MongoDatabase implements DatabaseProvider { }
```

### 2. Modular Design
Each component has a single responsibility and clear boundaries.

```
src/
├── core/           # Business logic (provider-agnostic)
├── providers/      # External service implementations
├── api/           # GraphQL schemas and resolvers
├── services/      # Application services
└── utils/         # Shared utilities
```

### 3. Separation of Concerns
- **Presentation**: Client applications (Web, Mobile, CLI)
- **API**: GraphQL gateway with middleware
- **Business Logic**: Use cases and domain models
- **Data Access**: Provider abstraction layer
- **External Services**: Third-party integrations

## Technology Stack

### Frontend
- **Web Framework**: Hotwire (Turbo + Stimulus)
- **Styling**: Tailwind CSS
- **Mobile**: React Native (planned)
- **State Management**: Minimal (server-side focused)

### Backend
- **Runtime**: Node.js 20+
- **Language**: TypeScript (strict mode)
- **API**: GraphQL (Apollo Server)
- **Authentication**: JWT with refresh tokens

### Database & Storage
- **Primary**: Firebase Firestore (current)
- **Alternative**: Supabase PostgreSQL (ready)
- **Caching**: In-memory (Redis ready)
- **File Storage**: Firebase Storage (S3 compatible)

### Infrastructure
- **Hosting**: Firebase Hosting
- **Functions**: Firebase Functions / Edge Functions
- **CI/CD**: GitHub Actions
- **Monitoring**: Built-in metrics + Sentry

### Testing
- **BDD**: Cucumber + Gherkin scenarios
- **E2E**: Playwright (Browser MCP automated)
- **Unit**: Jest
- **Coverage**: Minimum 80%

## Data Flow

### Request Lifecycle
```
1. Client Request → 
2. API Gateway (Rate Limiting, Auth) →
3. GraphQL Resolver →
4. Use Case / Service →
5. Provider Interface →
6. External Provider →
7. Response Transform →
8. Client Response
```

### Authentication Flow
```
1. Login Request →
2. Validate Credentials →
3. Generate JWT + Refresh Token →
4. Store Refresh Token →
5. Return Tokens →
6. Subsequent Requests with JWT →
7. Auto-refresh on Expiry
```

## Security Architecture

### Layers of Security
1. **Network**: HTTPS only, CORS configuration
2. **API Gateway**: Rate limiting, request validation
3. **Authentication**: JWT with short expiration
4. **Authorization**: Role-based access control
5. **Data**: Encryption at rest and in transit
6. **Input**: Validation and sanitization
7. **Dependencies**: Regular security audits

### Security Headers
```typescript
helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: true,
  xssFilter: true,
})
```

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Connection pooling
- Load balancing ready
- Microservice compatible

### Performance Optimization
- GraphQL query complexity limits
- DataLoader for N+1 prevention
- Response caching
- CDN for static assets
- Lazy loading
- Code splitting

### Database Strategy
- Indexing strategy
- Query optimization
- Read replicas (when needed)
- Sharding ready (future)

## Multi-Agent Architecture

### Agent Responsibilities
```
orchestrator/        # Coordinates complex tasks
├── backend-api/     # Server logic, APIs
├── frontend-web/    # Web UI components
├── mobile-dev/      # Mobile applications
├── database-mgr/    # Schema, migrations
├── devops-eng/      # Infrastructure, CI/CD
├── testing-spec/    # Test strategies
└── security-aud/    # Security auditing
```

### Agent Communication
- Structured handoffs via HANDOFF_TEMPLATE.md
- Context preservation with Context7 MCP
- Clear boundaries defined in AGENT_BOUNDARIES.md

## MCP Server Integration

### Available MCPs
- **Context7**: Long-term memory and context
- **Browser**: Automated web testing
- **Supabase**: Alternative database provider
- **Taskmaster**: Project management
- **Exa Search**: Enhanced research

### MCP Benefits
- Enhanced agent coordination
- Automated testing workflows
- Provider migration paths
- Project memory across sessions

## Deployment Architecture

### Environments
```
Development (Local)
    ↓
Staging (Firebase Staging Project)
    ↓
Production (Firebase Production Project)
```

### CI/CD Pipeline
```
1. Code Push →
2. Lint & Format →
3. Type Check →
4. Unit Tests →
5. Build →
6. Integration Tests →
7. Deploy to Staging →
8. E2E Tests →
9. Manual Approval →
10. Deploy to Production
```

## Monitoring & Observability

### Metrics
- Response times (P50, P95, P99)
- Error rates
- Request throughput
- Database query performance
- Bundle sizes

### Logging
- Structured JSON logging
- Log levels (error, warn, info, debug)
- Correlation IDs for request tracing
- Centralized log aggregation

### Alerting
- Error rate spikes
- Performance degradation
- Security violations
- Infrastructure issues

## Evolution Strategy

### Phase 1: Foundation (Current)
- Basic Firebase implementation
- Core authentication
- GraphQL API
- Agent ecosystem

### Phase 2: Enhancement
- Supabase integration
- Advanced caching
- Real-time features
- Mobile application

### Phase 3: Scale
- Microservice migration
- Multi-region deployment
- Advanced monitoring
- ML/AI features

## Decision Log

Major architectural decisions are documented in [DECISIONS.md](./DECISIONS.md)

---

**Last Updated**: 2025-08-08
**Version**: 1.0.0
**Status**: Active