# Webhook Setup Instructions

## Firebase CI Token Setup

To complete the webhook automation, you need to set up a Firebase CI token:

1. **Generate Firebase Token**:
   ```bash
   firebase login:ci
   ```
   This will open your browser and generate a token.

2. **Add Token to GitHub Secrets**:
   - Go to your GitHub repository: https://github.com/1JR4/wjr-portfolio
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_TOKEN`
   - Value: Paste the token from step 1

## How the Webhook Works

The GitHub Actions workflow (`.github/workflows/deploy-on-content-change.yml`) automatically:

1. **Triggers** when changes are made to:
   - `contents/**` (any content files)
   - `portfolio-nextjs/src/**` (source code)
   - `portfolio-nextjs/public/**` (public assets)
   - Key configuration files

2. **Builds** the Next.js application with updated content
3. **Deploys** to both Firebase hosting targets:
   - flyingnimbustest.web.app
   - 1jae.com (via onepointjae target)

## CMS → Live Site Flow

After setting up the token:

1. **Use CMS**: Edit content at https://1jae.com/cms
2. **CMS Commits**: Changes are committed to GitHub repository
3. **Auto-Deploy**: GitHub Actions automatically builds and deploys
4. **Live Updates**: Changes appear on 1jae.com within 2-3 minutes

## Testing the Webhook

After adding the Firebase token:

1. Make a small change via the CMS
2. Check the Actions tab in GitHub to see the workflow running
3. Verify the change appears on the live site

## Backup Manual Process

If the webhook fails, you can always deploy manually:
```bash
cd portfolio-nextjs
npm run build
firebase deploy --only hosting
```