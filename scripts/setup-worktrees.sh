#!/bin/bash

# Git Worktree Setup for Parallel Development
# Creates multiple worktrees for different features

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌳 Git Worktree Setup for Parallel Development${NC}"
echo "============================================"

# Check if git repo
if [ ! -d .git ]; then
    echo -e "${RED}❌ Not a git repository. Initialize git first.${NC}"
    exit 1
fi

# Function to create worktree
create_worktree() {
    local FEATURE=$1
    local BRANCH=$2
    local PATH="../fn-${FEATURE}"
    
    echo -e "${BLUE}Creating worktree for ${FEATURE}...${NC}"
    
    # Check if worktree already exists
    if [ -d "$PATH" ]; then
        echo -e "${YELLOW}⚠️  Worktree ${PATH} already exists, skipping${NC}"
        return
    fi
    
    # Create worktree with new branch
    if git worktree add -b "feature/${BRANCH}" "$PATH" 2>/dev/null; then
        echo -e "${GREEN}✅ Created worktree: ${PATH}${NC}"
        
        # Copy environment files if they exist
        if [ -f .env ]; then
            cp .env "$PATH/"
            echo "   Copied .env file"
        fi
        
        if [ -f .env.local ]; then
            cp .env.local "$PATH/"
            echo "   Copied .env.local file"
        fi
        
        # Install dependencies
        echo "   Installing dependencies..."
        (cd "$PATH" && npm install --silent 2>/dev/null)
        echo -e "${GREEN}   Dependencies installed${NC}"
        
        # Create initial feature file for BDD
        mkdir -p "$PATH/features"
        cat > "$PATH/features/${FEATURE}.feature" << EOF
Feature: ${FEATURE}
  As a user
  I want to [describe what user wants]
  So that [describe the benefit]

  Scenario: [First scenario]
    Given [initial context]
    When [action taken]
    Then [expected outcome]
EOF
        echo "   Created BDD feature file"
        
    else
        echo -e "${RED}❌ Failed to create worktree ${PATH}${NC}"
    fi
}

# Default features to set up
echo ""
echo "Select setup option:"
echo "1) Standard development worktrees (backend, frontend, mobile)"
echo "2) Feature-specific worktrees (auth, payments, chat)"
echo "3) Custom worktree"
echo "4) Show existing worktrees"
echo "5) Clean up worktrees"

read -p "Enter option (1-5): " option

case $option in
    1)
        echo -e "${BLUE}Setting up standard development worktrees...${NC}"
        create_worktree "backend" "api-development"
        create_worktree "frontend" "ui-development"
        create_worktree "mobile" "mobile-app"
        create_worktree "database" "schema-updates"
        ;;
    
    2)
        echo -e "${BLUE}Setting up feature worktrees...${NC}"
        create_worktree "auth" "user-authentication"
        create_worktree "payments" "payment-integration"
        create_worktree "chat" "real-time-chat"
        create_worktree "search" "search-functionality"
        ;;
    
    3)
        read -p "Enter feature name (e.g., user-profiles): " feature_name
        read -p "Enter branch name (e.g., profiles): " branch_name
        create_worktree "$feature_name" "$branch_name"
        ;;
    
    4)
        echo -e "${BLUE}Existing worktrees:${NC}"
        git worktree list
        ;;
    
    5)
        echo -e "${YELLOW}Cleaning up worktrees...${NC}"
        git worktree prune
        echo -e "${GREEN}✅ Pruned stale worktrees${NC}"
        
        # Option to remove specific worktree
        echo ""
        git worktree list
        echo ""
        read -p "Enter worktree path to remove (or press Enter to skip): " worktree_path
        if [ -n "$worktree_path" ]; then
            if git worktree remove "$worktree_path"; then
                echo -e "${GREEN}✅ Removed worktree: $worktree_path${NC}"
            else
                echo -e "${RED}❌ Failed to remove worktree${NC}"
            fi
        fi
        ;;
    
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

# Show summary
echo ""
echo -e "${BLUE}📊 Worktree Summary:${NC}"
git worktree list

# Create worktree status script
cat > check-worktrees.sh << 'EOF'
#!/bin/bash
echo "🌳 Worktree Status"
echo "=================="
git worktree list | while read -r line; do
    WORKTREE_PATH=$(echo $line | awk '{print $1}')
    BRANCH=$(echo $line | awk '{print $3}' | tr -d '[]')
    
    echo ""
    echo "📁 $WORKTREE_PATH ($BRANCH)"
    
    if cd "$WORKTREE_PATH" 2>/dev/null; then
        # Check git status
        CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
        echo "   Changes: $CHANGES files"
        
        # Check if tests pass
        if [ -f package.json ] && grep -q '"test"' package.json; then
            if npm test --silent 2>/dev/null; then
                echo "   Tests: ✅ Passing"
            else
                echo "   Tests: ❌ Failing"
            fi
        fi
    fi
done
EOF

chmod +x check-worktrees.sh

echo ""
echo -e "${GREEN}✅ Worktree setup complete!${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "• Check status: ${BLUE}./check-worktrees.sh${NC}"
echo "• List worktrees: ${BLUE}git worktree list${NC}"
echo "• Remove worktree: ${BLUE}git worktree remove <path>${NC}"
echo "• Add worktree: ${BLUE}git worktree add -b <branch> <path>${NC}"
echo ""
echo -e "${YELLOW}Start development:${NC}"
echo "• Backend: ${BLUE}cd ../fn-backend && claude${NC}"
echo "• Frontend: ${BLUE}cd ../fn-frontend && claude${NC}"
echo "• Mobile: ${BLUE}cd ../fn-mobile && claude${NC}"