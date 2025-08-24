// Modern Portfolio App - Inspired by 21st.dev React Components
class PortfolioApp {
    constructor() {
        this.currentArticleIndex = 0;
        this.currentProductIndex = 0;
        this.isTimelineExpanded = false;
        this.lastScrollY = 0;
        this.activeSection = 'about';
        this.currentTimelineFilter = 'work';
        this.isDarkMode = true;
        
        this.timelineData = [];
        this.articlesData = [];
        this.productsData = [];
        
        this.init();
    }
    
    async init() {
        await this.loadContent();
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeTimeline();
        this.initializeCarousels();
        this.initializeModal();
        this.initializeScrollEffects();
        this.initializeIcons();
        this.initializeCalendly();
        this.createFloatingParticles();
        this.initializeParallax();
    }
    
    // Load content from various sources
    async loadContent() {
        // Try to load from Firestore first
        if (window.contentManager) {
            try {
                this.articlesData = await contentManager.fetchArticles() || [];
                this.productsData = await contentManager.fetchProducts() || [];
            } catch (error) {
                console.log('Using local data fallback');
            }
        }
        
        // Fallback to local data
        this.articlesData = this.articlesData.length > 0 ? this.articlesData : (window.articlesData || []);
        this.productsData = this.productsData.length > 0 ? this.productsData : (window.productsData || []);
        this.timelineData = window.timelineData || [];
    }
    
    // Initialize Lucide icons
    initializeIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Initialize theme switching
    initializeTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.isDarkMode = savedTheme === 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon();
        
        themeToggle.addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            const newTheme = this.isDarkMode ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon();
        });
    }
    
    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', this.isDarkMode ? 'sun' : 'moon');
            setTimeout(() => this.initializeIcons(), 10);
        }
    }
    
    // Initialize floating navigation
    initializeNavigation() {
        const nav = document.getElementById('floating-nav');
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');
        
        // Set initial active nav
        this.updateActiveNav('about');
        
        // Navigation click handlers
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.dataset.section;
                this.scrollToSection(sectionId);
                this.updateActiveNav(sectionId);
            });
        });
        
        // Scroll-based nav following and active section detection
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Always show navigation (remove auto-hide)
                    // nav follows scroll smoothly
                    
                    // Update active section
                    let current = 'about'; // default
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 200 && rect.bottom >= 200) {
                            current = section.id;
                        }
                    });
                    
                    if (current && current !== this.activeSection) {
                        this.activeSection = current;
                        this.updateActiveNav(current);
                    }
                    
                    this.lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Hero action buttons
        const heroButtons = document.querySelectorAll('[data-scroll]');
        heroButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.dataset.scroll;
                this.scrollToSection(sectionId);
            });
        });
    }
    
    // Update active navigation item
    updateActiveNav(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll to section
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Initialize timeline functionality
    initializeTimeline() {
        const toggleBtn = document.getElementById('timeline-toggle');
        const timelineContent = document.getElementById('timeline-content');
        const toggleText = toggleBtn.querySelector('.toggle-text');
        const filterBtns = document.querySelectorAll('.filter-pill');
        
        // Timeline toggle
        toggleBtn.addEventListener('click', () => {
            this.isTimelineExpanded = !this.isTimelineExpanded;
            
            if (this.isTimelineExpanded) {
                timelineContent.classList.remove('hidden');
                timelineContent.classList.add('visible');
                toggleText.textContent = 'Hide My Journey';
                this.renderTimeline();
            } else {
                timelineContent.classList.remove('visible');
                timelineContent.classList.add('hidden');
                toggleText.textContent = 'Show My Journey';
            }
        });
        
        // Filter pills
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update filter and re-render if timeline is visible
                this.currentTimelineFilter = btn.dataset.filter;
                if (this.isTimelineExpanded) {
                    this.renderTimeline();
                }
            });
        });
    }
    
    // Render timeline items with filtering
    renderTimeline() {
        const container = document.getElementById('timeline-items');
        container.innerHTML = '';
        
        // Filter timeline data based on current filter
        const filteredData = this.timelineData.filter(item => {
            if (this.currentTimelineFilter === 'work') {
                return item.category.toLowerCase() === 'work' || item.category.toLowerCase() === 'education';
            } else {
                return item.category.toLowerCase() === 'personal' || item.category.toLowerCase() === 'side-project';
            }
        });
        
        filteredData.forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            container.appendChild(timelineItem);
        });
        
        // Re-initialize icons for new elements
        setTimeout(() => this.initializeIcons(), 100);
    }
    
    // Create timeline item element
    createTimelineItem(data, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = `status-${data.status.replace('-', '')}`;
        
        item.innerHTML = `
            <div class="timeline-icon">
                <i data-lucide="${data.icon}"></i>
            </div>
            <div class="timeline-card" data-timeline-id="${data.id}">
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${data.title}</h3>
                        <div class="timeline-date">${data.date}</div>
                    </div>
                </div>
                ${data.company ? `<div class="timeline-company">${data.company} • ${data.location}</div>` : ''}
                <div class="timeline-description">${data.content}</div>
                <div class="timeline-meta">
                    <span class="status-badge ${statusClass}">
                        ${data.status.replace('-', ' ')}
                    </span>
                    <div class="energy-indicator">
                        <i data-lucide="zap"></i>
                        <span>${data.energy}% energy</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add click handler for modal
        const card = item.querySelector('.timeline-card');
        card.addEventListener('click', () => {
            this.showTimelineModal(data);
        });
        
        return item;
    }
    
    // Show timeline modal
    showTimelineModal(data) {
        const modalBody = document.getElementById('modal-body');
        const statusClass = `status-${data.status.replace('-', '')}`;
        
        modalBody.innerHTML = `
            <div class="timeline-modal">
                <div class="timeline-modal-header">
                    <div class="timeline-icon">
                        <i data-lucide="${data.icon}"></i>
                    </div>
                    <div>
                        <h2 class="timeline-title">${data.title}</h2>
                        <div class="timeline-date">${data.date}</div>
                    </div>
                </div>
                
                ${data.company ? `
                    <div class="timeline-company-info">
                        <p class="company-name">${data.company}</p>
                        <p class="company-location">
                            <i data-lucide="map-pin"></i>
                            ${data.location}
                        </p>
                    </div>
                ` : ''}
                
                <div class="timeline-description">${data.content}</div>
                
                ${data.details ? `
                    <div class="timeline-details">
                        <h4>Key Achievements</h4>
                        <div class="details-content">${data.details.replace(/\\n/g, '<br>')}</div>
                    </div>
                ` : ''}
                
                <div class="timeline-meta">
                    <span class="status-badge ${statusClass}">
                        ${data.status.replace('-', ' ')}
                    </span>
                    <div class="energy-indicator">
                        <i data-lucide="zap"></i>
                        <span>${data.energy}% energy level</span>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal();
        setTimeout(() => this.initializeIcons(), 100);
    }
    
    // Initialize carousels
    initializeCarousels() {
        this.initializeArticleCarousel();
        this.initializeProductCarousel();
    }
    
    // Initialize article carousel
    initializeArticleCarousel() {
        const prevBtn = document.getElementById('articles-prev');
        const nextBtn = document.getElementById('articles-next');
        const carousel = document.getElementById('articles-carousel');
        
        prevBtn.addEventListener('click', () => this.navigateArticles(-1));
        nextBtn.addEventListener('click', () => this.navigateArticles(1));
        
        this.renderArticles();
    }
    
    // Initialize product carousel
    initializeProductCarousel() {
        const prevBtn = document.getElementById('products-prev');
        const nextBtn = document.getElementById('products-next');
        const carousel = document.getElementById('products-carousel');
        
        prevBtn.addEventListener('click', () => this.navigateProducts(-1));
        nextBtn.addEventListener('click', () => this.navigateProducts(1));
        
        this.renderProducts();
    }
    
    // Navigate articles carousel
    navigateArticles(direction) {
        const maxIndex = Math.max(0, this.articlesData.length - 3);
        this.currentArticleIndex = Math.max(0, Math.min(this.currentArticleIndex + direction, maxIndex));
        this.renderArticles();
        this.updateCarouselButtons('articles');
    }
    
    // Navigate products carousel
    navigateProducts(direction) {
        const maxIndex = Math.max(0, this.productsData.length - 3);
        this.currentProductIndex = Math.max(0, Math.min(this.currentProductIndex + direction, maxIndex));
        this.renderProducts();
        this.updateCarouselButtons('products');
    }
    
    // Update carousel button states
    updateCarouselButtons(type) {
        const prevBtn = document.getElementById(`${type}-prev`);
        const nextBtn = document.getElementById(`${type}-next`);
        const currentIndex = type === 'articles' ? this.currentArticleIndex : this.currentProductIndex;
        const maxIndex = type === 'articles' ? 
            Math.max(0, this.articlesData.length - 3) : 
            Math.max(0, this.productsData.length - 3);
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    // Render articles
    renderArticles() {
        const carousel = document.getElementById('articles-carousel');
        const visibleArticles = this.articlesData.slice(this.currentArticleIndex, this.currentArticleIndex + 3);
        
        carousel.innerHTML = '';
        
        visibleArticles.forEach((article, index) => {
            const card = this.createArticleCard(article, index);
            carousel.appendChild(card);
        });
        
        this.updateCarouselButtons('articles');
        setTimeout(() => this.initializeIcons(), 100);
    }
    
    // Render products
    renderProducts() {
        const carousel = document.getElementById('products-carousel');
        const visibleProducts = this.productsData.slice(this.currentProductIndex, this.currentProductIndex + 3);
        
        carousel.innerHTML = '';
        
        visibleProducts.forEach((product, index) => {
            const card = this.createProductCard(product, index);
            carousel.appendChild(card);
        });
        
        this.updateCarouselButtons('products');
        setTimeout(() => this.initializeIcons(), 100);
    }
    
    // Create article card
    createArticleCard(article, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const readTime = Math.ceil((article.fullContent || article.content || '').split(' ').length / 200);
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}" 
                     alt="${article.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="card-category">${article.category}</span>
                    <span class="card-read-time">${readTime} min read</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description || article.excerpt}</p>
                <div class="card-footer">
                    <span class="card-date">${article.date}</span>
                    <i data-lucide="external-link" class="card-link-icon"></i>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => this.showArticleModal(article));
        
        return card;
    }
    
    // Create product card
    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const statusColors = {
            live: 'status-completed',
            development: 'status-in-progress',
            concept: 'status-pending'
        };
        
        const visibleTech = product.technologies.slice(0, 3);
        const remainingTech = product.technologies.length - 3;
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}" 
                     alt="${product.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="card-category ${statusColors[product.status]}">${product.status}</span>
                </div>
                <h3 class="card-title">${product.title}</h3>
                <p class="card-description">${product.description}</p>
                <div class="product-technologies">
                    ${visibleTech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    ${remainingTech > 0 ? `<span class="tech-tag">+${remainingTech} more</span>` : ''}
                </div>
                <div class="card-footer">
                    <span class="card-date">${product.status}</span>
                    <i data-lucide="external-link" class="card-link-icon"></i>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => this.showProductModal(product));
        
        return card;
    }
    
    // Show article modal
    showArticleModal(article) {
        const modalBody = document.getElementById('modal-body');
        const readTime = Math.ceil((article.fullContent || article.content || '').split(' ').length / 200);
        
        modalBody.innerHTML = `
            <div class="article-modal">
                <div class="card-image">
                    <img src="${article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}" 
                         alt="${article.title}">
                </div>
                
                <div class="card-meta" style="margin: 1.5rem 0;">
                    <span class="card-category">${article.category}</span>
                    <span class="card-read-time">${readTime} min read</span>
                    <span class="card-date">${article.date}</span>
                </div>
                
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">${article.title}</h1>
                <p style="font-size: 1.25rem; color: rgba(255,255,255,0.8); margin-bottom: 2rem;">
                    ${article.description || article.excerpt}
                </p>
                
                <div class="article-content" style="line-height: 1.8; color: rgba(255,255,255,0.7);">
                    ${(article.fullContent || article.content || 'Full content coming soon...').replace(/\\n/g, '<br><br>')}
                </div>
            </div>
        `;
        
        this.showModal();
    }
    
    // Show product modal
    showProductModal(product) {
        const modalBody = document.getElementById('modal-body');
        
        const statusColors = {
            live: 'status-completed',
            development: 'status-in-progress', 
            concept: 'status-pending'
        };
        
        modalBody.innerHTML = `
            <div class="product-modal">
                <div class="card-image">
                    <img src="${product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}" 
                         alt="${product.title}">
                </div>
                
                <div class="product-modal-header" style="margin: 1.5rem 0;">
                    <span class="card-category ${statusColors[product.status]}">${product.status}</span>
                    ${product.link ? `
                        <a href="${product.link}" target="_blank" rel="noopener noreferrer" 
                           class="btn-primary" style="margin-left: 1rem;">
                            <i data-lucide="external-link"></i>
                            View Live
                        </a>
                    ` : ''}
                    ${product.github ? `
                        <a href="${product.github}" target="_blank" rel="noopener noreferrer" 
                           class="btn-secondary" style="margin-left: 1rem;">
                            <i data-lucide="github"></i>
                            GitHub
                        </a>
                    ` : ''}
                </div>
                
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">${product.title}</h1>
                <p style="font-size: 1.25rem; color: rgba(255,255,255,0.8); margin-bottom: 2rem;">
                    ${product.description}
                </p>
                
                <div class="technologies-section">
                    <h3 style="margin-bottom: 1rem;">Technologies Used</h3>
                    <div class="product-technologies">
                        ${product.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                ${product.fullContent ? `
                    <div class="product-content" style="margin-top: 2rem; line-height: 1.8; color: rgba(255,255,255,0.7);">
                        ${product.fullContent.replace(/\\n/g, '<br><br>')}
                    </div>
                ` : ''}
            </div>
        `;
        
        this.showModal();
        setTimeout(() => this.initializeIcons(), 100);
    }
    
    // Initialize modal functionality
    initializeModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        
        modalClose.addEventListener('click', () => this.hideModal());
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.hideModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
                this.hideModal();
            }
        });
    }
    
    // Show modal
    showModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Hide modal
    hideModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Initialize scroll effects and animations
    initializeScrollEffects() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.feature-card, .timeline-item, .card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize Calendly integration
    initializeCalendly() {
        const calendlyBtn = document.getElementById('calendly-btn');
        
        if (calendlyBtn) {
            calendlyBtn.addEventListener('click', () => {
                if (typeof Calendly !== 'undefined') {
                    Calendly.initPopupWidget({url: 'https://calendly.com/lumambo/30min'});
                } else {
                    window.open('https://calendly.com/lumambo/30min', '_blank');
                }
            });
        }
    }
    
    // Create floating particles effect
    createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        if (particlesContainer) {
            // Create additional particles dynamically
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.background = 'rgba(255, 255, 255, 0.2)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${3 + Math.random() * 4}s infinite linear`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    // Initialize parallax effect for hero background
    initializeParallax() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        const parallaxSpeed = 0.5;
                        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }
}

// Timeline data with work and personal categories
window.timelineData = [
    {
        id: 1,
        title: "Senior Product Manager",
        date: "2023 - Present",
        content: "Leading product strategy for AI-powered analytics platform. Increased user engagement by 150% and reduced churn by 30%.",
        category: "Work",
        icon: "briefcase",
        status: "in-progress",
        energy: 95,
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        details: "Key achievements:\\n• Increased user engagement by 150%\\n• Reduced churn by 30%\\n• Led cross-functional team of 12+ members\\n• Launched 3 major product features"
    },
    {
        id: 2,
        title: "Product Manager",
        date: "2021 - 2023",
        content: "Managed cross-functional teams to deliver mobile-first experiences. Launched 3 major features that drove $2M ARR.",
        category: "Work",
        icon: "rocket",
        status: "completed",
        energy: 90,
        company: "StartupXYZ",
        location: "New York, NY",
        details: "Key achievements:\\n• Launched 3 major features driving $2M ARR\\n• Built mobile-first product strategy\\n• Managed team of 8 engineers and designers\\n• Improved user retention by 40%"
    },
    {
        id: 3,
        title: "MBA in Technology Management",
        date: "2019 - 2021",
        content: "Focused on product strategy, data analytics, and innovation management. Graduated Magna Cum Laude.",
        category: "Education",
        icon: "graduation-cap",
        status: "completed",
        energy: 85,
        company: "Stanford University",
        location: "Stanford, CA",
        details: "Coursework highlights:\\n• Product Strategy & Innovation\\n• Data Analytics & Machine Learning\\n• Technology Entrepreneurship\\n• Organizational Behavior"
    },
    {
        id: 4,
        title: "Associate Product Manager",
        date: "2018 - 2019",
        content: "Started my product journey working on user onboarding flows and feature optimization.",
        category: "Work",
        icon: "user",
        status: "completed",
        energy: 75,
        company: "BigTech Corp",
        location: "Seattle, WA",
        details: "Learning highlights:\\n• Designed user onboarding flows\\n• A/B tested feature improvements\\n• Collaborated with UX and engineering\\n• Built product analytics dashboards"
    },
    {
        id: 5,
        title: "Travel Photography Project",
        date: "2022 - 2024",
        content: "Documented cultures and landscapes across 15 countries. Built a community of 10K+ followers sharing authentic travel stories.",
        category: "Personal",
        icon: "camera",
        status: "in-progress",
        energy: 80,
        details: "Project highlights:\\n• Visited 15 countries across 4 continents\\n• Built Instagram community of 10K+ followers\\n• Exhibited work in 3 local galleries\\n• Self-published photography book"
    },
    {
        id: 6,
        title: "Marathon Running",
        date: "2020 - Present",
        content: "Completed 3 marathons including Boston Marathon. Raised $5K for mental health awareness through running campaigns.",
        category: "Personal",
        icon: "activity",
        status: "in-progress",
        energy: 85,
        details: "Running achievements:\\n• Completed Boston Marathon (3:15 finish)\\n• Raised $5K for mental health awareness\\n• Trained 50+ new runners through local club\\n• Personal best: 3:12 marathon time"
    },
    {
        id: 7,
        title: "AI Writing Assistant Side Project",
        date: "2023 - Present",
        content: "Building an AI-powered writing assistant for product managers. Currently in beta with 100+ active users.",
        category: "Personal",
        icon: "code",
        status: "in-progress",
        energy: 90,
        details: "Project progress:\\n• Built MVP in 3 months\\n• 100+ beta users providing feedback\\n• Integrates with Notion, Slack, and Google Docs\\n• Planning Series A funding round"
    }
];

// Enhanced data for articles and products
window.articlesData = [
    {
        id: 1,
        title: "The Future of Product Management in AI Era",
        excerpt: "How artificial intelligence is reshaping the role of product managers and what skills you need to stay relevant.",
        description: "How artificial intelligence is reshaping the role of product managers and what skills you need to stay relevant.",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "Product Strategy",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        fullContent: "Artificial intelligence is fundamentally changing how we approach product management. From automated user research to predictive analytics, PMs need to adapt their skillset to leverage these powerful tools effectively.\\n\\nThe role of a product manager in the AI era requires a deeper understanding of data science concepts, machine learning capabilities, and ethical AI considerations. This article explores the key skills and mindset shifts necessary for modern product managers.\\n\\nKey areas of focus include:\\n\\n1. Understanding AI capabilities and limitations\\n2. Building ethical AI products\\n3. Leveraging data for better decision making\\n4. Managing AI-human collaboration\\n\\nThe future belongs to product managers who can bridge the gap between technical possibilities and user needs, ensuring AI serves humanity rather than replacing it."
    },
    {
        id: 2,
        title: "Building Data-Driven Product Teams",
        excerpt: "A comprehensive guide to establishing metrics-focused culture and making decisions based on user behavior data.",
        description: "A comprehensive guide to establishing metrics-focused culture and making decisions based on user behavior data.",
        date: "2024-01-08",
        readTime: "12 min read",
        category: "Analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        fullContent: "Data-driven decision making is no longer optional in product management. This article explores how to build a culture where data informs every product decision.\\n\\nEstablishing a data-driven culture starts with defining the right metrics and ensuring everyone on the team understands what success looks like. It's not just about collecting data, but about asking the right questions and interpreting results correctly.\\n\\nFramework for data-driven teams:\\n\\n1. Define clear success metrics\\n2. Implement robust tracking systems\\n3. Create regular review processes\\n4. Train team members on data interpretation\\n5. Balance quantitative and qualitative insights\\n\\nThe goal is to create a team that naturally turns to data when making decisions, while still maintaining empathy for users and understanding the broader business context."
    },
    {
        id: 3,
        title: "User Research in Remote-First World",
        excerpt: "Adapting user research methodologies for distributed teams and remote user testing scenarios.",
        description: "Adapting user research methodologies for distributed teams and remote user testing scenarios.",
        date: "2023-12-20",
        readTime: "6 min read",
        category: "User Research",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
        fullContent: "The shift to remote work has transformed how we conduct user research. Here are the tools and techniques that work best in a distributed environment.\\n\\nRemote user research presents unique challenges but also opens up new opportunities. We can now reach users who were previously geographically inaccessible, and conduct research more frequently with lower overhead.\\n\\nBest practices for remote research:\\n\\n1. Choose the right tools for each research method\\n2. Prepare participants more thoroughly\\n3. Design for asynchronous participation\\n4. Create inclusive research environments\\n5. Leverage technology for better insights\\n\\nThe key is to maintain the human connection that makes user research valuable while taking advantage of the flexibility and reach that remote tools provide."
    },
    {
        id: 4,
        title: "Product Roadmap Prioritization Framework",
        excerpt: "A practical framework for prioritizing features using impact vs effort analysis and stakeholder alignment.",
        description: "A practical framework for prioritizing features using impact vs effort analysis and stakeholder alignment.",
        date: "2023-12-10",
        readTime: "10 min read",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        fullContent: "Effective prioritization is the cornerstone of successful product management. This framework helps you make tough decisions about what to build next.\\n\\nThe challenge of product roadmap prioritization lies in balancing multiple competing factors: user needs, business objectives, technical constraints, and resource availability. A systematic approach helps ensure decisions are made objectively and can be explained to stakeholders.\\n\\nThe RICE Framework expanded:\\n\\n1. Reach: How many users will be impacted?\\n2. Impact: How much will it improve their experience?\\n3. Confidence: How sure are we about our estimates?\\n4. Effort: How much work will it require?\\n5. Enablement: Does it unlock other opportunities?\\n\\nBy scoring each potential feature across these dimensions, product teams can make more informed decisions and maintain alignment across the organization."
    }
];

window.productsData = [
    {
        id: 1,
        title: "Analytics Dashboard Pro",
        description: "Real-time analytics platform with AI-powered insights and predictive modeling for SaaS businesses.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        technologies: ["React", "TypeScript", "Python", "TensorFlow", "PostgreSQL"],
        status: "live",
        link: "https://analytics-pro.example.com",
        github: "https://github.com/example/analytics-pro",
        fullContent: "A comprehensive analytics platform built for modern SaaS businesses. Features real-time data processing, AI-powered insights, and predictive modeling capabilities.\\n\\nKey features include:\\n\\n• Real-time dashboard with customizable widgets\\n• AI-powered anomaly detection\\n• Predictive analytics for user behavior\\n• Advanced segmentation and cohort analysis\\n• Export capabilities and API access\\n\\nBuilt with scalability in mind, the platform handles millions of events per day and provides sub-second query performance."
    },
    {
        id: 2,
        title: "User Feedback Aggregator",
        description: "Centralized platform for collecting, analyzing, and acting on user feedback from multiple channels.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
        technologies: ["Vue.js", "Node.js", "MongoDB", "Redis", "Docker"],
        status: "development",
        github: "https://github.com/example/feedback-aggregator",
        fullContent: "A unified platform that aggregates user feedback from multiple sources including support tickets, social media, app reviews, and direct user surveys.\\n\\nCore functionality:\\n\\n• Multi-channel feedback collection\\n• Sentiment analysis and categorization\\n• Automated priority scoring\\n• Integration with project management tools\\n• Feedback loop tracking and closure\\n\\nThe platform uses natural language processing to automatically categorize and prioritize feedback, helping product teams focus on the most impactful user needs."
    },
    {
        id: 3,
        title: "Product Roadmap Visualizer",
        description: "Interactive tool for creating, sharing, and collaborating on product roadmaps with stakeholders.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        technologies: ["Svelte", "FastAPI", "SQLite", "D3.js", "WebSockets"],
        status: "concept",
        fullContent: "An interactive roadmap visualization tool that helps product teams communicate strategy and progress to stakeholders.\\n\\nPlanned features:\\n\\n• Drag-and-drop roadmap builder\\n• Real-time collaboration\\n• Multiple view modes (timeline, kanban, gantt)\\n• Integration with development tools\\n• Stakeholder commenting and feedback\\n• Progress tracking and reporting\\n\\nThe tool aims to bridge the gap between high-level strategy and day-to-day execution, making roadmaps living documents rather than static presentations."
    },
    {
        id: 4,
        title: "A/B Testing Framework",
        description: "Lightweight framework for running and analyzing A/B tests with statistical significance calculations.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        technologies: ["React", "Express.js", "MySQL", "Chart.js", "AWS"],
        status: "live",
        link: "https://abtest-framework.example.com",
        fullContent: "A comprehensive A/B testing framework designed for product teams who want to make data-driven decisions without complex setup.\\n\\nKey capabilities:\\n\\n• Easy experiment setup and configuration\\n• Statistical significance calculations\\n• Real-time results monitoring\\n• Automatic traffic allocation\\n• Integration with analytics platforms\\n• Detailed reporting and analysis\\n\\nThe framework handles the complexity of proper statistical analysis while providing an intuitive interface for product managers and marketers to run experiments confidently."
    }
];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Calendly integration
function openCalendlyPopup() {
    if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({url: 'https://calendly.com/lumambo/30min'});
    } else {
        window.open('https://calendly.com/lumambo/30min', '_blank');
    }
}