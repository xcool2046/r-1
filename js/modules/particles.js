// Particle System Module
export class ParticleSystem {
    constructor() {
        this.container = null;
        this.isInitialized = false;
    }

    async init() {
        this.container = document.getElementById('particles-js');
        if (!this.container) {
            console.warn('Particles container not found');
            return;
        }

        // Check if particles.js library is loaded
        if (typeof particlesJS !== 'undefined') {
            this.initParticles();
        } else {
            console.warn('Particles.js library not loaded');
            // Fallback: create simple CSS animation
            this.createFallbackAnimation();
        }

        this.isInitialized = true;
    }

    initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#64FFDA'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#64FFDA',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    createFallbackAnimation() {
        // Create simple CSS-based particle effect
        this.container.innerHTML = `
            <div class="fallback-particles">
                ${Array.from({length: 20}, (_, i) => `
                    <div class="particle" style="
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation-delay: ${Math.random() * 5}s;
                        animation-duration: ${3 + Math.random() * 4}s;
                    "></div>
                `).join('')}
            </div>
        `;

        // Add CSS for fallback particles
        const style = document.createElement('style');
        style.textContent = `
            .fallback-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: #64FFDA;
                border-radius: 50%;
                opacity: 0.3;
                animation: float infinite ease-in-out;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-30px) translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    handleResize() {
        if (this.isInitialized && typeof pJSDom !== 'undefined' && pJSDom[0]) {
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isInitialized = false;
    }
} 