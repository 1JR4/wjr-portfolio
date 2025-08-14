# 🌳 Git Worktree for Parallel Development

Develop multiple features simultaneously without branch switching - Perfect for AI agent collaboration

## 🎯 Why Git Worktree?

Git Worktree aligns with our multi-agent architecture:
- **Parallel Development**: Multiple agents work on different features simultaneously
- **No Context Switching**: Each worktree maintains its own state
- **Instant Backup**: Each worktree is a complete working copy
- **Clean Separation**: Features stay isolated until ready to merge
- **Claude Code Friendly**: Run multiple Claude sessions in different worktrees

## 🏗️ Worktree Architecture

### Traditional Approach (Slow)
```
main branch → switch to feature-1 → switch to feature-2 → switch back
         ↓                    ↓                    ↓
    (stash changes)     (stash changes)     (pop stash)
```

### Worktree Approach (Parallel)
```
flyingnimbustest/          (main branch)
├── ../fn-authentication/  (feature/authentication)
├── ../fn-payments/        (feature/payments)
├── ../fn-mobile/          (feature/mobile-app)
└── ../fn-performance/     (fix/performance)

All running simultaneously!
```

## 📦 Basic Worktree Commands

### Create New Worktree
```bash
# Create worktree for new feature
git worktree add ../fn-authentication feature/authentication

# Create worktree with new branch
git worktree add -b feature/new-feature ../fn-new-feature

# Create worktree from specific commit
git worktree add ../fn-hotfix hotfix/critical-bug HEAD~3
```

### List Worktrees
```bash
git worktree list
# Output:
# /Users/you/flyingnimbustest         abc1234 [main]
# /Users/you/fn-authentication        def5678 [feature/authentication]
# /Users/you/fn-payments              ghi9012 [feature/payments]
```

### Remove Worktree
```bash
# Remove worktree (after merging)
git worktree remove ../fn-authentication

# Force remove (if you have uncommitted changes)
git worktree remove --force ../fn-authentication

# Prune stale worktrees
git worktree prune
```

## 🤖 Multi-Agent Worktree Strategy

### Setup for Agent Collaboration
```bash
# Main orchestrator in main worktree
cd ~/flyingnimbustest  # main branch

# Backend API Agent worktree
git worktree add ../fn-backend feature/api-endpoints

# Frontend Web Agent worktree  
git worktree add ../fn-frontend feature/ui-components

# Mobile Developer worktree
git worktree add ../fn-mobile feature/mobile-app

# Database Manager worktree
git worktree add ../fn-database feature/schema-updates
```

### Agent Assignment
```markdown
## Worktree Agent Assignments

| Worktree | Branch | Agent | Task |
|----------|--------|-------|------|
| flyingnimbustest | main | orchestrator | Coordination & integration |
| fn-backend | feature/api-endpoints | backend-api | API development |
| fn-frontend | feature/ui-components | frontend-web | UI implementation |
| fn-mobile | feature/mobile-app | mobile-developer | Mobile app |
| fn-database | feature/schema-updates | database-manager | Schema design |
```

### Parallel Claude Code Sessions
```bash
# Terminal 1: Backend development
cd ../fn-backend
claude
> Use the backend-api subagent to implement user authentication endpoints

# Terminal 2: Frontend development (simultaneously!)
cd ../fn-frontend  
claude
> Use the frontend-web subagent to build login and registration forms

# Terminal 3: Mobile development (also simultaneous!)
cd ../fn-mobile
claude
> Use the mobile-developer subagent to create mobile authentication screens

# Terminal 4: Main coordination
cd ~/flyingnimbustest
claude
> Use the orchestrator subagent to review and integrate all authentication work
```

## 📝 Practical Worktree Workflows

### Feature Development Workflow
```bash
# 1. Create feature worktree
git worktree add -b feature/user-profiles ../fn-user-profiles

# 2. Navigate to worktree
cd ../fn-user-profiles

# 3. Develop feature with appropriate agent
claude
> Use the orchestrator subagent to implement user profile system

# 4. Commit changes
git add .
git commit -m "feat: implement user profile system"

# 5. Push branch
git push -u origin feature/user-profiles

# 6. Create PR from main worktree
cd ~/flyingnimbustest
gh pr create --base main --head feature/user-profiles

# 7. After merge, clean up
git worktree remove ../fn-user-profiles
```

### Hotfix Workflow
```bash
# 1. Create hotfix worktree from production
git worktree add -b hotfix/critical-bug ../fn-hotfix origin/production

# 2. Fix the bug
cd ../fn-hotfix
claude
> Use the backend-api subagent to fix the authentication bug

# 3. Test and commit
npm test
git commit -am "fix: resolve authentication token expiry issue"

# 4. Push and create PR
git push -u origin hotfix/critical-bug
gh pr create --base production --head hotfix/critical-bug --label "hotfix"

# 5. After deployment, clean up
git worktree remove ../fn-hotfix
```

### Experimental Feature Workflow
```bash
# 1. Create experimental worktree
git worktree add -b experimental/ai-features ../fn-experimental

# 2. Experiment freely
cd ../fn-experimental
# Try new libraries, approaches, etc.

# 3. If successful, create feature branch
git checkout -b feature/ai-integration

# 4. If failed, just remove worktree
git worktree remove --force ../fn-experimental
```

## 🎨 Worktree Organization Patterns

### Pattern 1: Feature-Based
```
project/                 # main
project-auth/           # feature/authentication
project-payments/       # feature/payments
project-mobile/         # feature/mobile
```

### Pattern 2: Environment-Based
```
project/                # development
project-staging/        # staging
project-production/     # production
project-hotfix/         # hotfix branch
```

### Pattern 3: Agent-Based
```
project/                # orchestrator (main)
project-backend/        # backend-api agent
project-frontend/       # frontend-web agent
project-mobile/         # mobile-developer agent
project-db/            # database-manager agent
```

### Pattern 4: Version-Based
```
project/                # v2.0 (current)
project-v1/            # v1.x (maintenance)
project-v3/            # v3.0 (next major)
```

## 🔧 Advanced Worktree Techniques

### Shared Configuration
```bash
# Create shared config that all worktrees can use
mkdir ~/project-shared
ln -s ~/project-shared/.env ../fn-backend/.env
ln -s ~/project-shared/.env ../fn-frontend/.env
```

### Worktree Templates
```bash
# Create a script for consistent worktree setup
#!/bin/bash
# create-worktree.sh

FEATURE_NAME=$1
WORKTREE_PATH="../fn-$FEATURE_NAME"
BRANCH_NAME="feature/$FEATURE_NAME"

# Create worktree
git worktree add -b $BRANCH_NAME $WORKTREE_PATH

# Navigate to worktree
cd $WORKTREE_PATH

# Install dependencies
npm install

# Copy environment variables
cp ../flyingnimbustest/.env .

# Create initial commit
git add .
git commit -m "chore: initialize $FEATURE_NAME worktree"

echo "✅ Worktree ready at $WORKTREE_PATH"
```

### Worktree Status Dashboard
```bash
#!/bin/bash
# worktree-status.sh

echo "🌳 Git Worktree Status Dashboard"
echo "================================="

git worktree list | while read -r line; do
    WORKTREE_PATH=$(echo $line | awk '{print $1}')
    BRANCH=$(echo $line | awk '{print $3}' | tr -d '[]')
    
    echo ""
    echo "📁 $WORKTREE_PATH"
    echo "   Branch: $BRANCH"
    
    cd $WORKTREE_PATH 2>/dev/null && {
        STATUS=$(git status --porcelain | wc -l)
        AHEAD=$(git rev-list --count @{u}..HEAD 2>/dev/null || echo "0")
        BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null || echo "0")
        
        echo "   Changes: $STATUS files"
        echo "   Ahead: $AHEAD commits | Behind: $BEHIND commits"
        
        # Check if tests pass
        if npm test --silent 2>/dev/null; then
            echo "   Tests: ✅ Passing"
        else
            echo "   Tests: ❌ Failing"
        fi
    }
done
```

## 🚀 Integration with AI Agents

### Agent Worktree Assignment
```typescript
// .claude/worktree-config.json
{
  "worktrees": {
    "main": {
      "path": "~/flyingnimbustest",
      "agent": "orchestrator",
      "purpose": "Integration and coordination"
    },
    "backend": {
      "path": "../fn-backend",
      "agent": "backend-api",
      "purpose": "API development"
    },
    "frontend": {
      "path": "../fn-frontend",
      "agent": "frontend-web",
      "purpose": "UI development"
    },
    "mobile": {
      "path": "../fn-mobile",
      "agent": "mobile-developer",
      "purpose": "Mobile app development"
    }
  }
}
```

### AI Agent Context for Worktrees
```markdown
# Worktree Context for AI Agents

## Current Worktree
You are working in: `fn-backend` (feature/api-endpoints)

## Related Worktrees
- Main integration: `~/flyingnimbustest` (main)
- Frontend work: `../fn-frontend` (feature/ui-components)
- Mobile work: `../fn-mobile` (feature/mobile-app)

## Your Focus
Develop backend APIs without worrying about frontend or mobile implementation.
Other agents are handling those in parallel worktrees.

## Integration Points
- API contracts should be documented in `docs/api/`
- Shared types go in `shared/types/`
- Integration tests will run in main worktree
```

## 💡 Best Practices

### DO's ✅
- **Create worktree** for any feature taking > 1 day
- **Use descriptive names** for worktree directories
- **Keep worktrees synchronized** with regular pulls
- **Clean up worktrees** after merging
- **Document active worktrees** in README

### DON'Ts ❌
- **Don't forget** uncommitted changes when removing
- **Don't create** too many worktrees (< 10 active)
- **Don't share** node_modules between worktrees
- **Don't mix** environment configs between worktrees
- **Don't leave** stale worktrees (use `git worktree prune`)

## 📊 Worktree Performance Tips

### Disk Space Management
```bash
# Check worktree disk usage
du -sh ../fn-* | sort -h

# Share git objects to save space
git worktree add --no-checkout ../fn-feature feature-branch
cd ../fn-feature
git sparse-checkout init --cone
git sparse-checkout set src tests
```

### Speed Optimizations
```bash
# Use local tracking branches
git worktree add ../fn-feature origin/feature-branch

# Shallow clone for experiments
git worktree add --depth=1 ../fn-experiment experimental-branch
```

## 🔄 Worktree Merge Strategy

### Progressive Integration
```bash
# 1. Feature worktrees merge to develop
cd ../fn-feature-1
git push origin feature-1
gh pr create --base develop

# 2. Develop worktree integrates all features
cd ../fn-develop
git pull origin develop
npm test

# 3. Develop merges to main
gh pr create --base main --head develop

# 4. Clean up merged worktrees
git worktree remove ../fn-feature-1
```

## 📚 Quick Reference

```bash
# Create worktree
git worktree add [-b new-branch] path [branch]

# List worktrees
git worktree list [--verbose]

# Remove worktree
git worktree remove [-f] path

# Clean up
git worktree prune [-n] [-v]

# Lock worktree (prevent removal)
git worktree lock path

# Unlock worktree
git worktree unlock path

# Move worktree
git worktree move worktree new-path

# Repair worktree
git worktree repair [path...]
```

## 🎯 Worktree + Claude Code Workflow

```bash
# Setup parallel development
./setup-worktrees.sh

# Start multiple Claude sessions
tmux new-session -d -s backend 'cd ../fn-backend && claude'
tmux new-session -d -s frontend 'cd ../fn-frontend && claude'
tmux new-session -d -s mobile 'cd ../fn-mobile && claude'

# Monitor progress
tmux attach-session -t backend  # Check backend progress
tmux attach-session -t frontend # Check frontend progress

# Integrate in main
cd ~/flyingnimbustest
claude
> Use the orchestrator subagent to integrate all feature branches
```

---

**Remember**: Git Worktree enables true parallel development, perfectly complementing our multi-agent architecture. Each agent gets their own workspace without stepping on each other's toes!