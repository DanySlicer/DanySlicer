document.documentElement.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.main-nav ul');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const yearSpan = document.getElementById('year');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('.product-card, .story-card, .lookbook-item, .timeline-card, .contact-card, .aside-card').forEach((el) => {
    observer.observe(el);
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            const isActive = btn === button;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
        });

        productCards.forEach((card) => {
            const category = card.dataset.category;
            const show = filter === 'all' || category === filter;
            card.style.display = show ? 'grid' : 'none';
        });
    });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    document.querySelectorAll('.product-card, .story-card, .timeline-card').forEach((card, index) => {
        card.style.setProperty('--delay', `${index * 60}ms`);
    });
}
