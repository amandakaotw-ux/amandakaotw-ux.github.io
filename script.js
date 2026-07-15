/**
 * Cinderella × Uber AI - Main JavaScript
 * GitHub Pages Interactive Experience
 */

class CinderellaApp {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupSmoothScroll();
        this.loadPreferences();
        this.updateLanguage();
    }

    // Language Management
    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        if (!langToggle) return;

        langToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLanguage);
        this.updateLanguage();
    }

    updateLanguage() {
        const isEnglish = this.currentLanguage === 'en';
        
        // Update toggle button text
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.querySelector('.lang-text').textContent = isEnglish ? '中文' : 'English';
        }

        // Update all translatable elements
        document.querySelectorAll('[data-zh][data-en]').forEach(element => {
            const text = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-zh');
            
            // Handle button content with icons
            if (element.tagName === 'BUTTON') {
                const icon = element.innerHTML.split(' ')[0];
                element.textContent = text;
                if (icon && icon.includes('�') || icon.includes('🚀')) {
                    element.innerHTML = icon + ' ' + text;
                }
            } else {
                element.textContent = text;
            }
        });

        // Trigger animation
        document.body.style.opacity = '0.98';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Load Preferences
    loadPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        // Load language
        this.currentLanguage = localStorage.getItem('language') || 'zh';
    }

    // Theme Management
    setTheme(theme) {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Utility: Check if device is mobile
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Utility: Get translated text
    getText(zh, en) {
        return this.currentLanguage === 'zh' ? zh : en;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CinderellaApp();
});

// Add smooth fade-in animation to page load
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-in-out';
});

// Add fade-in animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Handle resize for responsive updates
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Trigger any responsive recalculations if needed
    }, 250);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle language with Ctrl+L
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        window.app.toggleLanguage();
    }

    // Scroll to top with Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to bottom with End key
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.scene-card, .feature-card, .doc-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Analytics - Simple page view tracking (optional)
function trackPageView() {
    if (typeof ga !== 'undefined') {
        ga('send', 'pageview');
    }
}

// Report Web Vitals (optional)
if ('web-vital' in window) {
    // Could implement Web Vitals reporting here
}

console.log('Cinderella × Uber AI - Script loaded successfully');
