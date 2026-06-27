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
        drawRadarChart();
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============ HERO PARTICLE NETWORK ============
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        function createParticles() {
            particles = [];
            const count = Math.min(60, Math.floor(canvas.offsetWidth / 20));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const color = isDark ? '100, 160, 255' : '0, 102, 255';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, 0.5)`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            animId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });

        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { if (!animId) drawParticles(); }
            else { cancelAnimationFrame(animId); animId = null; }
        });
        heroObserver.observe(canvas);
    }


    // ============ RECOMMENDATIONS SCROLL ============
    const recoSlider = document.getElementById('reco-slider');
    const recoPrev = document.getElementById('reco-prev');
    const recoNext = document.getElementById('reco-next');

    if (recoSlider && recoPrev && recoNext) {
        const scrollAmount = recoSlider.offsetWidth * 0.35;

        recoNext.addEventListener('click', () => {
            recoSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        recoPrev.addEventListener('click', () => {
            recoSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // ============ INTERACTIVE SKILLS RADAR CHART ============
    const radarSkills = [
        { label: 'AWS Cloud', value: 0.95, detail: 'Expert — EMR, S3, Redshift, Glue, Lambda, CDK' },
        { label: 'PySpark', value: 0.92, detail: 'Expert — 45B+ records/month processing at scale' },
        { label: 'Airflow', value: 0.93, detail: 'Expert — 34 production DAGs, complex orchestration' },
        { label: 'SQL', value: 0.92, detail: 'Expert — Hive, Redshift, PostgreSQL, Athena' },
        { label: 'Hadoop', value: 0.78, detail: 'Advanced — 100TB cluster, 750+ nodes (legacy)' },
        { label: 'Data Modeling', value: 0.85, detail: 'Advanced — Dimensional, SCD, Bronze-Silver-Gold' }
    ];

    let radarPoints = [];
    let hoveredSkill = -1;
    let radarAnimProgress = 0;
    let radarAnimating = false;

    function drawRadarChart(animValue) {
        const radarCanvas = document.getElementById('skills-radar');
        if (!radarCanvas) return;

        const ctx = radarCanvas.getContext('2d');
        const size = 360;
        const center = size / 2;
        const radius = 130;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const progress = animValue !== undefined ? animValue : 1;

        const angleStep = (Math.PI * 2) / radarSkills.length;
        ctx.clearRect(0, 0, size, size);
        radarPoints = [];

        // Grid rings
        for (let ring = 1; ring <= 4; ring++) {
            const r = (radius / 4) * ring;
            ctx.beginPath();
            for (let i = 0; i <= radarSkills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Axis lines
        radarSkills.forEach((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(center + radius * Math.cos(angle), center + radius * Math.sin(angle));
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Filled area
        ctx.beginPath();
        radarSkills.forEach((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * skill.value * progress;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            radarPoints.push({ x, y, skill, index: i });
        });
        ctx.closePath();
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
        gradient.addColorStop(0, isDark ? 'rgba(77, 159, 255, 0.35)' : 'rgba(0, 102, 255, 0.2)');
        gradient.addColorStop(1, isDark ? 'rgba(77, 159, 255, 0.05)' : 'rgba(0, 102, 255, 0.03)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = isDark ? '#4d9fff' : '#0066ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots and labels
        radarSkills.forEach((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * skill.value * progress;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            const isHovered = i === hoveredSkill;

            // Highlight glow on hover
            if (isHovered) {
                ctx.beginPath();
                ctx.arc(x, y, 14, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? 'rgba(77, 159, 255, 0.15)' : 'rgba(0, 102, 255, 0.1)';
                ctx.fill();
            }

            // Dot
            ctx.beginPath();
            ctx.arc(x, y, isHovered ? 7 : 5, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#4d9fff' : '#0066ff';
            ctx.fill();
            ctx.strokeStyle = isDark ? '#1a1a1a' : '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Labels
            const labelR = radius + 24;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);
            ctx.font = (isHovered ? '600' : '500') + ' 11px Inter, sans-serif';
            ctx.fillStyle = isHovered
                ? (isDark ? '#4d9fff' : '#0066ff')
                : (isDark ? '#a0a0a0' : '#555');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.label, lx, ly);
        });
    }

    // Animate radar on scroll
    function animateRadar() {
        if (radarAnimating) return;
        radarAnimating = true;
        const duration = 1000;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            radarAnimProgress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - radarAnimProgress, 3);
            drawRadarChart(eased);
            if (radarAnimProgress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Radar hover interaction
    const radarCanvas = document.getElementById('skills-radar');
    const tooltip = document.getElementById('radar-tooltip');

    if (radarCanvas && tooltip) {
        radarCanvas.addEventListener('mousemove', (e) => {
            const rect = radarCanvas.getBoundingClientRect();
            const scaleX = 360 / rect.width;
            const scaleY = 360 / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;

            let found = -1;
            radarPoints.forEach((point, i) => {
                const dx = mx - point.x;
                const dy = my - point.y;
                if (Math.sqrt(dx * dx + dy * dy) < 20) {
                    found = i;
                }
            });

            if (found !== hoveredSkill) {
                hoveredSkill = found;
                drawRadarChart();

                if (found >= 0) {
                    const skill = radarSkills[found];
                    tooltip.textContent = skill.detail;
                    tooltip.classList.add('visible');

                    const wrapperRect = radarCanvas.parentElement.getBoundingClientRect();
                    const tooltipX = Math.min(Math.max(10, e.clientX - wrapperRect.left), wrapperRect.width - 10);
                    const tooltipY = e.clientY - wrapperRect.top - 40;
                    tooltip.style.left = tooltipX + 'px';
                    tooltip.style.top = tooltipY + 'px';
                    tooltip.style.transform = 'translateX(-50%)';
                } else {
                    tooltip.classList.remove('visible');
                }
            }
        });

        radarCanvas.addEventListener('mouseleave', () => {
            hoveredSkill = -1;
            drawRadarChart();
            tooltip.classList.remove('visible');
        });

        radarCanvas.addEventListener('click', (e) => {
            const rect = radarCanvas.getBoundingClientRect();
            const scaleX = 360 / rect.width;
            const scaleY = 360 / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;

            let found = -1;
            radarPoints.forEach((point, i) => {
                const dx = mx - point.x;
                const dy = my - point.y;
                if (Math.sqrt(dx * dx + dy * dy) < 35) {
                    found = i;
                }
            });

            if (found >= 0) {
                hoveredSkill = found;
                drawRadarChart();
                const skill = radarSkills[found];
                tooltip.textContent = skill.detail;
                tooltip.classList.add('visible');
                const wrapperRect = radarCanvas.parentElement.getBoundingClientRect();
                const tooltipX = Math.min(Math.max(10, e.clientX - wrapperRect.left), wrapperRect.width - 10);
                const tooltipY = e.clientY - wrapperRect.top - 44;
                tooltip.style.left = tooltipX + 'px';
                tooltip.style.top = tooltipY + 'px';
                tooltip.style.transform = 'translateX(-50%)';
            } else {
                hoveredSkill = -1;
                drawRadarChart();
                tooltip.classList.remove('visible');
            }
        });

        document.addEventListener('click', (e) => {
            if (!radarCanvas.contains(e.target)) {
                hoveredSkill = -1;
                drawRadarChart();
                tooltip.classList.remove('visible');
            }
        });

        // Observe to trigger animation
        const radarObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateRadar();
                radarObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.3 });
        radarObserver.observe(radarCanvas);
    }

    // ============ SCROLL ANIMATIONS ============
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => { entry.target.classList.add('visible'); }, delay);
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

    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const text = el.textContent;
        const match = text.match(/^([\$]?)([\d.]+)([B+\+%]*.*)/);
        if (!match) return;
        const prefix = match[1], target = parseFloat(match[2]), suffix = match[3];
        const duration = 1500, start = performance.now();
        const isDecimal = text.includes('.');

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = target * eased;
            el.textContent = isDecimal ? prefix + current.toFixed(0) + suffix : prefix + Math.floor(current) + suffix;
            if (progress < 1) requestAnimationFrame(update); else el.textContent = text;
        }
        requestAnimationFrame(update);
    }

    // Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = navLinks.querySelectorAll('a:not(.nav-cta)');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 150;
        let currentSection = '';
        sections.forEach(section => { if (scrollY >= section.offsetTop) currentSection = section.getAttribute('id'); });
        allNavLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active-link');
        });
    });

    // Hero parallax
    const heroStats = document.querySelector('.hero-stats');
    const heroTitle = document.querySelector('.hero-title');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            if (heroStats) heroStats.style.transform = `translateY(${scrollY * 0.15}px)`;
            if (heroTitle) heroTitle.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
        }
    });

    // Magnetic buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
});
