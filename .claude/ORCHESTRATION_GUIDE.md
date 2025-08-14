# Orchestration Guide for Multi-Agent Development

> Based on Anthropic's Multi-Agent Research System principles

## 🎯 When You're the Lead/Orchestrator Agent

### Pre-Task Analysis
Before delegating, analyze:

```typescript
interface TaskAnalysis {
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedAgents: number;
  canParallelize: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  timeConstraint: 'none' | 'urgent' | 'deadline';
}
```

### Decision Tree: Single vs Multi-Agent

#### Use Single Agent When:
- ✅ Task is contained within one domain
- ✅ No external dependencies  
- ✅ Low risk of breaking changes
- ✅ Simple, well-defined objective

**Examples:**
- Fix a CSS styling issue
- Update documentation  
- Add a simple utility function
- Configure environment variables

#### Use Multi-Agent When:
- ⚡ Task spans multiple domains (API + UI + Database)
- ⚡ Requires specialized expertise (Security audit + Implementation)
- ⚡ Can benefit from parallel work streams
- ⚡ High complexity or risk

**Examples:**
- Implementing user authentication
- Performance optimization across stack
- Security vulnerability remediation
- Complex feature with mobile + web components

### Orchestration Process

#### 1. Task Decomposition Template
```markdown
# Task Decomposition: [TASK_NAME]

## Overview
**Objective**: [Clear, measurable goal]
**Success Criteria**: [How we know we're done]
**Risk Level**: [Low/Medium/High]

## Subtasks
| Agent | Objective | Dependencies | Success Criteria | Est. Time |
|-------|-----------|--------------|------------------|-----------|
| Database | Schema changes | None | Tables created, indexed | 30min |
| Backend API | Endpoint implementation | Database | Working endpoints, tested | 1hr |
| Security | Security review | Backend API | No critical vulnerabilities | 20min |
| Frontend Web | UI implementation | Backend API | Functional UI, error handling | 45min |

## Coordination Points
- [ ] Database schema approved by Backend API Agent
- [ ] Security review completed before Frontend work
- [ ] All agents sync on API contract changes
```

#### 2. Delegation Script
```markdown
# Agent Delegation: [AGENT_TYPE]

## Your Mission
You are the **[AGENT_TYPE] Agent** for this task.

**Specific Objective**: [Precise goal]
**Dependencies**: [What needs to be done first]
**Context**: [Background information]
**Success Criteria**: [How to know you're done]

## Constraints
- Timeline: [If any]
- Technology: [Any specific requirements]
- Integration Points: [What you need to coordinate with others]

## Handoff Instructions
When complete:
1. Update your progress in the main task thread
2. Provide context for dependent agents
3. Flag any blockers or changes to original plan
```

### Coordination Patterns

#### Pattern 1: Sequential (Waterfall)
```
Database → Backend API → Security → Frontend
```
Use when: Strong dependencies, each step builds on the previous

#### Pattern 2: Parallel with Sync Points
```
Database ────┐
             ├─→ Backend API → Security
Frontend ────┘                    ↓
                              Integration
```  
Use when: Some work can happen simultaneously

#### Pattern 3: Star (Hub and Spoke)
```
         Backend API
        ↗️      ↖️      ↙️
Database    Frontend    Mobile
    ↘️         ↑         ↗️
     └─── Orchestrator ──┘
```
Use when: Central component connects to multiple others

### Monitoring & Synthesis

#### Progress Tracking
```markdown
## Task Progress Dashboard

### Overall Status: [In Progress/Blocked/Complete]
### Completion: [X/Y] subtasks done

| Agent | Status | Progress | Issues | ETA |
|-------|--------|----------|--------|-----|
| Database | ✅ Complete | 100% | None | Done |
| Backend API | 🔄 In Progress | 70% | Rate limiting decision needed | 20min |
| Security | ⏳ Waiting | 0% | Waiting for Backend API | +15min |
| Frontend | 🔄 In Progress | 30% | None | 30min |

### Next Actions
1. Backend API Agent: Decide on rate limiting approach
2. Security Agent: Review ready for handoff in 20min
3. Integration testing once all components ready
```

#### Result Synthesis
```markdown
## Task Completion Summary

### What Was Accomplished ✅
- [List all achievements]
- [Include metrics: performance, security, etc.]

### Architecture Decisions Made 🏗️
- [Document key technical choices]
- [Rationale for each decision]

### Integration Points Verified ✓
- [API contracts tested]
- [Data flows validated]  
- [Error handling confirmed]

### Handoff to User 📋
The feature is complete and includes:
- [User-facing functionality]
- [Performance characteristics]
- [Monitoring/observability]
```

## 🚨 Red Flags: When to Stop Orchestration

### Abort and Simplify When:
- ❌ More than 3 agents needed for initial version
- ❌ Agents are waiting on each other in circular dependencies
- ❌ Timeline pressure makes coordination overhead too high
- ❌ Frequent conflicts between agents
- ❌ Task scope keeps expanding

### Fallback Strategy:
1. **Simplify**: Reduce scope to single-agent task
2. **Serialize**: Make it sequential instead of parallel
3. **Prototype**: Build minimal version first, enhance later
4. **Defer**: Table complex parts for future iteration

## 🎛️ Orchestrator Tools & Commands

### Status Check Commands
```bash
# Get current state
git status
git log --oneline -10

# Check build status  
npm test
npm run build

# Performance check
npm run analyze
```

### Agent Communication Templates
```markdown
# Agent Status Request
@[AgentType]: Please provide status update on [specific task]
Need by: [time]
Context: [what depends on this]

# Agent Coordination  
@AllAgents: Sync point reached. Please confirm:
- [ ] API contract agreed upon
- [ ] Data models validated
- [ ] Error handling approach confirmed

# Issue Escalation
@[AgentType]: Blocker identified: [description]
Impact: [which other agents affected]
Need decision on: [specific question]
Options: [A, B, C with trade-offs]
```

## 📊 Orchestration Metrics

Track these to improve coordination:
- **Task Completion Time**: From start to fully integrated
- **Agent Utilization**: How much work was truly parallel  
- **Rework Rate**: How often agents had to redo work
- **Integration Issues**: Problems found during final assembly
- **Communication Overhead**: Time spent on coordination vs. implementation

---

**Remember**: Good orchestration makes complex tasks feel simple. If it feels chaotic, step back and simplify.