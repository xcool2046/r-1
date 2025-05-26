// Main JavaScript Module
import { ParticleSystem } from './modules/particles.js';
import { NavigationController } from './modules/navigation.js';
import { ProjectsLoader } from './modules/projects.js';
import { SkillsLoader } from './modules/skills.js';
import { EducationLoader } from './modules/education.js';
import { ContactForm } from './modules/contact.js';
import { AnimationController } from './modules/animations.js';
import { TypingEffect } from './modules/typing.js';
import { Utils } from './modules/utils.js';

class CyberpunkPortfolio {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Show loading indicator
            this.showLoadingIndicator();

            // Initialize core modules
            await this.initializeModules();

            // Setup event listeners
            this.setupEventListeners();

            // Start animations
            this.startAnimations();

            // Hide loading indicator
            this.hideLoadingIndicator();

            this.isInitialized = true;
            console.log('🚀 Cyberpunk Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize portfolio:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeModules() {
        // Initialize particle system
        this.modules.particles = new ParticleSystem();
        await this.modules.particles.init();

        // Initialize navigation
        this.modules.navigation = new NavigationController();
        this.modules.navigation.init();

        // Initialize content loaders
        this.modules.projects = new ProjectsLoader();
        this.modules.skills = new SkillsLoader();
        this.modules.education = new EducationLoader();

        // Initialize contact form
        this.modules.contact = new ContactForm();
        this.modules.contact.init();

        // Initialize animation controller
        this.modules.animations = new AnimationController();
        this.modules.animations.init();

        // Initialize typing effects
        this.modules.typing = new TypingEffect();

        // Load dynamic content
        await Promise.all([
            this.modules.projects.loadProjects(),
            this.modules.skills.loadSkills(),
            this.modules.education.loadEducation()
        ]);
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', Utils.debounce(this.handleResize.bind(this), 250));
        window.addEventListener('load', this.handleWindowLoad.bind(this));

        // Document events
        document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded.bind(this));
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Custom events
        document.addEventListener('sectionInView', this.handleSectionInView.bind(this));
        document.addEventListener('contactFormSubmit', this.handleContactFormSubmit.bind(this));
    }

    startAnimations() {
        // Start typing effects
        this.modules.typing.startHeroTyping();

        // Start scroll reveal animations
        this.modules.animations.startScrollReveal();

        // Start periodic animations
        this.startPeriodicAnimations();
    }

    startPeriodicAnimations() {
        // Update time display every second
        setInterval(() => {
            this.updateTimeDisplay();
        }, 1000);

        // Periodic glitch effects (very subtle)
        setInterval(() => {
            this.triggerRandomGlitch();
        }, 30000); // Every 30 seconds
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update navigation
        this.modules.navigation.updateActiveSection(scrollY);
        
        // Update scroll-based animations
        this.modules.animations.updateScrollAnimations(scrollY);
        
        // Update back to top button
        this.updateBackToTopButton(scrollY);
    }

    handleResize() {
        // Update particle system
        if (this.modules.particles) {
            this.modules.particles.handleResize();
        }

        // Update animations
        if (this.modules.animations) {
            this.modules.animations.handleResize();
        }
    }

    handleWindowLoad() {
        // Trigger final load animations
        document.body.classList.add('loaded');
        
        // Start hero animations
        this.modules.animations.startHeroAnimations();
    }

    handleDOMContentLoaded() {
        // Initialize year display
        this.updateYearDisplay();
        
        // Initialize time display
        this.updateTimeDisplay();
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.modules.animations.pauseAnimations();
        } else {
            // Resume animations when tab becomes visible
            this.modules.animations.resumeAnimations();
        }
    }

    handleSectionInView(event) {
        const { sectionId } = event.detail;
        console.log(`📍 Section in view: ${sectionId}`);
        
        // Trigger section-specific animations
        this.modules.animations.triggerSectionAnimations(sectionId);
    }

    handleContactFormSubmit(event) {
        const { success, message } = event.detail;
        
        if (success) {
            this.showNotification('Message sent successfully!', 'success');
        } else {
            this.showNotification(message || 'Failed to send message', 'error');
        }
    }

    updateTimeDisplay() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }

    updateYearDisplay() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    updateBackToTopButton(scrollY) {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }

    triggerRandomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch-target');
        if (glitchElements.length > 0) {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            randomElement.classList.add('animate-glitch');
            
            setTimeout(() => {
                randomElement.classList.remove('animate-glitch');
            }, 300);
        }
    }

    showLoadingIndicator() {
        const loadingHTML = `
            <div id="loading-indicator" class="loading-indicator">
                <div class="loading-content">
                    <div class="loading-text">
                        <span class="mono-text">// Initializing_System</span>
                        <span class="loading-dots"></span>
                    </div>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    }

    hideLoadingIndicator() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                loadingIndicator.remove();
            }, 500);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    handleInitializationError(error) {
        console.error('Initialization error:', error);
        
        // Show error message to user
        const errorHTML = `
            <div class="error-container">
                <h2>System Error</h2>
                <p>Failed to initialize the portfolio. Please refresh the page.</p>
                <button onclick="location.reload()">Reload</button>
            </div>
        `;
        
        document.body.innerHTML = errorHTML;
    }

    // Public API methods
    getModule(name) {
        return this.modules[name];
    }

    isReady() {
        return this.isInitialized;
    }
}

// Initialize the portfolio when DOM is ready
const portfolio = new CyberpunkPortfolio();

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => portfolio.init());
} else {
    portfolio.init();
}

// Make portfolio instance globally available for debugging
window.CyberpunkPortfolio = portfolio;

// Export for module usage
export default portfolio; 