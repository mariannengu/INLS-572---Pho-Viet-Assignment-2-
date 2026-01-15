// Navigation and Section Management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + 100; // Offset for better UX
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle function to limit how often updateActiveNav runs
    let ticking = false;
    function throttledUpdateNav() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', throttledUpdateNav);
    
    // Initial call to set active state on load
    updateActiveNav();
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Mobile menu toggle
    function createMobileMenuToggle() {
        if (window.innerWidth <= 992) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    position: fixed;
                    top: 1rem;
                    left: 1rem;
                    z-index: 1001;
                    background: var(--primary-green);
                    color: white;
                    border: none;
                    padding: 0.75rem 1rem;
                    font-size: 1.5rem;
                    border-radius: 6px;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                `;
                document.body.appendChild(toggle);
                
                toggle.addEventListener('click', function() {
                    const sidebar = document.querySelector('.sidebar');
                    sidebar.classList.toggle('mobile-open');
                });
                
                // Close sidebar when clicking outside
                document.addEventListener('click', function(e) {
                    const sidebar = document.querySelector('.sidebar');
                    const toggle = document.querySelector('.mobile-menu-toggle');
                    
                    if (sidebar.classList.contains('mobile-open') && 
                        !sidebar.contains(e.target) && 
                        e.target !== toggle) {
                        sidebar.classList.remove('mobile-open');
                    }
                });
                
                // Close sidebar when clicking nav link on mobile
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        const sidebar = document.querySelector('.sidebar');
                        sidebar.classList.remove('mobile-open');
                    });
                });
            }
        }
    }
    
    // Check on load and resize
    createMobileMenuToggle();
    window.addEventListener('resize', createMobileMenuToggle);
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // Add stagger animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Add stagger animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add entrance animations
const style = document.createElement('style');
style.textContent = `
    .menu-item,
    .gallery-item,
    .testimonial-card,
    .dietary-card,
    .faq-item {
        opacity: 0;
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu-toggle {
        display: none;
    }
    
    @media (max-width: 992px) {
        .mobile-menu-toggle {
            display: block !important;
        }
        
        .sidebar {
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
    }
`;
document.head.appendChild(style);