# Agent Boundaries & Responsibilities

> Clear boundaries prevent conflicts and ensure smooth collaboration between specialized agents

## 🚨 Core Rules

### **NO TOUCHING** Other Agent's Domain
- Backend API Agent: Don't modify frontend components
- Frontend Web Agent: Don't change API endpoints  
- Mobile Agent: Don't alter web-specific code
- Database Agent: Others can't modify schema without approval
- DevOps Agent: Only DevOps touches infrastructure
- Security Agent: Can review/block, but others implement
- Testing Agent: Others can't disable/skip tests
- UI/UX Agent: Others can't modify design system

### **ALWAYS ASK** Before Cross-Domain Changes
If your change affects another agent's domain, create a handoff document first.

## 📋 Detailed Boundaries

### Backend API Agent 🔧
**OWNS:**
- API endpoints and GraphQL schemas
- Server-side business logic
- Database queries and transactions  
- Authentication middleware
- API performance optimization
- Server configuration

**CANNOT TOUCH:**
- Frontend components or styling
- Mobile native code
- Database schema structure
- Infrastructure/deployment configs
- UI/UX design decisions

**MUST COORDINATE WITH:**
- Database Agent: For schema changes
- Security Agent: For auth flows
- DevOps Agent: For deployment needs

### Frontend Web Agent 💻  
**OWNS:**
- React/Vue/Svelte components
- State management (Redux, Zustand, etc.)
- Client-side routing
- Web-specific performance optimizations
- Browser API integrations
- Web accessibility features

**CANNOT TOUCH:**
- API endpoint definitions
- Mobile app code
- Server configuration
- Database queries
- Infrastructure

**MUST COORDINATE WITH:**
- Backend API Agent: For API changes
- UI/UX Agent: For design changes
- Mobile Agent: For shared component libraries

### Mobile Agent 📱
**OWNS:**
- React Native/Flutter components
- Native platform integrations
- App store deployment
- Mobile-specific performance
- Push notifications
- Mobile accessibility

**CANNOT TOUCH:**
- Web-only components
- API endpoint definitions  
- Database schema
- Server configuration

**MUST COORDINATE WITH:**
- Backend API Agent: For API changes
- UI/UX Agent: For design consistency
- DevOps Agent: For app store releases

### Database Agent 🗄️
**OWNS:**
- Database schema and migrations
- Query optimization and indexing
- Data relationships and constraints
- Database performance tuning
- Backup and recovery strategies
- Data seeding and fixtures

**CANNOT TOUCH:**
- API endpoint implementations
- Frontend components
- Infrastructure provisioning
- Application business logic

**MUST COORDINATE WITH:**
- Backend API Agent: For query requirements
- DevOps Agent: For database provisioning
- Testing Agent: For test data management

### DevOps Agent ⚙️
**OWNS:**
- CI/CD pipelines
- Infrastructure provisioning
- Environment management
- Monitoring and alerting
- Security scanning automation
- Deployment strategies

**CANNOT TOUCH:**
- Application source code
- Database schema
- UI components
- Business logic

**MUST COORDINATE WITH:**
- ALL AGENTS: For deployment requirements
- Security Agent: For security policies
- Testing Agent: For test automation

### Testing Agent 🧪
**OWNS:**
- All test files and test configuration
- Test data management
- Coverage requirements
- E2E test scenarios
- Performance testing
- Test environment setup

**CANNOT TOUCH:**
- Production application code (except test utilities)
- Infrastructure configuration
- Database schema
- CI/CD pipeline logic

**MUST COORDINATE WITH:**
- ALL AGENTS: For test requirements
- Database Agent: For test data
- DevOps Agent: For test environments

### Security Agent 🔒
**OWNS:**
- Security policies and guidelines
- Vulnerability assessments
- Compliance requirements
- Security headers configuration
- Audit procedures
- Security test scenarios

**CANNOT TOUCH:**
- Implementation details (reviews only)
- Infrastructure provisioning
- Database queries
- UI components

**MUST COORDINATE WITH:**
- ALL AGENTS: Security reviews required
- Backend API Agent: For auth implementation
- DevOps Agent: For security tooling

### UI/UX Agent 🎨
**OWNS:**
- Design system and tokens
- Component library standards
- Accessibility guidelines
- User experience flows
- Visual design consistency
- Usability testing

**CANNOT TOUCH:**
- Implementation code
- API endpoints
- Database structure
- Infrastructure

**MUST COORDINATE WITH:**
- Frontend Web Agent: For web implementation
- Mobile Agent: For mobile implementation
- Testing Agent: For usability tests

## ⚠️ Conflict Resolution

### Escalation Path
1. **Try to resolve** through handoff document
2. **Discuss** in agent communication
3. **Escalate** to project owner
4. **Document** decision for future reference

### Priority Order (Higher overrules lower)
1. **Security Agent** - Can block for security reasons
2. **DevOps Agent** - Can block for infrastructure stability  
3. **Database Agent** - Can block for data integrity
4. **Backend API Agent** - Can block for API stability
5. **Frontend Web/Mobile Agents** - Equal priority
6. **Testing Agent** - Can block for quality gates
7. **UI/UX Agent** - Advisory role

### Common Conflicts & Resolutions

#### Backend vs Frontend: API Changes
- **Backend Agent** proposes API changes
- **Frontend/Mobile Agents** review impact
- **Resolution**: Backend implements, Frontend adapts

#### Database vs Backend: Query Optimization  
- **Database Agent** optimizes queries
- **Backend Agent** may need to refactor
- **Resolution**: Database optimizes, Backend adapts

#### Security vs Everyone: Security Requirements
- **Security Agent** identifies issue
- **Implementing Agent** must fix
- **Resolution**: Security always wins

#### DevOps vs Everyone: Infrastructure Limits
- **DevOps Agent** sets infrastructure constraints
- **Other Agents** must work within limits
- **Resolution**: DevOps constraints are final

## 📊 Responsibility Matrix

| Domain | Backend | Frontend | Mobile | Database | DevOps | Testing | Security | UI/UX |
|--------|---------|----------|--------|----------|--------|---------|----------|-------|
| API Design | **OWNS** | Reviews | Reviews | Consults | - | Tests | Reviews | - |
| Database Schema | Consults | - | - | **OWNS** | Provisions | Seeds | Reviews | - |
| Frontend Components | - | **OWNS** | - | - | - | Tests | Reviews | Designs |
| Mobile Components | - | - | **OWNS** | - | - | Tests | Reviews | Designs |
| Infrastructure | Consults | - | - | Consults | **OWNS** | Uses | Reviews | - |
| Security | Implements | Implements | Implements | Implements | Implements | Tests | **OWNS** | Consults |
| Testing | Helps | Helps | Helps | Provides Data | Provides Env | **OWNS** | Reviews | Validates |
| Design System | - | Implements | Implements | - | - | Tests | Reviews | **OWNS** |

## 🔄 Exception Processes

### Emergency Changes
In production emergencies, normal boundaries may be relaxed:
1. **Fix first**, document later
2. **Create cleanup task** for proper boundaries
3. **Review** with affected agent afterward

### Cross-Agent Features
For features that span multiple domains:
1. **Create epic** with clear agent responsibilities
2. **Define interfaces** between agents upfront  
3. **Use handoff documents** for each transition
4. **Test integration points** thoroughly

### Learning & Knowledge Sharing
- Agents can **read** other domains for understanding
- Agents can **suggest** improvements to other domains
- Final **implementation** stays with domain owner

---

**Remember**: These boundaries exist to prevent chaos, not to create silos. When in doubt, communicate!