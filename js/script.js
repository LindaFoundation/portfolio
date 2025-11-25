<section id="home" class="slideshow">
    <div class="slideshow-container">
     
        <div class="slide active">
            <div class="slide-image" style="background-image: url('media/slide1.jpg'); background-color: #2e86c1;"></div>
            <div class="slide-content">
                <h2>Creating a Resilient and Healthy Society</h2>
                <p>Improving lives and promoting dignity through integrated, community-driven solutions in Nutrition, Health, WASH, and Protection services.</p>
                <a href="#contact" class="btn">Get Involved</a>
            </div>
        </div>
        
    
        <div class="slide">
            <div class="slide-image" style="background-image: url('media/slide2.jpg'); background-color: #27ae60;"></div>
            <div class="slide-content">
                <h2>Nutrition & Health Programs</h2>
                <p>Addressing malnutrition and health challenges in Northeast Nigeria with sustainable solutions.</p>
                <a href="#what-we-do" class="btn">Learn More</a>
            </div>
        </div>
        
       
        <div class="slide">
            <div class="slide-image" style="background-image: url('media/slide3.jpg'); background-color: #2980b9;"></div>
            <div class="slide-content">
                <h2>WASH Initiatives</h2>
                <p>Combatting waterborne diseases through sustainable water and sanitation solutions in vulnerable communities.</p>
                <a href="#what-we-do" class="btn">Our Programs</a>
            </div>
        </div>
        
       
        <div class="slide">
            <div class="slide-image" style="background-image: url('media/slide4.jpg'); background-color: #e67e22;"></div>
            <div class="slide-content">
                <h2>Education in Emergency</h2>
                <p>Ensuring safe and inclusive education for all children in conflict-affected areas of Northeast Nigeria.</p>
                <a href="#contact" class="btn">Support Us</a>
            </div>
        </div>
    </div>
    
   
    <div class="slide-nav">
        <button class="slide-prev">&#10094;</button>
        <div class="slide-dots">
            <span class="dot active" data-slide="0"></span>
            <span class="dot" data-slide="1"></span>
            <span class="dot" data-slide="2"></span>
            <span class="dot" data-slide="3"></span>
        </div>
        <button class="slide-next">&#10095;</button>
    </div>
</section>

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slide-prev');
    const nextButton = document.querySelector('.slide-next');
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // Show the next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Show the previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Add event listeners to navigation buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play the slideshow every 5 seconds
    setInterval(nextSlide, 5000);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    if (document.querySelector('.slideshow')) {
        // Slideshow initialization removed as 'Slideshow' is undefined
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Active navigation highlighting
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on scroll and page load
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
})

// Ensure this script tag is included in the HTML file, not in the JavaScript file.
// <script src="js/script.js"></script>