# Wonjae Ra - Personal Portfolio Website

A modern, glassmorphism-styled personal portfolio website built with vanilla JavaScript, Firebase, and responsive design. Features a liquid glass UI, interactive timeline, content carousels, and CMS functionality.

## 🚀 Features

- **Glassmorphism UI**: Modern liquid glass design with smooth animations
- **Floating Pill Navigation**: Responsive navigation that highlights active sections
- **Interactive Timeline**: Toggleable career journey map with detailed modals
- **Content Carousels**: Article and product showcases with keyboard navigation
- **CMS Integration**: Firebase Firestore backend for easy content management
- **Port Management**: Smart port detection for multiple local projects
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Backend**: Firebase (Firestore, Hosting, Analytics)
- **Deployment**: Firebase Hosting with GitHub Actions CI/CD
- **Development**: Express.js local server with port management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1JR4/flyingnimbustest-demo.git
   cd flyingnimbustest-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The server will automatically find an available port (5000-5010) and display:
   ```
   🚀 Server started successfully!
   ╔════════════════════════════════════════╗
   ║   Local:    http://localhost:5000     ║
   ╚════════════════════════════════════════╝
   ```

## 🔧 Development

### Local Development
- `npm run dev` - Start development server with port management
- `npm run build` - Prepare static files for deployment
- `npm start` - Alternative command to start server

### Content Management
- Visit `/admin.html` for the content management interface
- Add, edit, and delete articles and products
- Content syncs with Firebase Firestore

### Port Management
The development server includes smart port management:
- Automatically detects available ports in range 5000-5010
- Prevents conflicts with other projects
- Displays current port usage in console

## 🚀 Deployment

### Firebase Hosting
1. **Setup Firebase**
   ```bash
   firebase init hosting firestore
   ```

2. **Deploy to staging**
   ```bash
   npm run deploy:staging
   ```

3. **Deploy to production**
   ```bash
   npm run deploy:production
   ```

### GitHub Actions CI/CD
The project includes automated deployment:
- **Pull Requests**: Deploy to Firebase preview channels
- **Main Branch**: Deploy to production automatically
- **Rollback**: Use `npm run deploy:rollback` if needed

## 📁 Project Structure

```
├── out/                    # Built website files
│   ├── index.html         # Main website
│   ├── admin.html         # Content management interface
│   ├── styles.css         # Glassmorphism styles
│   ├── app.js             # Main application logic
│   ├── admin.js           # Admin interface logic
│   ├── data.js            # Content data
│   └── firebase-config.js # Firebase configuration
├── .github/workflows/     # CI/CD configuration
├── firebase.json          # Firebase hosting config
├── firestore.rules        # Database security rules
├── server.js              # Development server
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Content
- Edit content in `out/data.js` or use the admin interface
- Update personal information in timeline data
- Modify articles and products through Firestore

### Styling
- Glassmorphism variables in `styles.css` `:root`
- Color scheme, glass effects, and animations
- Responsive breakpoints and layouts

### Firebase Configuration
- Update `out/firebase-config.js` with your project details
- Configure Firestore rules in `firestore.rules`
- Set up authentication if needed

## 🔒 Security

- Firestore rules allow public read access to content
- Write access requires authentication
- No sensitive data exposed in client-side code
- CORS headers configured for local development

## 📊 Performance

- Lazy loading for images
- Efficient carousel rendering
- Minimal JavaScript bundle
- Optimized CSS animations
- CDN delivery through Firebase

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly navigation
- Optimized carousel interactions
- Accessible on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Wonjae Ra**
- Email: rawonjae94@gmail.com
- LinkedIn: [linkedin.com/in/wonjaera](https://linkedin.com/in/wonjaera)
- GitHub: [github.com/1JR4](https://github.com/1JR4)

---

Built with ❤️ using modern web technologies and Firebase.