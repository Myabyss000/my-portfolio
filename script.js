// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.classList.toggle('dark', savedTheme === 'dark');
        
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            html.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typing Animation for Hero Section
    function initTypingAnimation() {
        const nameElement = document.querySelector('.typing-name');
        const cursorElement = document.querySelector('.typing-cursor');
        const fullName = 'Arghya Adhikary';
        
        if (!nameElement || !cursorElement) return;
        
        let index = 0;
        let isTyping = false;
        
        // Clear initial content and set up styling
        nameElement.textContent = '';
        nameElement.style.display = 'inline-block';
        nameElement.style.minWidth = '0px';
        
        // Typing function
        function typeWriter() {
            if (isTyping) return;
            isTyping = true;
            
            if (index < fullName.length) {
                nameElement.textContent += fullName.charAt(index);
                index++;
                setTimeout(() => {
                    isTyping = false;
                    typeWriter();
                }, 120); // Slightly slower for better rendering
            } else {
                // After typing is complete, make cursor blink
                cursorElement.style.animation = 'blink 1.2s infinite';
                
                // Optional: Restart animation after a delay
                setTimeout(() => {
                    index = 0;
                    nameElement.textContent = '';
                    cursorElement.style.animation = 'none';
                    isTyping = false;
                    setTimeout(typeWriter, 800);
                }, 6000); // Wait 6 seconds before restarting
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1500);
    }
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.animate-fade-in-up, .animate-fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary-600', 'dark:text-primary-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-600', 'dark:text-primary-400');
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Contact form handling
    const contactForm = document.querySelector('#contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const formMessages = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            formMessages.classList.add('hidden');
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            
            try {
                // Get the form action URL
                const formAction = contactForm.action;
                
                // Check if form action is properly set
                if (formAction.includes('YOUR_FORM_ID')) {
                    throw new Error('Form not configured. Please set up Formspree form ID.');
                }
                
                // Create FormData object
                const formData = new FormData(contactForm);
                
                // Submit form to Formspree
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    formMessages.classList.remove('hidden');
                    successMessage.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                formMessages.classList.remove('hidden');
                errorMessage.classList.remove('hidden');
                
                // Fallback to mailto if form service fails
                const name = new FormData(contactForm).get('name');
                const email = new FormData(contactForm).get('_replyto');
                const subject = new FormData(contactForm).get('_subject');
                const message = new FormData(contactForm).get('message');
                
                const mailtoLink = `mailto:arghyaa771@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Add fallback button
                const fallbackBtn = document.createElement('button');
                fallbackBtn.className = 'mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors';
                fallbackBtn.innerHTML = '<i class="fas fa-envelope mr-2"></i>Open Email Client';
                fallbackBtn.onclick = () => window.location.href = mailtoLink;
                errorMessage.appendChild(fallbackBtn);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
            }
        });
    }
    
    // Add loading animation to buttons
    document.querySelectorAll('a[href^="#"], button').forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.classList.add('shadow-lg');
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(16px)';
                navbar.classList.remove('shadow-lg');
            }
        });
    }
    
    // Add hover effects to cards
    document.querySelectorAll('.group').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyNy45MSAxMDAgMTEwIDExNy45MSAxMTAgMTQwQzExMCAxNjIuMDkgMTI3LjkxIDE4MCAxNTAgMTgwQzE3Mi4wOSAxODAgMTkwIDE2Mi4wOSAxOTAgMTQwQzE5MCAxMTcuOTEgMTcyLjA5IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTUwIDEyMEMxMzkuNTQgMTIwIDEzMCAxMjkuNTQgMTMwIDE0MEMxMzAgMTUwLjQ2IDEzOS41NCAxNjAgMTUwIDE2MEMxNjAuNDYgMTYwIDE3MCAxNTAuNDYgMTcwIDE0MEMxNzAgMTI5LjU0IDE2MC40NiAxMjAgMTUwIDEyMFoiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+';
            this.alt = 'Profile Image';
        });
    });
    
    console.log('🚀 Website loaded successfully!');
    console.log('💻 Arghya Adhikary - Cybersecurity Engineer & AI Enthusiast');
    console.log('🔗 Connect with me: https://github.com/Myabyss000');
});

// Preloader functionality (if needed)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
