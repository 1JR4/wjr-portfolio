# Agent Handoff Template

> Use this template when passing context between specialized agents

## Agent Information
- **From**: [Current Agent Type] 
- **To**: [Next Agent Type]
- **Session ID**: `session-${timestamp}`
- **Handoff Time**: `${new Date().toISOString()}`

## Task Summary
### What Was Completed ✅
- [ ] 
- [ ] 
- [ ] 

### What's In Progress 🔄
- [ ] 
- [ ] 

### What's Blocked ⚠️
- [ ] **Issue**: 
  - **Blocker**: 
  - **Required Action**: 
  - **Owner**: 

### Next Priority Items 🎯
1. **High**: 
2. **Medium**: 
3. **Low**: 

## Technical State
### Current Branch & Status
```bash
# Run these to understand current state
git status
git log --oneline -5
npm test
npm run build
```

### Recent Changes
- **Files Modified**: 
- **New Dependencies**: 
- **Configuration Changes**: 
- **Environment Variables**: 

### Build & Test Status
- **Build Status**: ✅ Passing / ❌ Failing / 🔄 In Progress
- **Test Coverage**: `%`
- **Failed Tests**: 
- **Performance Impact**: 

## Environment Status
### Staging
- **URL**: 
- **Status**: ✅ Healthy / ⚠️ Degraded / ❌ Down
- **Last Deploy**: 
- **Issues**: 

### Production  
- **URL**: 
- **Status**: ✅ Healthy / ⚠️ Degraded / ❌ Down
- **Last Deploy**: 
- **Issues**: 

## Agent-Specific Context

### For Backend API Agent 🔧
```json
{
  "currentEndpoints": [],
  "databaseSchema": {},
  "authStrategy": "",
  "performanceMetrics": {
    "avgResponseTime": 0,
    "errorRate": 0,
    "throughput": 0
  }
}
```

### For Frontend Web Agent 💻
```json
{
  "framework": "",
  "stateManagement": "",
  "apiEndpoints": [],
  "buildStatus": "",
  "bundleSize": 0,
  "performanceScore": 0
}
```

### For Mobile Agent 📱
```json
{
  "platform": "",
  "targetPlatforms": [],
  "nativeFeatures": [],
  "appStoreStatus": {},
  "buildVariants": []
}
```

### For Database Agent 🗄️
```json
{
  "provider": "",
  "pendingMigrations": [],
  "queryPerformance": {},
  "backupStrategy": "",
  "dataVolume": 0
}
```

### For DevOps Agent ⚙️
```json
{
  "deploymentStatus": {},
  "environmentHealth": {},
  "monitoringAlerts": [],
  "infrastructureState": {}
}
```

### For Testing Agent 🧪
```json
{
  "coverageMetrics": {},
  "failingTests": [],
  "e2eScenarios": [],
  "performanceBaselines": {}
}
```

### For Security Agent 🔒
```json
{
  "authFlows": [],
  "vulnerabilities": [],
  "complianceStatus": {},
  "securityHeaders": {}
}
```

### For UI/UX Agent 🎨
```json
{
  "designSystem": {},
  "componentLibrary": {},
  "accessibilityAudit": {},
  "userFlows": []
}
```

## Business Context
### User Stories Affected
- **Story**: 
  - **Status**: 
  - **Impact**: 
  - **Notes**: 

### Performance Considerations
- **Performance Impact**: Positive / Negative / Neutral
- **Metrics Affected**: 
- **Monitoring**: 

### Timeline & Dependencies
- **Deadline**: 
- **Dependencies**: 
- **Risks**: 

## Communication Log
### Stakeholder Updates Sent
- [ ] Product Manager
- [ ] Tech Lead  
- [ ] QA Team
- [ ] DevOps Team

### Decisions Made
| Decision | Rationale | Impact | Owner |
|----------|-----------|--------|-------|
|          |           |        |       |

### Open Questions
1. **Question**: 
   - **Context**: 
   - **Decision Needed By**: 
   - **Stakeholders**: 

## Quality Checklist
- [ ] Code follows project standards (CLAUDE.md)
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Security considerations addressed
- [ ] Performance impact assessed
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] Monitoring/logging added

## Handoff Verification
- [ ] Context document completed
- [ ] Technical state verified
- [ ] Next agent identified and notified
- [ ] Critical blockers escalated
- [ ] Documentation updated

## Notes & Additional Context

---

**Next Agent**: Please confirm receipt of this handoff and update your session context accordingly.