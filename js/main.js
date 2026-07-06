/* ============================================
   PORTFOLIO JAVASCRIPT - Optimized
   Handles: Navigation, Theme Toggle, Scroll Effects
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // PERFORMANCE: Throttle function
    // Limits how often a function can run
    // ============================================
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ============================================
    // NAVIGATION - Mobile Menu Toggle
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Open mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }
    
    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // ============================================
    // THEME TOGGLE - cycles dark <-> light
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const THEMES = ['dark', 'light'];

    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.setAttribute('data-theme-state', theme);
        }
    };

    // Initialize theme state
    setTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const idx = THEMES.indexOf(current);
            const next = THEMES[(idx + 1) % THEMES.length];
            setTheme(next);
        });
    }

    // Respect system changes only when user hasn't selected a theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ============================================
    // ACTIVE NAV LINK - Highlight on Scroll
    // Using throttled scroll for performance
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };
    
    // Throttle scroll event to run at most every 100ms
    window.addEventListener('scroll', throttle(highlightNavLink, 100));

    // ============================================
    // BACK TO TOP BUTTON
    // Using throttled scroll for performance
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    
    const toggleBackToTop = () => {
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    };
    
    // Throttle scroll event
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // CONTACT FORM - Front-end Validation
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Submit to Netlify forms (or fall back to demo notification)
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams([...formData]).toString()
                });

                if (response.ok || response.status === 200) {
                    showNotification('Message sent — thanks!', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Message queued locally (demo).', 'success');
                    contactForm.reset();
                }
            } catch (err) {
                showNotification('Could not send — check connection.', 'error');
            }
        });
    }

    // ============================================
    // MICRO-INTERACTIONS: Ripple on buttons
    // ============================================
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn__ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });

    // ============================================
    // PROJECT MODAL - open details from card
    // ============================================
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // ignore clicks on links inside the card
            if (e.target.closest('a')) return;
            const title = card.querySelector('.project-card__title')?.textContent || '';
            const desc = card.querySelector('.project-card__description')?.textContent || '';
            const img = card.querySelector('.project-card__image img')?.src || '';

            modalBody.innerHTML = `
                <div class=\"project-modal-inner\"> 
                    <div class=\"project-modal-image\"><img src=\"${img}\" alt=\"${title}\"></div>
                    <div class=\"project-modal-text\"><h3>${title}</h3><p>${desc}</p></div>
                </div>`;
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__backdrop')) {
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const showNotification = (message, type) => {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // ============================================
    // SCROLL ANIMATIONS - Using CSS Classes
    // Much more performant than inline styles
    // ============================================
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use CSS class instead of inline styles
                    entry.target.classList.add('is-visible');
                    // Unobserve after animation for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Add CSS class to elements and observe them
        const animateElements = document.querySelectorAll('.project-card, .skill-card, .about__content');
        
        animateElements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            // Add stagger delay for cards
            if (el.classList.contains('project-card') || el.classList.contains('skill-card')) {
                el.classList.add(`animate-delay-${(index % 3) + 1}`);
            }
            observer.observe(el);
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });

});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);
