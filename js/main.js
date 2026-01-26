document.addEventListener('DOMContentLoaded', () => {
    
    /* =====================================================
       1. MOBILE MENU LOGIC
       ===================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Toggle Menu Open/Close
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing if we add document click later
            toggleMenu();
        });

        // Close menu when ANY link inside it is clicked
        // (Crucial for single-page scrolling sites)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Helper function to handle the toggle and icon swap
        function toggleMenu() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Close menu if clicking outside of it
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    /* =====================================================
       2. NAVBAR SCROLL EFFECT
       ===================================================== */
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.background = 'rgba(15, 76, 92, 0.95)'; // Glassy effect
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.background = 'var(--deep-teal)';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* =====================================================
       3. INTERSECTION OBSERVER (SCROLL ANIMATIONS)
       ===================================================== */
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once loaded to save resources
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });

    /* =====================================================
       4. MOBILE FLIP CARD TOUCH SUPPORT
       ===================================================== */
    // On mobile, hover doesn't exist. This allows tapping a card to flip it.
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const inner = this.querySelector('.flip-card-inner');
            if(inner) {
                // If currently rotated, remove style (unflip)
                if (inner.style.transform === 'rotateY(180deg)') {
                    inner.style.transform = '';
                } else {
                    // Flip this one
                    inner.style.transform = 'rotateY(180deg)';
                }
            }
        });
    });

});