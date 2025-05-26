// Animation Controller Module
export class AnimationController {
    constructor() {
        this.observers = [];
        this.animationsPaused = false;
    }

    init() {
        this.setupScrollReveal();
        this.setupIntersectionObservers();
    }

    setupScrollReveal() {
        // Create intersection observer for scroll reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with scroll-reveal class
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

        this.observers.push(revealObserver);
    }

    setupIntersectionObservers() {
        // Observer for section animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerSectionAnimations(entry.target.id);
                }
            });
        }, {
            threshold: 0.3
        });

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        this.observers.push(sectionObserver);
    }

    startScrollReveal() {
        // Add CSS for scroll reveal animations
        const style = document.createElement('style');
        style.textContent = `
            .scroll-reveal {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease-in-out;
            }
            
            .scroll-reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .scroll-reveal-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s ease-in-out;
            }
            
            .scroll-reveal-left.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scroll-reveal-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.8s ease-in-out;
            }
            
            .scroll-reveal-right.revealed {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    startHeroAnimations() {
        // Trigger hero section animations
        const heroElements = document.querySelectorAll('#hero-console .console-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    triggerSectionAnimations(sectionId) {
        if (this.animationsPaused) return;

        switch (sectionId) {
            case 'skill-matrix':
                this.animateSkillBars();
                break;
            case 'projects-log':
                this.animateProjectCards();
                break;
            case 'contact-relay':
                this.animateContactForm();
                break;
        }
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-fill');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 100);
        });
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.log-entry-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in-up');
            }, index * 200);
        });
    }

    animateContactForm() {
        const formElements = document.querySelectorAll('.contact-form .form-group');
        formElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    updateScrollAnimations(scrollY) {
        // Update scroll-based animations
        const scrollPercentage = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
        
        // Update any scroll-based effects here
        this.updateParallaxElements(scrollPercentage);
    }

    updateParallaxElements(scrollPercentage) {
        // Simple parallax effect for background elements
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollPercentage * 100 * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    pauseAnimations() {
        this.animationsPaused = true;
        document.body.classList.add('animations-paused');
    }

    resumeAnimations() {
        this.animationsPaused = false;
        document.body.classList.remove('animations-paused');
    }

    handleResize() {
        // Handle resize events for animations
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Reinitialize observers
        setTimeout(() => {
            this.setupIntersectionObservers();
        }, 100);
    }

    destroy() {
        // Clean up observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
    }
} 