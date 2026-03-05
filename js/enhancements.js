// Enhanced Features & Improvements Module
// Comprehensive enhancements for visual appeal and UX

// ============================================
// ENHANCED HERO ANIMATIONS
// ============================================

class HeroEnhancement {
    constructor() {
        this.initHeroAnimations();
        this.setupTypingEffect();
        this.createParticleEffect();
    }

    initHeroAnimations() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            // Add enhanced glow effect
            heroSection.style.cssText += `
                background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1b2f 100%);
                position: relative;
                overflow: hidden;
            `;

            // Create animated background elements
            const animatedGrid = document.querySelector('.animated-grid');
            if (animatedGrid) {
                animatedGrid.style.cssText = `
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    background: 
                        repeating-linear-gradient(
                            0deg,
                            rgba(0, 217, 255, 0.1) 0px,
                            rgba(0, 217, 255, 0.1) 1px,
                            transparent 1px,
                            transparent 50px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            rgba(0, 217, 255, 0.1) 0px,
                            rgba(0, 217, 255, 0.1) 1px,
                            transparent 1px,
                            transparent 50px
                        );
                    animation: moveGrid 20s linear infinite;
                    filter: blur(0.5px);
                `;
            }
        }
    }

    setupTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle && !subtitle.hasAttribute('data-typing-done')) {
            const originalText = subtitle.textContent;
            subtitle.setAttribute('data-typing-done', 'true');
            subtitle.textContent = '';

            let index = 0;
            const typingSpeed = 30;

            const typeCharacter = () => {
                if (index < originalText.length) {
                    subtitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeCharacter, typingSpeed);
                }
            };

            // Start typing after a small delay
            setTimeout(typeCharacter, 300);
        }
    }

    createParticleEffect() {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            // Create floating particles
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(0, 217, 255, ${Math.random() * 0.7 + 0.3});
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
                `;
                hero.appendChild(particle);
            }
        }
    }
}

// ============================================
// INTERACTIVE STATISTICS COUNTERS
// ============================================

class StatisticsCounter {
    constructor() {
        this.initCounters();
    }

    initCounters() {
        const stats = document.querySelectorAll('.stat-card h3');
        
        stats.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/(\d+)/);
            
            if (match) {
                const targetNumber = parseInt(match[1]);
                const unit = text.replace(/\d+/, '').trim();
                
                // Trigger on scroll into view
                this.observeElement(stat, () => {
                    this.animateCounter(stat, targetNumber, unit);
                });
            }
        });
    }

    animateCounter(element, target, unit) {
        if (element.hasAttribute('data-counted')) return;
        element.setAttribute('data-counted', 'true');

        let current = 0;
        const increment = target / 30;
        const duration = 1500;
        const startTime = Date.now();

        const updateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            current = Math.floor(target * progress);
            element.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCount();
    }

    observeElement(element, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }
}

// ============================================
// ENHANCED FORM VALIDATION WITH FEEDBACK
// ============================================

class FormEnhancement {
    constructor() {
        this.initFormEnhancements();
        this.setupRealTimeValidation();
    }

    initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add visual feedback container
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('input-feedback')) {
                const feedback = document.createElement('div');
                feedback.className = 'input-feedback';
                feedback.style.cssText = `
                    font-size: 12px;
                    margin-top: 4px;
                    display: none;
                    padding: 6px 0;
                `;
                input.parentNode.insertBefore(feedback, input.nextSibling);
            }

            // Add label styling
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.style.cssText = `
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #a0aec0;
                    transition: color 0.3s;
                `;
            }

            // Enhanced input styling
            input.style.cssText += `
                border-radius: 8px;
                transition: all 0.3s ease;
                padding: 12px 14px;
                border: 2px solid rgba(0, 217, 255, 0.2);
            `;

            input.addEventListener('focus', () => {
                input.style.borderColor = '#00d9ff';
                input.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.3)';
                if (label) label.style.color = '#00d9ff';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = 'rgba(0, 217, 255, 0.2)';
                input.style.boxShadow = 'none';
                if (label) label.style.color = '#a0aec0';
                this.validateField(input);
            });
        });
    }

    setupRealTimeValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateEmail(input);
            });
        });
    }

    validateField(input) {
        const feedback = input.parentNode.querySelector('.input-feedback');
        let isValid = true;
        let message = '';

        if (input.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            message = isValid ? '✓ Valid email' : '✗ Invalid email format';
        } else if (input.required && input.value.trim() === '') {
            isValid = false;
            message = `✗ ${input.placeholder || input.name} is required`;
        } else if (input.minLength && input.value.length < input.minLength) {
            isValid = false;
            message = `✗ Minimum ${input.minLength} characters`;
        }

        if (feedback) {
            feedback.textContent = message;
            feedback.style.display = message ? 'block' : 'none';
            feedback.style.color = isValid ? '#4ade80' : '#ef4444';
            input.style.borderColor = isValid && input.value ? '#4ade80' : 'rgba(0, 217, 255, 0.2)';
        }

        return isValid;
    }

    validateEmail(input) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        const feedback = input.parentNode.querySelector('.input-feedback');
        
        if (input.value) {
            if (feedback) {
                feedback.textContent = isValid ? '✓ Valid email' : '✗ Invalid email';
                feedback.style.color = isValid ? '#4ade80' : '#fbbf24';
                feedback.style.display = 'block';
            }
            input.style.borderColor = isValid ? 'rgba(74, 222, 128, 0.5)' : 'rgba(251, 191, 36, 0.5)';
        }
    }
}

// ============================================
// ENHANCED CALL-TO-ACTION BUTTONS
// ============================================

class CTAEnhancement {
    constructor() {
        this.enhanceButtons();
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn, .job-apply-btn, .apply-btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });

            // Add hover glow effect
            button.style.cssText += `
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 217, 255, 0.2);
            `;

            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 8px 25px rgba(0, 217, 255, 0.4)';
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '0 4px 15px rgba(0, 217, 255, 0.2)';
                button.style.transform = 'translateY(0)';
            });
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================

class TestimonialCarousel {
    constructor() {
        this.currentIndex = 0;
        this.initCarousel();
    }

    initCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        if (testimonials.length <= 1) return;

        // Create carousel controls
        const container = testimonials[0].closest('.testimonials-container');
        if (container) {
            const controls = document.createElement('div');
            controls.style.cssText = `
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            `;

            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.style.cssText = `
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: none;
                    background: ${index === 0 ? '#00d9ff' : 'rgba(0, 217, 255, 0.3)'};
                    cursor: pointer;
                    transition: all 0.3s;
                `;

                dot.addEventListener('click', () => {
                    this.showTestimonial(index, testimonials, controls.querySelectorAll('button'));
                });

                controls.appendChild(dot);
            });

            container.appendChild(controls);
        }

        // Auto-rotate testimonials
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % testimonials.length;
            this.showTestimonial(this.currentIndex, testimonials, document.querySelectorAll('.testimonials-container button'));
        }, 5000);
    }

    showTestimonial(index, testimonials, dots) {
        testimonials.forEach((t, i) => {
            t.style.display = i === index ? 'block' : 'none';
            t.style.animation = i === index ? 'fadeIn 0.5s' : 'none';
        });

        dots.forEach((d, i) => {
            d.style.background = i === index ? '#00d9ff' : 'rgba(0, 217, 255, 0.3)';
            d.style.transform = i === index ? 'scale(1.3)' : 'scale(1)';
        });

        this.currentIndex = index;
    }
}

// ============================================
// SCROLL-BASED ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.initScrollAnimations();
    }

    initScrollAnimations() {
        const elements = document.querySelectorAll('.benefit-card, .job-card, .stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// THEME SWITCHER
// ============================================

class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.initThemeSwitcher();
        this.applyTheme(this.currentTheme);
    }

    initThemeSwitcher() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            color: white;
            cursor: pointer;
            font-size: 20px;
            z-index: 9998;
            box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
            transition: all 0.3s;
            display: none;
        `;

        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });

        themeToggle.addEventListener('mouseenter', () => {
            themeToggle.style.transform = 'scale(1.1)';
        });

        themeToggle.addEventListener('mouseleave', () => {
            themeToggle.style.transform = 'scale(1)';
        });

        document.body.appendChild(themeToggle);
    }

    applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'light') {
            root.style.cssText = `
                --primary-bg: #ffffff;
                --secondary-bg: #f3f4f6;
                --text-color: #1f2937;
                --border-color: #e5e7eb;
            `;
            document.body.style.background = '#ffffff';
            document.body.style.color = '#1f2937';
        } else {
            root.style.cssText = `
                --primary-bg: #0a0e27;
                --secondary-bg: #1a1f3a;
                --text-color: #f5f5f5;
                --border-color: rgba(0, 217, 255, 0.2);
            `;
            document.body.style.background = '#0a0e27';
            document.body.style.color = '#f5f5f5';
        }
    }
}

// ============================================
// MOBILE NAVIGATION ENHANCEMENT
// ============================================

class MobileNavEnhancement {
    constructor() {
        this.initMobileNav();
    }

    initMobileNav() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');

        if (navbar && !document.querySelector('.mobile-toggle')) {
            // Create mobile toggle button
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            toggle.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: #00d9ff;
                font-size: 24px;
                cursor: pointer;
                @media (max-width: 768px) {
                    display: block;
                }
            `;

            toggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                toggle.innerHTML = navMenu.style.display === 'flex' 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            navbar.querySelector('.nav-container').appendChild(toggle);
        }
    }
}

// ============================================
// INITIALIZE ALL ENHANCEMENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all enhancements
    new HeroEnhancement();
    new StatisticsCounter();
    new FormEnhancement();
    new CTAEnhancement();
    new TestimonialCarousel();
    new ScrollAnimations();
    new ThemeSwitcher();
    new MobileNavEnhancement();

    console.log('%c[Enhancements]', 'color: #00d9ff; font-weight: bold;');
    console.log('✓ Hero animations initialized');
    console.log('✓ Statistics counters active');
    console.log('✓ Form validation enhanced');
    console.log('✓ CTA buttons enhanced');
    console.log('✓ Testimonial carousel ready');
    console.log('✓ Scroll animations active');
    console.log('✓ Theme switcher available');
});
