# Claude Code Agents for Flying Nimbus

This directory contains specialized Claude Code agents optimized for modern software development with anti-over-engineering principles.

## 🤖 Available Agents

### Core Development Agents

1. **orchestrator** 🎯 - Multi-agent coordinator and task manager
   - Analyzes task complexity and delegates appropriately
   - Manages multi-agent workflows and synthesizes results
   - Use when: Complex tasks spanning multiple domains

2. **backend-api** 🔧 - Server-side logic and API development
   - GraphQL/REST API implementation
   - Provider-agnostic backend architecture
   - Use when: API changes, server logic, authentication

3. **frontend-web** 💻 - Web application development
   - React/Vue/Svelte components and state management
   - Responsive design and performance optimization
   - Use when: UI changes, web-specific features

4. **mobile-developer** 📱 - Cross-platform mobile development
   - React Native/Flutter applications
   - Native feature integration and app store deployment
   - Use when: Mobile features, platform-specific implementations

5. **database-manager** 🗄️ - Database design and optimization
   - Schema design, migrations, query optimization
   - Provider-agnostic data architecture
   - Use when: Schema changes, data migrations, query performance

6. **devops-engineer** ⚙️ - Infrastructure and deployment
   - CI/CD pipelines, monitoring, environment management
   - Automated deployments and rollback procedures
   - Use when: Deployment issues, infrastructure changes

7. **testing-specialist** 🧪 - Comprehensive testing strategy
   - Unit, integration, E2E, and performance testing
   - Quality gates and test automation
   - Use when: Test failures, coverage issues, new test scenarios

8. **security-auditor** 🔒 - Security implementation and auditing
   - Vulnerability assessments, compliance, security reviews
   - Authentication/authorization implementation
   - Use when: Security concerns, compliance requirements, auth changes

## 🎯 Agent Selection Guide

### Single Agent Tasks (Most Common)
Use one specialized agent for:
- Domain-specific changes within clear boundaries
- Simple, well-defined objectives
- Low-risk modifications
- Time-sensitive fixes

**Examples:**
```bash
# Use backend-api agent
> Implement password reset functionality

# Use frontend-web agent  
> Add responsive navigation menu

# Use testing-specialist agent
> Fix failing integration tests
```

### Multi-Agent Tasks (Complex Features)
Use the orchestrator for:
- Features spanning multiple domains
- High-risk changes requiring multiple perspectives
- Complex integrations between systems
- New product features

**Examples:**
```bash
# Use orchestrator agent
> Implement complete user authentication system

> Add real-time chat functionality

> Optimize application performance across entire stack
```

## 🔄 Agent Coordination Flow

```
User Request → Complexity Analysis → Agent Selection

Simple Task:
User → Specialized Agent → Result

Complex Task:
User → Orchestrator → Multiple Agents → Integration → Result
```

### Orchestrator Decision Tree
```typescript
if (task.complexity === 'simple' && task.domains.length === 1) {
  return selectSpecializedAgent(task.domain);
} else if (task.complexity === 'complex' || task.domains.length > 1) {
  return orchestrateMultiAgent(task);
} else {
  return askUserForClarification(task);
}
```

## 📋 Usage Examples

### Backend Development
```bash
# Single agent - API endpoint
> Use the backend-api subagent to add user profile endpoints

# Multi-agent - Authentication system  
> Use the orchestrator subagent to implement JWT authentication
```

### Frontend Development
```bash
# Single agent - Component creation
> Use the frontend-web subagent to create a user dashboard component

# Multi-agent - Feature integration
> Use the orchestrator subagent to integrate payment processing
```

### DevOps & Infrastructure
```bash
# Single agent - Pipeline fix
> Use the devops-engineer subagent to fix the staging deployment

# Multi-agent - Performance optimization
> Use the orchestrator subagent to optimize application performance
```

## 🚨 Anti-Over-Engineering Guidelines

### When NOT to Use Multi-Agent
- Simple bug fixes
- Documentation updates
- Code formatting/linting
- Single-file modifications
- Urgent hotfixes

### When to Use Multi-Agent
- New feature spanning UI + API + Database
- Security implementations requiring review
- Performance optimizations affecting multiple layers
- Complex integrations with external services

## 🔧 Agent Integration

### Context Sharing
All agents use structured context formats for handoffs:
- TypeScript interfaces defined in `agent-contexts.ts`
- Consistent status reporting and progress tracking
- Clear success criteria and completion signals

### Quality Gates
Each agent enforces quality standards:
- **Code Quality**: Linting, formatting, type safety
- **Testing**: Coverage requirements, test execution
- **Security**: Vulnerability scanning, compliance checks
- **Performance**: Response times, bundle size monitoring

### Documentation
Agents automatically maintain:
- Architecture decision records
- API documentation
- Code comments and docstrings
- Integration test scenarios

## 🎛️ Management Commands

### View Available Agents
```bash
/agents
```

### Agent Status
```bash
# Shows recent agent activity
/agents list
```

### Agent Creation (for new agents)
```bash
# Create new specialized agent
echo "---
name: new-agent
description: Agent description
tools: Read, Write, Edit
---

Agent system prompt here" > .claude/agents/new-agent.md
```

## 📊 Agent Performance Metrics

Track agent effectiveness:
- **Task Completion Rate**: Percentage of successful completions
- **Integration Success**: Multi-agent coordination effectiveness  
- **Quality Metrics**: Code quality, test coverage, security compliance
- **User Satisfaction**: Feedback on agent outputs

## 🔄 Continuous Improvement

### Agent Evolution
- Regular review of agent performance
- Update prompts based on common issues
- Add new agents for emerging needs
- Retire or merge underutilized agents

### Best Practices
- Start simple, add complexity only when needed
- Clear agent boundaries prevent conflicts
- Regular handoff protocol reviews
- User feedback integration

---

**Remember**: These agents embody our core principle of **NO OVER-ENGINEERING**. They choose working solutions over perfect architecture, pragmatic approaches over theoretical ideals, and incremental improvements over revolutionary changes.