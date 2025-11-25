// <link rel="stylesheet" href="css/style.css">

// <section class="gallery-section">
//     <!-- Gallery content goes here -->
// </section>

// Gallery functionality
class Gallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.viewButtons = document.querySelectorAll('.view-btn');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxTitle = document.querySelector('.lightbox-title');
        this.lightboxDescription = document.querySelector('.lightbox-description');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');

        this.currentImageIndex = 0;
        this.images = [];

        this.init();
    }

    init() {
        // Initialize images array
        this.initializeImages();

        // Filter functionality
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterGallery(button));
        });

        // Lightbox functionality
        this.viewButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.openLightbox(index));
        });

        // Lightbox controls
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPreviousImage());
        this.lightboxNext.addEventListener('click', () => this.showNextImage());

        // Close lightbox on outside click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPreviousImage();
                if (e.key === 'ArrowRight') this.showNextImage();
            }
        });

        console.log('Gallery initialized');
    }

    initializeImages() {
        this.viewButtons.forEach(button => {
            this.images.push({
                image: button.getAttribute('data-image'),
                title: button.getAttribute('data-title'),
                description: button.getAttribute('data-description')
            });
        });
    }

    filterGallery(button) {
        const filter = button.getAttribute('data-filter');

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        this.galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || filter === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateLightbox();
    }

    updateLightbox() {
        const currentImage = this.images[this.currentImageIndex];
        this.lightboxImage.src = currentImage.image;
        this.lightboxImage.alt = currentImage.title;
        this.lightboxTitle.textContent = currentImage.title;
        this.lightboxDescription.textContent = currentImage.description;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.gallery-section')) {
        new Gallery();
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

    // Add gallery link to navigation
    const navList = document.querySelector('nav ul');
    if (navList) {
        const galleryLink = document.createElement('li');
        galleryLink.innerHTML = '<a href="gallery.html">Gallery</a>';
        navList.appendChild(galleryLink);
    }

    // Highlight current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
