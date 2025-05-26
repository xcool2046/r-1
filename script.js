// 简小历个人网站 - JavaScript交互功能

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initParticles();
    initScrollAnimations();
    initNavigation();
    initModals();
    initMobileMenu();
    setCurrentYear();
    initSmoothScroll();
    initIntersectionObserver();
});

// 粒子背景初始化
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00BFFF'
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
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00BFFF',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
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
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新活动导航链接
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 初始调用
}

// 移动端菜单
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-full');
            navMenu.classList.toggle('left-0');
            navMenu.classList.toggle('w-full');
            navMenu.classList.toggle('bg-slate-800');
            navMenu.classList.toggle('p-4');
        });
    }
}

// 模态框功能
function initModals() {
    const detailBtns = document.querySelectorAll('.detail-btn');
    
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // 点击遮罩层关闭模态框
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

// 打开模态框
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.remove('closing');
        document.body.style.overflow = 'hidden';
        
        // 添加打开动画
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('closing');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('closing');
            modal.style.opacity = '0';
            document.body.style.overflow = '';
        }, 300);
    }
}

// 滚动动画
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.bento-item, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 错开动画时间
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // 为Bento Grid项目添加错开动画
                if (entry.target.classList.contains('bento-item')) {
                    const bentoItems = entry.target.parentElement.querySelectorAll('.bento-item');
                    bentoItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.bento-grid, .contact-item, .section-title');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 设置当前年份
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// 技能标签悬停效果
function initSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 191, 255, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// 页面加载动画
function initPageLoadAnimation() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const elements = heroContent.children;
        
        Array.from(elements).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }
}

// 滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小改变时重新初始化粒子
window.addEventListener('resize', debounce(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.canvasSize();
    }
}, 250));

// 页面可见性API - 当页面不可见时暂停动画
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停粒子动画
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }
    } else {
        // 页面可见时恢复粒子动画
        initParticles();
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.warn('页面加载出现错误:', e.error);
});

// 初始化所有效果
document.addEventListener('DOMContentLoaded', function() {
    initSkillTagEffects();
    initPageLoadAnimation();
    initScrollProgress();
});

// 导出函数供HTML调用
window.openModal = openModal;
window.closeModal = closeModal; 