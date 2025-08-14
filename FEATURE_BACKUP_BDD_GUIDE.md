# 🔄 Feature-Based Backup & BDD Testing Strategy

Incremental development with safety nets - "One feature, one backup, never lose progress"

## 🎯 Core Principle: 원큐엔 절대 안됩니다 (Never All at Once)

**NEVER** try to implement everything in one go. Our strategy:
1. **One Feature = One Backup Folder**
2. **BDD Testing > Unit Testing** for AI development
3. **Checkpoint Before Major Changes**
4. **Always Have a Rollback Path**

## 📁 Feature Backup Structure

### Directory Organization
```
project/
├── backups/
│   ├── 2025-08-07-auth-complete/      # Full backup after auth
│   ├── 2025-08-08-payments-added/     # After payments feature
│   ├── 2025-08-09-before-refactor/    # Before major refactor
│   └── 2025-08-10-mobile-integrated/  # After mobile integration
├── features/
│   ├── user-auth/                     # Current: User authentication
│   ├── payment-system/                # Next: Payment processing
│   └── chat-feature/                  # Future: Real-time chat
└── src/                                # Main development
```

### Backup Script
```bash
#!/bin/bash
# backup-feature.sh

FEATURE_NAME=$1
DATE=$(date +%Y-%m-%d-%H%M)
BACKUP_DIR="backups/${DATE}-${FEATURE_NAME}"

# Create backup with feature name and timestamp
echo "🔄 Creating backup: $BACKUP_DIR"

# Copy entire project except node_modules and .git
rsync -av --exclude='node_modules' \
          --exclude='.git' \
          --exclude='dist' \
          --exclude='backups' \
          . "$BACKUP_DIR/"

# Create backup metadata
cat > "$BACKUP_DIR/BACKUP_INFO.md" << EOF
# Backup Information

**Date**: $(date)
**Feature**: $FEATURE_NAME
**Branch**: $(git branch --show-current)
**Last Commit**: $(git log -1 --oneline)

## What's Included
- Complete source code
- Configuration files
- Documentation
- Tests

## How to Restore
\`\`\`bash
# Restore from this backup
cp -r backups/${DATE}-${FEATURE_NAME}/* .
npm install
npm test
\`\`\`

## Feature Status
- [ ] Implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Ready for integration
EOF

echo "✅ Backup created at: $BACKUP_DIR"
echo "📝 Metadata saved to: $BACKUP_DIR/BACKUP_INFO.md"
```

### Automated Backup Triggers
```javascript
// package.json
{
  "scripts": {
    "backup": "./scripts/backup-feature.sh",
    "backup:auth": "npm run backup auth-complete",
    "backup:payments": "npm run backup payments-complete",
    "backup:before-deploy": "npm run backup before-deploy",
    "backup:after-feature": "npm run backup feature-$(git branch --show-current)"
  }
}
```

## 🧪 BDD Over TDD for AI Development

### Why BDD Works Better with AI Agents

**TDD Problems with AI:**
- AI gets stuck on unit test implementation details
- Too many test changes during rapid prototyping
- AI over-engineers to satisfy every edge case
- Focus shifts from features to test coverage

**BDD Advantages:**
- Focus on user behavior, not implementation
- Tests survive refactoring better
- Natural language scenarios AI understands
- Integration tests catch real issues

### BDD Test Structure

#### Feature File (Gherkin)
```gherkin
# features/user-authentication.feature

Feature: User Authentication
  As a user
  I want to log into my account
  So that I can access my personal data

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" in the email field
    And I enter "SecurePass123!" in the password field
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see "Welcome back!" message

  Scenario: Failed login with invalid password
    When I enter "user@example.com" in the email field
    And I enter "WrongPassword" in the password field
    And I click the "Login" button
    Then I should see "Invalid credentials" error
    And I should remain on the login page

  Scenario: Password reset flow
    When I click "Forgot password?"
    And I enter "user@example.com" in the email field
    And I click "Send reset link"
    Then I should see "Check your email" message
```

#### Step Definitions (JavaScript/Playwright)
```javascript
// features/step-definitions/auth.steps.js
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the login page', async function() {
  await this.page.goto('/login');
});

When('I enter {string} in the email field', async function(email) {
  await this.page.fill('input[name="email"]', email);
});

When('I enter {string} in the password field', async function(password) {
  await this.page.fill('input[name="password"]', password);
});

When('I click the {string} button', async function(buttonText) {
  await this.page.click(`button:has-text("${buttonText}")`);
});

Then('I should be redirected to the dashboard', async function() {
  await expect(this.page).toHaveURL('/dashboard');
});

Then('I should see {string} message', async function(message) {
  await expect(this.page.locator(`text=${message}`)).toBeVisible();
});
```

### BDD Configuration
```javascript
// cucumber.config.js
module.exports = {
  default: {
    require: [
      'features/step-definitions/**/*.js',
      'features/support/**/*.js'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    parallel: 2
  }
};
```

## 🎯 Feature Development Workflow

### Step-by-Step Process

#### 1. Create Feature Worktree
```bash
# Create new worktree for feature
git worktree add -b feature/user-auth ../fn-user-auth

# Navigate to feature worktree
cd ../fn-user-auth
```

#### 2. Write BDD Scenarios First
```bash
# Create feature file
mkdir -p features
cat > features/user-auth.feature << 'EOF'
Feature: User Authentication
  # BDD scenarios here
EOF

# Ask AI to implement based on BDD
claude
> Use the backend-api subagent to implement the user authentication feature 
> based on the BDD scenarios in features/user-auth.feature
```

#### 3. Implement Feature
```javascript
// Implement incrementally, testing each scenario
// AI focuses on making scenarios pass, not unit test coverage
```

#### 4. Create Backup After Feature Complete
```bash
# Run tests
npm run test:bdd

# If all scenarios pass, create backup
npm run backup:auth

# Document what was accomplished
echo "## User Authentication
- JWT-based authentication
- Login/logout functionality  
- Password reset flow
- Session management
" >> backups/$(date +%Y-%m-%d)-auth-complete/FEATURE_NOTES.md
```

#### 5. Merge and Continue
```bash
# Push feature branch
git push origin feature/user-auth

# Create PR
gh pr create --title "feat: user authentication" \
             --body "Implements user auth with JWT"

# After merge, remove worktree
git worktree remove ../fn-user-auth
```

## 📋 AI Agent Prompts for BDD

### For Backend API Agent
```markdown
> Use the backend-api subagent to implement the API endpoints needed to make 
> these BDD scenarios pass: [paste feature file]
> 
> Focus on behavior, not unit test coverage. Make the integration tests pass.
```

### For Frontend Web Agent
```markdown
> Use the frontend-web subagent to create the UI components that satisfy
> these BDD scenarios: [paste feature file]
>
> Use Hotwire/Stimulus for interactivity. Test with Playwright.
```

### For Orchestrator Agent
```markdown
> Use the orchestrator subagent to coordinate the implementation of this feature
> across backend and frontend based on these BDD scenarios: [paste feature file]
>
> Create backups after each major milestone.
```

## 🔄 Recovery Strategy

### When Things Go Wrong

#### Quick Rollback
```bash
# List available backups
ls -la backups/

# Choose backup to restore
BACKUP="2025-08-08-before-refactor"

# Restore (keeping current as backup)
mv src src.failed
cp -r backups/$BACKUP/src .
npm install
npm test
```

#### Selective Recovery
```bash
# Restore only specific files
cp backups/$BACKUP/src/services/auth.js src/services/
cp backups/$BACKUP/src/routes/auth.js src/routes/
```

#### Git Integration
```bash
# Create git branch from backup
git checkout -b recovery/from-backup
cp -r backups/$BACKUP/* .
git add .
git commit -m "recovery: restore from $BACKUP"
```

## 🎨 BDD Test Examples

### E-commerce Checkout
```gherkin
Feature: Shopping Cart Checkout
  
  Scenario: Guest checkout with credit card
    Given I have items in my cart
    When I proceed to checkout as guest
    And I enter valid shipping information
    And I enter valid credit card details
    And I click "Place Order"
    Then I should see order confirmation
    And I should receive confirmation email
```

### Real-time Chat
```gherkin
Feature: Real-time Messaging
  
  Scenario: Send and receive messages
    Given I am in a chat room
    When I type "Hello everyone!" in the message field
    And I press Enter
    Then my message should appear in the chat
    And other users should see my message immediately
```

### File Upload
```gherkin
Feature: Document Upload
  
  Scenario: Upload PDF document
    Given I am on the documents page
    When I drag and drop "report.pdf" to the upload area
    Then I should see upload progress
    And the document should appear in my documents list
    When the upload completes
```

## 📊 Backup Best Practices

### When to Backup

#### ALWAYS Backup:
- ✅ After completing a feature
- ✅ Before major refactoring
- ✅ Before updating dependencies
- ✅ Before deployment
- ✅ When tests are all green

#### Quick Backup Command
```bash
# Alias for quick backups
alias qbackup='npm run backup:after-feature && git add . && git commit -m "checkpoint: $(date +%Y-%m-%d-%H%M)"'
```

### Backup Retention
```bash
# Clean old backups (keep last 10)
ls -t backups/ | tail -n +11 | xargs -I {} rm -rf backups/{}

# Archive old backups
tar -czf backups-archive-$(date +%Y-%m).tar.gz backups/
```

### Backup Documentation
```markdown
# backups/README.md

## Backup Log

| Date | Feature | Status | Notes |
|------|---------|--------|-------|
| 2025-08-07 | User Auth | ✅ Complete | JWT implementation |
| 2025-08-08 | Payments | ✅ Complete | Stripe integration |
| 2025-08-09 | Before Refactor | 🔄 Checkpoint | Refactoring database |
| 2025-08-10 | Mobile App | ✅ Complete | React Native setup |
```

## 💡 Tips for AI Development

### Incremental Prompts
```markdown
❌ BAD: "Build a complete e-commerce platform"

✅ GOOD: 
1. "Implement user registration with BDD tests"
2. "Add login functionality with remember me"
3. "Create password reset flow"
4. [Backup after each step]
```

### Focus on Behavior
```markdown
❌ BAD: "Write unit tests with 100% coverage"

✅ GOOD: "Write BDD tests for these user stories:
- User can register with email
- User can login with credentials
- User can reset forgotten password"
```

### Progressive Enhancement
```markdown
1. "Make it work" (basic functionality)
2. "Make it right" (refactor with backups)
3. "Make it fast" (optimize with benchmarks)
```

## 🚀 Integration with Templates

### Update Template Scripts
```bash
# Add to each template's package.json
{
  "scripts": {
    "backup": "./scripts/backup-feature.sh",
    "test:bdd": "cucumber-js",
    "test:unit": "jest",
    "test": "npm run test:bdd"
  }
}
```

### Template Structure Addition
```
templates/freshpaper-X/
├── backups/          # Feature backups
├── features/         # BDD test scenarios
│   ├── step-definitions/
│   └── support/
├── src/
└── scripts/
    └── backup-feature.sh
```

---

**Remember**: Small, tested, backed-up steps beat giant leaps. Every feature gets a backup, every backup gets a test, and BDD keeps us focused on what users actually need!