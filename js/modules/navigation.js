// Navigation Controller Module
export class NavigationController {
    constructor() {
        this.nav = null;
        this.navLinks = [];
        this.sections = [];
        this.currentSection = '';
        this.isScrolling = false;
    }

    init() {
        this.nav = document.getElementById('main-nav');
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        
        if (!this.nav) {
            console.warn('Navigation element not found');
            return;
        }

        this.setupEventListeners();
        this.setupBackToTop();
        this.updateActiveSection();
    }

    setupEventListeners() {
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                if (targetId) {
                    this.scrollToSection(targetId);
                }
            }
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                this.scrollToTop();
            });
        }
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        this.isScrolling = true;
        
        const navHeight = this.nav.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        this.smoothScrollTo(targetPosition, 1000, () => {
            this.isScrolling = false;
            this.updateActiveSection();
        });
    }

    scrollToTop() {
        this.isScrolling = true;
        this.smoothScrollTo(0, 1000, () => {
            this.isScrolling = false;
            this.updateActiveSection();
        });
    }

    smoothScrollTo(targetPosition, duration, callback) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
                if (callback) callback();
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    updateActiveSection(scrollY = window.pageYOffset) {
        if (this.isScrolling) return;

        const navHeight = this.nav ? this.nav.offsetHeight : 80;
        const offset = navHeight + 100;
        
        let activeSection = '';

        // Find the current section
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop - offset;
            
            if (scrollY >= sectionTop) {
                activeSection = section.id;
                break;
            }
        }

        // If we're at the very top, set to first section
        if (scrollY < 100 && this.sections.length > 0) {
            activeSection = this.sections[0].id;
        }

        // Update active nav link
        if (activeSection !== this.currentSection) {
            this.currentSection = activeSection;
            this.updateActiveNavLink(activeSection);
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('sectionInView', {
                detail: { sectionId: activeSection }
            }));
        }
    }

    updateActiveNavLink(activeSection) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        if (activeSection) {
            const activeLink = this.navLinks.find(link => 
                link.getAttribute('href') === `#${activeSection}`
            );
            
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Handle scroll events (called from main.js)
    handleScroll(scrollY) {
        this.updateActiveSection(scrollY);
        this.updateNavbarAppearance(scrollY);
    }

    updateNavbarAppearance(scrollY) {
        if (!this.nav) return;

        // Add/remove scrolled class for styling
        if (scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    // Public methods
    getCurrentSection() {
        return this.currentSection;
    }

    getSections() {
        return this.sections.map(section => ({
            id: section.id,
            title: section.querySelector('h2')?.textContent || section.id,
            element: section
        }));
    }

    navigateToSection(sectionId) {
        this.scrollToSection(sectionId);
    }
} 