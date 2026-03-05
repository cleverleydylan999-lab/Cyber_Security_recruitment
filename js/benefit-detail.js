// Benefit detail page interactions and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Add interactive elements
    initializeInteractiveElements();
});

// Initialize scroll-based reveal animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll(
        '.benefit-section, .pathway-card, .program-card, .stat-card, ' +
        '.expertise-card, .achievement, .collab-card, .impact-type, ' +
        '.testimonial, .cta-buttons, .platform, .track, .community-feature'
    );

    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll(
        '.pathway-card, .program-card, .expertise-card, .achievement, ' +
        '.collab-card, .platform, .track, .community-feature, .impact-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Add click tracking for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons a');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackBenefitInteraction(this.textContent, 'click');
        });
    });

    // Smooth scroll for back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
}

// Track user interactions with benefits
function trackBenefitInteraction(action, type) {
    const pageTitle = document.querySelector('h1').textContent;
    const timestamp = new Date().toISOString();
    
    // Log to console (in production, would send to analytics)
    console.log(`[Benefit Interaction] Page: ${pageTitle}, Action: ${action}, Type: ${type}, Time: ${timestamp}`);
    
    // Send to analytics if available
    if (window.gtag) {
        gtag('event', 'benefit_page_interaction', {
            'benefit_name': pageTitle,
            'action': action,
            'interaction_type': type,
            'timestamp': timestamp
        });
    }
}

// Add smooth scroll behavior
window.addEventListener('hashchange', function() {
    const target = document.querySelector(window.location.hash);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});

// Enhance readability with reading progress indicator (optional)
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Could use this to show reading progress, update in future enhancement
    // console.log(`Reading progress: ${scrollPercent.toFixed(0)}%`);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Escape key to go back
    if (e.key === 'Escape') {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            window.history.back();
        }
    }
});
