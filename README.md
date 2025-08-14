# Product Manager Portfolio Website

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. This website showcases your product management journey, projects, blog posts, and skills in a beautiful, interactive design.

## ✨ Features

- **Modern Design**: Beautiful gradient backgrounds, glass morphism effects, and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, hover effects, and animated components
- **Portfolio Sections**: Hero, About, Projects, Blog, and Contact sections
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Dark Theme**: Elegant dark theme with purple and pink accent colors

## 🚀 Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- npm 10.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd freshpaper-2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- **Next.js 15** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # React components
│   ├── ui/             # UI components
│   │   └── button.tsx  # Button component
│   └── PortfolioWebsite.tsx  # Main portfolio component
├── lib/                 # Utility functions
│   └── utils.ts        # Helper functions
└── styles/              # Global styles
    └── globals.css     # CSS variables and custom styles
```

## 🎨 Customization

### Personal Information

Update the following in `src/components/PortfolioWebsite.tsx`:

- **Name**: Change "Your Name" to your actual name
- **Projects**: Update the `projects` array with your real projects
- **Blog Posts**: Modify the `blogPosts` array with your blog content
- **Skills**: Update the `skills` array with your expertise levels
- **Social Links**: Update LinkedIn, Twitter, and GitHub URLs

### Styling

- **Colors**: Modify the gradient colors in the CSS variables
- **Fonts**: Change fonts in the Tailwind config
- **Layout**: Adjust spacing and sizing in the component classes

### Content

- **Hero Section**: Update the main headline and description
- **About Section**: Modify your personal story and statistics
- **Projects**: Add your real projects with images and links
- **Blog**: Include your actual blog posts and articles

## 🚀 Deployment

### Firebase Hosting

This project is configured for Firebase hosting. Deploy with:

```bash
# Build the project
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

### Other Platforms

You can deploy to any platform that supports Next.js:

- **Vercel**: Automatic deployment from Git
- **Netlify**: Build and deploy from the `out` directory
- **AWS Amplify**: Connect your repository for automatic builds

## 📱 Responsive Design

The website is fully responsive and includes:

- Mobile-first design approach
- Responsive navigation menu
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized typography for all screen sizes

## 🎭 Animations

Smooth animations powered by Framer Motion:

- Scroll-triggered animations
- Hover effects on interactive elements
- Smooth page transitions
- Floating elements in the hero section
- Progressive reveal animations

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you have any questions or need help customizing the website, feel free to reach out!

---

Built with ❤️ using modern web technologies