document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll-triggered fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.timeline-item, .highlight-card, .skill-category, .edu-card, .contact-item, .about-content, .about-highlights'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 100
            ? '0 1px 12px rgba(0, 0, 0, 0.05)'
            : 'none';
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = navLinks.querySelectorAll('a:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 150;
        let currentSection = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                currentSection = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
            }
        });
    });
});
