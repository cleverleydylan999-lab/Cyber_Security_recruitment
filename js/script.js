// ============================================
// PSYCHOLOGICAL & BEHAVIORAL FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initInteractiveElements();
    initScrollReveal();
    trackUserEngagement();
    initAnchorScrolling();
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.job-card, .benefit-card, .stat-card, .testimonial-card').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
}

// Add CSS for reveal animations
const style = document.createElement('style');
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    /* Stagger animation */
    .job-grid .job-card:nth-child(1).revealed { transition-delay: 0.1s; }
    .job-grid .job-card:nth-child(2).revealed { transition-delay: 0.2s; }
    .job-grid .job-card:nth-child(3).revealed { transition-delay: 0.3s; }
    .job-grid .job-card:nth-child(4).revealed { transition-delay: 0.4s; }
    .job-grid .job-card:nth-child(5).revealed { transition-delay: 0.5s; }
    .job-grid .job-card:nth-child(6).revealed { transition-delay: 0.6s; }

    .benefits-grid .benefit-card:nth-child(1).revealed { transition-delay: 0.1s; }
    .benefits-grid .benefit-card:nth-child(2).revealed { transition-delay: 0.2s; }
    .benefits-grid .benefit-card:nth-child(3).revealed { transition-delay: 0.3s; }
    .benefits-grid .benefit-card:nth-child(4).revealed { transition-delay: 0.1s; }
    .benefits-grid .benefit-card:nth-child(5).revealed { transition-delay: 0.2s; }
    .benefits-grid .benefit-card:nth-child(6).revealed { transition-delay: 0.3s; }

    .testimonials-grid .testimonial-card:nth-child(1).revealed { transition-delay: 0.1s; }
    .testimonials-grid .testimonial-card:nth-child(2).revealed { transition-delay: 0.2s; }
    .testimonials-grid .testimonial-card:nth-child(3).revealed { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS - PARALLAX & EFFECTS
// ============================================

function initScrollAnimations() {
    window.addEventListener('scroll', function() {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Parallax effect for hero visual
        const heroVisual = document.querySelector('.animated-grid');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }

        // Update navbar background opacity based on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.2)';
        } else {
            navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.1)';
        }
    });
}

// ============================================
// INTERACTIVE ELEMENTS (HOVER & CLICK)
// ============================================

function initInteractiveElements() {
    // Job card filtering (psychological: user feels in control)
    const jobCards = document.querySelectorAll('.job-card');
    
    // Add click handlers to job cards
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.job-header h3').textContent;
            const level = this.dataset.level;
            trackEvent('job_card_clicked', {
                job_title: title,
                level: level
            });
        });
    });

    // Apply button animations
    const applyButtons = document.querySelectorAll('.apply-btn, .job-apply-btn, .btn-primary');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Ripple effect (psychological: satisfying visual feedback)
            createRipple(e);
            trackEvent('apply_button_clicked');
            
            setTimeout(() => {
                showNotification('Application started! Complete your profile to continue.');
            }, 300);
        });
    });

    // Skill tag hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.borderColor = 'rgba(0, 217, 255, 0.8)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'rgba(0, 217, 255, 0.3)';
        });
    });
}

// Ripple effect on button click
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .apply-btn, .job-apply-btn, .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#00d965' : '#ff9500'};
        color: #0a0e27;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// ENGAGEMENT TRACKING (PSYCHOLOGICAL INSIGHTS)
// ============================================

let userEngagementData = {
    scrollDepth: 0,
    elementsHovered: [],
    buttonsClicked: 0,
    timeOnPage: 0,
    jobsViewed: []
};

function trackUserEngagement() {
    // Track time on page
    setInterval(() => {
        userEngagementData.timeOnPage++;
    }, 1000);

    // Track scroll depth (psychological: shows user interest)
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        userEngagementData.scrollDepth = Math.max(userEngagementData.scrollDepth, scrollPercentage);
    });

    // Track hover on elements
    document.querySelectorAll('.job-card, .benefit-card').forEach(el => {
        el.addEventListener('mouseenter', function() {
            const label = this.querySelector('h3').textContent;
            if (!userEngagementData.elementsHovered.includes(label)) {
                userEngagementData.elementsHovered.push(label);
            }
        });
    });
}

function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
    // In production, send this to analytics service
}

// ============================================
// SMOOTH ANCHOR SCROLLING
// ============================================

function initAnchorScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                trackEvent('navigation', { to: href });
            }
        });
    });
}

// ============================================
// DARK MODE TOGGLE (FUTURE FEATURE)
// ============================================

function initDarkModeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.style.colorScheme = 'dark';
    }
}

// ============================================
// MOUSE TRACKING FOR ENHANCED UX
// ============================================

function initMouseTracking() {
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.job-card, .benefit-card, .testimonial-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only apply effect when mouse is over the card
            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });
}

// ============================================
// PAGE VISIBILITY API (PSYCHOLOGY)
// ============================================

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('🔔 Welcome back!');
        trackEvent('page_resumed');
    } else {
        console.log('👋 See you soon!');
        trackEvent('page_left');
    }
});

// ============================================
// SCROLL-TO-TOP BUTTON
// ============================================

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d9ff, #0099cc);
        color: #0a0e27;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('scroll_to_top_clicked');
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ============================================
// FORM VALIDATION & ENGAGEMENT
// ============================================

function setupFormHandlers() {
    const applyBtn = document.querySelector('.apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            showApplicationModal();
        });
    }
}

function showApplicationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: #1a1f3a;
            border: 1px solid rgba(0, 217, 255, 0.3);
            border-radius: 12px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            animation: slideUp 0.3s ease;
        ">
            <h2 style="margin-bottom: 20px; font-size: 24px;">Start Your Journey</h2>
            <p style="color: #b0b8c8; margin-bottom: 20px;">Join our elite cybersecurity team</p>
            <input type="email" placeholder="Email address" style="
                width: 100%;
                padding: 12px;
                margin-bottom: 12px;
                background: rgba(0, 217, 255, 0.05);
                border: 1px solid rgba(0, 217, 255, 0.3);
                border-radius: 6px;
                color: #fff;
                font-family: inherit;
            ">
            <button style="
                width: 100%;
                padding: 12px;
                background: #00d9ff;
                color: #0a0e27;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                cursor: pointer;
                margin-top: 20px;
            ">Continue Application</button>
            <button onclick="this.closest('.modal').remove()" style="
                width: 100%;
                padding: 12px;
                background: transparent;
                color: #b0b8c8;
                border: 1px solid rgba(0, 217, 255, 0.2);
                border-radius: 6px;
                cursor: pointer;
                margin-top: 10px;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

initScrollToTop();
setupFormHandlers();
initMouseTracking();
initDarkModeToggle();

// Log analytics
console.log('%c🛡️ CyberShield Recruitment Platform', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cWelcome! Track your engagement below:', 'color: #b0b8c8; font-size: 12px;');

// Periodic engagement report
setInterval(() => {
    if (userEngagementData.scrollDepth > 50) {
        console.log('📈 Engagement Stats:', {
            scrollDepth: Math.round(userEngagementData.scrollDepth) + '%',
            timeOnPage: userEngagementData.timeOnPage + 's',
            elementsInteracted: userEngagementData.elementsHovered.length
        });
    }
}, 30000);
