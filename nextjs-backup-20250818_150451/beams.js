// 21st.dev Beams Background Implementation
class BeamsBackground {
    constructor(canvasId = 'beams-canvas') {
        this.canvas = document.getElementById(canvasId) || document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.beams = [];
        this.animationId = null;
        
        this.colors = [
            '#3b82f6', // blue
            '#8b5cf6', // purple
            '#ec4899', // pink
            '#06d6a0', // cyan
        ];
        
        this.init();
    }
    
    init() {
        this.canvas.id = 'beams-canvas';
        this.canvas.className = 'absolute inset-0 pointer-events-none';
        
        this.setupCanvas();
        this.createBeams();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        const rect = this.canvas.parentElement?.getBoundingClientRect() || {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createBeams() {
        this.beams = [];
        const beamCount = Math.floor(this.width / 100) + 3; // Responsive beam count
        
        for (let i = 0; i < beamCount; i++) {
            this.beams.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                height: this.height * (0.3 + Math.random() * 0.7),
                width: 2 + Math.random() * 4,
                speed: 0.5 + Math.random() * 1.5,
                opacity: 0.1 + Math.random() * 0.3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.beams.forEach(beam => {
            // Update beam position
            beam.y -= beam.speed;
            
            // Reset beam when it goes off screen
            if (beam.y < -beam.height) {
                beam.y = this.height + beam.height;
                beam.x = Math.random() * this.width;
            }
            
            // Update pulsing opacity
            beam.pulsePhase += beam.pulseSpeed;
            const pulseOpacity = beam.opacity + Math.sin(beam.pulsePhase) * 0.1;
            
            // Create gradient for beam
            const gradient = this.ctx.createLinearGradient(
                beam.x, 
                beam.y, 
                beam.x, 
                beam.y + beam.height
            );
            
            const color = this.hexToRgb(beam.color);
            gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
            gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseOpacity})`);
            gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseOpacity * 0.8})`);
            gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
            
            // Draw beam with glow effect
            this.ctx.save();
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = beam.color;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(beam.x - beam.width/2, beam.y, beam.width, beam.height);
            this.ctx.restore();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 59, g: 130, b: 246};
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize beams background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create canvas and add to bg-pattern
    const bgPattern = document.querySelector('.bg-pattern');
    if (bgPattern) {
        const canvas = document.createElement('canvas');
        canvas.id = 'beams-canvas';
        canvas.className = 'absolute inset-0 pointer-events-none';
        bgPattern.appendChild(canvas);
        
        // Initialize beams
        window.beamsBackground = new BeamsBackground('beams-canvas');
    }
});