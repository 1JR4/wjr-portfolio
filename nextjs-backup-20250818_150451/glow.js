// 21st.dev Glowing Border Effects Implementation
class GlowEffect {
    constructor() {
        this.glowElements = new Map();
        this.init();
    }
    
    init() {
        this.initializeGlowElements();
        this.setupMouseTracking();
    }
    
    initializeGlowElements() {
        // Add glow to navigation
        this.addGlowToElement('.nav-container', {
            spread: 80,
            blur: 20,
            intensity: 0.3
        });
        
        // Add glow to cards
        document.querySelectorAll('.card, .feature-card, .timeline-card').forEach(el => {
            this.addGlowToElement(el, {
                spread: 60,
                blur: 15,
                intensity: 0.25
            });
        });
        
        // Add glow to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(el => {
            this.addGlowToElement(el, {
                spread: 50,
                blur: 12,
                intensity: 0.4
            });
        });
    }
    
    addGlowToElement(element, options = {}) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return;
        
        const config = {
            spread: options.spread || 60,
            blur: options.blur || 15,
            intensity: options.intensity || 0.3,
            colors: options.colors || ['#3b82f6', '#8b5cf6', '#ec4899', '#06d6a0']
        };
        
        // Create glow overlay
        const glowOverlay = document.createElement('div');
        glowOverlay.className = 'glow-overlay';\n        glowOverlay.style.cssText = `\n            position: absolute;\n            inset: -2px;\n            border-radius: inherit;\n            opacity: 0;\n            pointer-events: none;\n            transition: opacity 0.4s ease;\n            background: conic-gradient(\n                from 0deg,\n                ${config.colors[0]},\n                ${config.colors[1]},\n                ${config.colors[2]},\n                ${config.colors[3]},\n                ${config.colors[0]}\n            );\n            animation: glowRotate 4s linear infinite;\n        `;\n        \n        // Ensure parent has position relative\n        if (getComputedStyle(el).position === 'static') {\n            el.style.position = 'relative';\n        }\n        el.style.overflow = 'hidden';\n        \n        // Insert at beginning so it's behind content\n        el.insertBefore(glowOverlay, el.firstChild);\n        \n        // Store reference\n        this.glowElements.set(el, {\n            overlay: glowOverlay,\n            config: config\n        });\n        \n        // Add mouse event listeners\n        el.addEventListener('mouseenter', () => this.activateGlow(el));\n        el.addEventListener('mouseleave', () => this.deactivateGlow(el));\n        el.addEventListener('mousemove', (e) => this.updateGlowPosition(el, e));\n    }\n    \n    activateGlow(element) {\n        const glowData = this.glowElements.get(element);\n        if (glowData) {\n            glowData.overlay.style.opacity = glowData.config.intensity;\n        }\n    }\n    \n    deactivateGlow(element) {\n        const glowData = this.glowElements.get(element);\n        if (glowData) {\n            glowData.overlay.style.opacity = '0';\n        }\n    }\n    \n    updateGlowPosition(element, event) {\n        const glowData = this.glowElements.get(element);\n        if (!glowData) return;\n        \n        const rect = element.getBoundingClientRect();\n        const x = event.clientX - rect.left;\n        const y = event.clientY - rect.top;\n        \n        // Calculate angle from center to mouse position\n        const centerX = rect.width / 2;\n        const centerY = rect.height / 2;\n        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;\n        \n        // Update gradient rotation based on mouse position\n        glowData.overlay.style.background = `conic-gradient(\n            from ${angle}deg,\n            ${glowData.config.colors[0]},\n            ${glowData.config.colors[1]},\n            ${glowData.config.colors[2]},\n            ${glowData.config.colors[3]},\n            ${glowData.config.colors[0]}\n        )`;\n    }\n    \n    setupMouseTracking() {\n        // Add global mouse tracking for enhanced effects\n        document.addEventListener('mousemove', (e) => {\n            // Update CSS custom property for global mouse position\n            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);\n            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);\n        });\n    }\n    \n    // Refresh glow elements (useful after DOM changes)\n    refresh() {\n        this.glowElements.clear();\n        this.initializeGlowElements();\n    }\n}\n\n// Add CSS keyframes for glow rotation\nconst glowStyles = document.createElement('style');\nglowStyles.textContent = `\n    @keyframes glowRotate {\n        0% { transform: rotate(0deg); }\n        100% { transform: rotate(360deg); }\n    }\n    \n    .glow-overlay {\n        z-index: -1;\n        filter: blur(1px);\n    }\n    \n    /* Enhanced hover effects */\n    .nav-container:hover {\n        transform: translateY(-1px);\n    }\n    \n    .card:hover, .feature-card:hover, .timeline-card:hover {\n        transform: translateY(-4px);\n    }\n    \n    .btn-primary:hover, .btn-secondary:hover {\n        transform: translateY(-2px);\n    }\n`;\ndocument.head.appendChild(glowStyles);\n\n// Initialize when DOM is ready\ndocument.addEventListener('DOMContentLoaded', () => {\n    window.glowEffect = new GlowEffect();\n    \n    // Refresh glow effects after app initialization\n    setTimeout(() => {\n        if (window.glowEffect) {\n            window.glowEffect.refresh();\n        }\n    }, 1000);\n});