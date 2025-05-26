// Typing Effect Module
export class TypingEffect {
    constructor() {
        this.typewriters = [];
    }

    startHeroTyping() {
        // Start typing effect for hero section
        const heroTitle = document.querySelector('.main-title');
        const heroSubtitle = document.querySelector('.subtitle');
        
        if (heroTitle) {
            this.typeText(heroTitle, 'JianXiaoli', 100, () => {
                if (heroSubtitle) {
                    this.typeText(heroSubtitle, 'Architectural_Engineer // Cyberpunk_Geek_Innovator', 50);
                }
            });
        }
    }

    typeText(element, text, speed = 100, callback = null) {
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-cyan)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    if (callback) callback();
                }, 1000);
            }
        }, speed);

        this.typewriters.push(typeInterval);
    }

    createTypewriter(element, texts, options = {}) {
        const {
            speed = 100,
            deleteSpeed = 50,
            pauseTime = 2000,
            loop = true,
            cursor = true
        } = options;

        if (cursor) {
            element.style.borderRight = '2px solid var(--accent-cyan)';
            element.style.animation = 'blink 1s infinite';
        }

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? deleteSpeed : speed;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex++;
                
                if (textIndex === texts.length) {
                    if (loop) {
                        textIndex = 0;
                    } else {
                        return;
                    }
                }
            }

            const timeout = setTimeout(type, typeSpeed);
            this.typewriters.push(timeout);
        };

        type();
    }

    addGlitchEffect(element, text) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const originalText = text;
        let glitchInterval;

        const glitch = () => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
        };

        // Start glitch effect
        glitchInterval = setInterval(glitch, 50);
        
        // Stop after 500ms and restore original text
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, 500);
    }

    createMatrixRain(container, options = {}) {
        const {
            characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
            fontSize = 14,
            speed = 50,
            density = 0.02
        } = options;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        container.appendChild(canvas);

        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#64FFDA';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                if (Math.random() < density) {
                    const text = characters[Math.floor(Math.random() * characters.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
        };

        const matrixInterval = setInterval(draw, speed);
        this.typewriters.push(matrixInterval);

        return {
            stop: () => {
                clearInterval(matrixInterval);
                container.removeChild(canvas);
            }
        };
    }

    stopAll() {
        this.typewriters.forEach(typewriter => {
            clearInterval(typewriter);
            clearTimeout(typewriter);
        });
        this.typewriters = [];
    }
} 