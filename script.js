document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // Mobile nav toggle
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

    // Scroll-triggered fade-in with stagger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.timeline-item, .highlight-card, .skill-category, .edu-card, .contact-item, .about-content, .about-highlights'
    ).forEach((el, i) => {
        el.classList.add('fade-in');
        el.dataset.delay = (i % 4) * 80;
        observer.observe(el);
    });

    // Animated number counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        const text = el.textContent;
        const match = text.match(/^([\$]?)([\d.]+)([B+\+%]*.*)/);
        if (!match) return;

        const prefix = match[1];
        const target = parseFloat(match[2]);
        const suffix = match[3];
        const duration = 1500;
        const start = performance.now();
        const isDecimal = text.includes('.');

        el.style.opacity = '1';

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = target * eased;

            if (isDecimal) {
                el.textContent = prefix + current.toFixed(0) + suffix;
            } else {
                el.textContent = prefix + Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

    // Navbar — shadow + shrink on scroll
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
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

    // Smooth parallax on hero stats
    const heroStats = document.querySelector('.hero-stats');
    const heroTitle = document.querySelector('.hero-title');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    const factor = scrollY * 0.15;
                    if (heroStats) heroStats.style.transform = `translateY(${factor}px)`;
                    if (heroTitle) heroTitle.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
                }
            });
        }
    });

    // Magnetic hover effect on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});
