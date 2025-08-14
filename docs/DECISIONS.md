# 📋 Architecture Decision Records (ADRs)

> Document all significant architectural decisions here. Each decision should explain the context, choice made, and consequences.

## ADR Template

```markdown
## ADR-XXX: [Decision Title]

**Date**: YYYY-MM-DD
**Status**: [Proposed | Active | Deprecated | Superseded by ADR-YYY]
**Deciders**: [List of people involved]
**Tags**: [e.g., architecture, security, performance]

### Context
What is the issue we're addressing? What forces are at play?

### Decision
What is the change that we're proposing and/or doing?

### Consequences
What becomes easier or more difficult because of this change?

### Alternatives Considered
What other options did we evaluate?

### References
Links to relevant documentation, discussions, or research.
```

---

## ADR-001: Provider-Agnostic Architecture

**Date**: 2025-08-07
**Status**: Active
**Deciders**: AI Orchestrator Agent, System Architect
**Tags**: architecture, scalability, vendor-lock-in

### Context
We need to build a system that can easily switch between cloud providers (Firebase, AWS, Supabase, etc.) without major code rewrites. Vendor lock-in is a significant risk for startups.

### Decision
Implement a provider abstraction layer where all external services are accessed through interfaces. Business logic never directly imports provider-specific code.

### Consequences
**Positive:**
- Easy migration between providers
- Clear separation of concerns
- Testable with mock providers
- Multiple providers can coexist

**Negative:**
- Additional abstraction layer complexity
- Potential performance overhead
- More initial setup required

### Alternatives Considered
1. **Direct Firebase integration**: Faster initial development but high lock-in
2. **Microservices from start**: Over-engineering for current needs
3. **Multi-cloud native**: Too complex for MVP phase

### References
- [Clean Architecture principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

## ADR-002: Hotwire over React SPA

**Date**: 2025-08-07
**Status**: Active
**Deciders**: Frontend Agent, Korean Development Methodology Advocate
**Tags**: frontend, performance, simplicity

### Context
Need to choose a frontend framework that balances modern UX with development simplicity. Korean development methodology emphasizes minimal JavaScript and server-side rendering.

### Decision
Use Hotwire (Turbo + Stimulus) for web UI instead of React/Vue/Angular SPA.

### Consequences
**Positive:**
- Minimal JavaScript complexity
- Better SEO out of the box
- Faster initial page loads
- Simpler deployment (no separate frontend build)
- Works without JavaScript enabled

**Negative:**
- Less familiar to many developers
- Fewer third-party components
- Some interactive features harder to implement
- Limited mobile code reuse

### Alternatives Considered
1. **React SPA**: Popular but requires complex state management
2. **Next.js**: Good but adds deployment complexity
3. **Vue.js**: Simpler than React but still SPA complexity
4. **HTMX**: Similar philosophy but less mature ecosystem

### References
- [Hotwire Documentation](https://hotwired.dev/)
- Korean Development Tips (원큐엔 절대 안됩니다)

---

## ADR-003: BDD Testing over TDD

**Date**: 2025-08-07
**Status**: Active
**Deciders**: Testing Specialist Agent, AI Development Advocate
**Tags**: testing, quality, ai-development

### Context
AI-driven development benefits from behavior-focused testing rather than implementation-focused unit tests. BDD aligns better with natural language requirements.

### Decision
Adopt Behavior-Driven Development (BDD) with Cucumber/Gherkin as primary testing strategy. Unit tests only for complex algorithms.

### Consequences
**Positive:**
- Tests readable by non-developers
- AI agents understand Gherkin scenarios
- Focus on user value not implementation
- Natural documentation of features
- Browser MCP can auto-generate Playwright tests

**Negative:**
- Slower test execution than unit tests
- Requires more setup
- Can lead to redundant scenarios
- Team needs BDD training

### Alternatives Considered
1. **Traditional TDD**: Too implementation-focused for AI development
2. **Only E2E tests**: Too slow for rapid feedback
3. **Only unit tests**: Miss integration issues
4. **No formal testing**: Unacceptable for production

### References
- [BDD with Cucumber](https://cucumber.io/docs/bdd/)
- Browser MCP integration guide

---

## ADR-004: Git Worktrees for Parallel Development

**Date**: 2025-08-07
**Status**: Active
**Deciders**: DevOps Engineer Agent, Korean Methodology Advocate
**Tags**: development-workflow, git, productivity

### Context
Need to work on multiple features simultaneously without constant branch switching. AI agents benefit from isolated workspaces.

### Decision
Use Git Worktrees for parallel feature development instead of traditional branch switching.

### Consequences
**Positive:**
- Multiple features in progress simultaneously
- No stash/unstash dance
- Each worktree has independent state
- Perfect for multi-agent development
- Supports "원큐엔 절대 안됩니다" principle

**Negative:**
- More disk space usage
- Need to manage multiple directories
- Can be confusing for beginners
- IDE needs reconfiguration per worktree

### Alternatives Considered
1. **Traditional branching**: Too much context switching
2. **Multiple clones**: Harder to share commits
3. **Monorepo with packages**: Over-engineering for current needs

### References
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- GIT_WORKTREE_GUIDE.md

---

## ADR-005: GraphQL API Gateway

**Date**: 2025-08-07
**Status**: Active
**Deciders**: Backend API Agent, System Architect
**Tags**: api, architecture, scalability

### Context
Need a flexible API that can serve web, mobile, and third-party clients efficiently while maintaining provider agnosticism.

### Decision
Implement GraphQL as the primary API gateway instead of REST endpoints.

### Consequences
**Positive:**
- Single endpoint for all queries
- Client-specified data fetching
- Strong typing with schema
- Self-documenting API
- Efficient mobile data usage

**Negative:**
- Learning curve for GraphQL
- Complex caching strategies
- N+1 query problems possible
- File upload complexity

### Alternatives Considered
1. **REST API**: More familiar but multiple round trips
2. **gRPC**: Better performance but poor browser support
3. **SOAP**: Legacy, verbose, complex
4. **Direct database access**: Security nightmare

### References
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- Apollo Server documentation

---

## ADR-006: JWT with Refresh Tokens

**Date**: 2025-08-08
**Status**: Active
**Deciders**: Security Auditor Agent, Backend API Agent
**Tags**: security, authentication, scalability

### Context
Need stateless authentication that scales horizontally while maintaining security and good UX.

### Decision
Use JWT tokens with 15-minute expiration and separate refresh tokens for authentication.

### Consequences
**Positive:**
- Stateless authentication
- Horizontal scaling ready
- Reduced database lookups
- Works across services
- Standard implementation

**Negative:**
- Token revocation complexity
- Refresh token management
- Larger request headers
- Clock skew issues possible

### Alternatives Considered
1. **Session cookies**: Requires sticky sessions
2. **OAuth2 only**: Too complex for MVP
3. **API keys**: Not suitable for user auth
4. **Basic auth**: Insecure, sends credentials repeatedly

### References
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- OAuth 2.0 Security Best Practices

---

## ADR-007: MCP Server Integration

**Date**: 2025-08-08
**Status**: Active
**Deciders**: Orchestrator Agent, DevOps Engineer Agent
**Tags**: ai-development, tooling, productivity

### Context
AI agents need enhanced capabilities for memory, testing, research, and coordination across sessions.

### Decision
Integrate MCP (Model Context Protocol) servers for Context7, Browser, Supabase, Taskmaster, and Exa.

### Consequences
**Positive:**
- Long-term memory across sessions
- Automated test generation
- Better research capabilities
- Enhanced multi-agent coordination
- Provider migration paths

**Negative:**
- Additional API keys to manage
- External service dependencies
- Potential cost implications
- Learning curve for MCP usage

### Alternatives Considered
1. **No MCP servers**: Limited agent capabilities
2. **Custom memory solution**: Reinventing the wheel
3. **Only Context7**: Miss other valuable capabilities
4. **All available MCPs**: Too many dependencies

### References
- MCP_INTEGRATION_GUIDE.md
- [Anthropic MCP Documentation](https://docs.anthropic.com/mcp)

---

## ADR-008: Feature Backup Strategy

**Date**: 2025-08-08
**Status**: Active
**Deciders**: DevOps Engineer Agent, Korean Methodology Advocate
**Tags**: backup, risk-management, deployment

### Context
Following "원큐엔 절대 안됩니다" (never all at once) principle, need systematic feature backup before major changes.

### Decision
Implement automated feature backup scripts that create timestamped snapshots before significant changes.

### Consequences
**Positive:**
- Quick rollback capability
- Feature-level version control
- Reduced deployment anxiety
- Historical feature evolution tracking

**Negative:**
- Additional storage requirements
- Need backup cleanup strategy
- Potential confusion with git history
- Manual backup trigger needed

### Alternatives Considered
1. **Git tags only**: Not granular enough
2. **Database snapshots**: Doesn't include code
3. **Full VM backups**: Too heavy
4. **No backups**: Too risky

### References
- FEATURE_BACKUP_BDD_GUIDE.md
- Korean Development Methodologies

---

## Template for New Decisions

```markdown
## ADR-XXX: [Your Decision Title]

**Date**: 2025-MM-DD
**Status**: Proposed
**Deciders**: [Your agent type or team]
**Tags**: [relevant tags]

### Context
[Describe the problem or situation requiring a decision]

### Decision
[State the architectural decision clearly]

### Consequences
**Positive:**
- [Benefit 1]
- [Benefit 2]

**Negative:**
- [Drawback 1]
- [Drawback 2]

### Alternatives Considered
1. **[Alternative 1]**: [Why not chosen]
2. **[Alternative 2]**: [Why not chosen]

### References
- [Relevant links or documents]
```

---

**How to Use This Document:**
1. Add new ADRs sequentially (ADR-009, ADR-010, etc.)
2. Update status when decisions change
3. Link superseded ADRs to their replacements
4. Keep decisions concise but complete
5. Include all stakeholders in decision process

**Review Schedule:** Quarterly review of all Active ADRs