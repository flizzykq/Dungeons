// Main JavaScript file for World Wars website

document.addEventListener('DOMContentLoaded', function() {
    // Loader
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        const content = document.getElementById('content');
        
        setTimeout(() => {
            loader.style.opacity = '0';
            content.style.display = 'block';
            
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let isScrolling;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Navbar gizleme/gösterme
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // Scroll indicator kontrolü
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            document.querySelector('.scroll-indicator').style.opacity = '1';
        }, 150);

        document.querySelector('.scroll-indicator').style.opacity = '0';
    });

    // Add loading animation for download buttons
    document.querySelectorAll('a[href*="WorldWars.rar"]').forEach(button => {
        button.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-spinner fa-spin';
                
                // İndirme başladı bildirimi
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification('İndirme Başladı', {
                                body: 'World Wars indiriliyor...',
                                icon: '/images/blacktail.png'
                            });
                        }
                    });
                }

                // İndirme animasyonu
                this.classList.add('downloading');
                setTimeout(() => {
                    icon.className = 'fas fa-download';
                    this.classList.remove('downloading');
                }, 2000);
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Paralaks efekti
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.hero-section .container').forEach(container => {
            container.style.transform = `translateY(${scrolled * 0.3}px)`;
        });

        // Özellik kartları paralaks
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            const offset = (index + 1) * 0.1;
            card.style.transform = `translateY(${scrolled * offset}px)`;
        });
    });

    // Özellik kartları için hover efekti
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });

    // Animasyonlu elementler için Intersection Observer
    const animatedElements = document.querySelectorAll('.animate__animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    document.addEventListener("DOMContentLoaded", function () {
        const termsLink = document.getElementById("termsLink");
        const termsPopup = new bootstrap.Modal(document.getElementById("termsPopup"));
    
        termsLink.addEventListener("click", function (event) {
            event.preventDefault();
            termsPopup.show();
        });
    });
    
    
    animatedElements.forEach(el => {
        el.style.visibility = 'hidden';
        observer.observe(el);
    });

    // Smooth reveal animasyonu
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.feature-card, .hero-title, .hero-text');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Live Player Counter
    function updateLiveCounter() {
        const minPlayers = 7;
        const maxPlayers = 12;
    
        // Ana sayıyı 7 ile 12 arasında rastgele seç
        let baseCount = Math.floor(Math.random() * (maxPlayers - minPlayers + 1)) + minPlayers;
    
        // %1 ihtimalle (100’de 1) 7'nin altına veya 12'nin üstüne çıkart
        if (Math.random() < 0.01) { // 1% ihtimal
            if (Math.random() < 0.5) {
                baseCount = Math.floor(Math.random() * (minPlayers - 3)) + 3; // 3 ile 6 arasında sayı
            } else {
                baseCount = Math.floor(Math.random() * (15 - maxPlayers + 1)) + maxPlayers + 1; // 13 ile 20 arasında sayı
            }
        }
    
        // Mevcut sayıyı al ve animasyonla değiştir
        let currentCount = parseInt(document.querySelector('.live-count').textContent) || 0;
        animateValue(document.querySelector('.live-count'), currentCount, baseCount, 500);
    }
    
    // 12.5 saniyede (12500ms) bir fonksiyonu çalıştır
    setInterval(updateLiveCounter, 12500);
    

    // Yukarı doğru sayma animasyonu
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        
        let current = start;
        const step = end > start ? 1 : -1;
        
        function updateNumber() {
            current += step;
            element.textContent = current.toLocaleString();
            
            if ((step > 0 && current <= end) || (step < 0 && current >= end)) {
                setTimeout(updateNumber, stepTime);
            }
        }
        
        updateNumber();
    }

    // Her 5 saniyede bir canlı sayacı güncelle
    updateLiveCounter();
    setInterval(updateLiveCounter, 12500);

    // Random Stats Generator with Trends
    function generateRandomStats() {
        const stats = {
            players: Math.floor(Math.random() * (200 - 100) + 100),
            worlds: Math.floor(Math.random() * (200 - 100) + 100),
            porbles: Math.floor(Math.random() * (200 - 100) + 100),
            rating: Math.floor(Math.random() * (200 - 100) + 100)
        };

        // Trend değerlerini hesapla (hep pozitif olsun)
        const trends = {
            players: Math.floor(Math.random() * 15) + 5,
            worlds: Math.floor(Math.random() * 10) + 1,
            porbles: Math.floor(Math.random() * 8) + 2
        };

        document.querySelectorAll('.stat-number').forEach(stat => {
            const type = stat.parentElement.querySelector('.stat-text').textContent.toLowerCase();
            let value = 0;
            let currentValue = parseInt(stat.textContent.replace(/,/g, '')) || 0;
            
            if (type.includes('player')) {
                value = stats.players;
                updateTrend(stat.parentElement, trends.players, '%');
            } else if (type.includes('world')) {
                value = stats.worlds;
                updateTrend(stat.parentElement, trends.worlds, ' new');
            } else if (type.includes('porble')) {
                value = stats.porbles;
                updateTrend(stat.parentElement, trends.porbles, ' species');
            } else if (type.includes('rating')) {
                value = stats.rating;
                updateReviews(stat.parentElement);
            }
            
            // Yukarı doğru sayma animasyonu
            animateValue(stat, currentValue, value, 1000);
        });
    }

    function updateTrend(element, value, suffix) {
        const trend = element.querySelector('.trend-value');
        if (trend) {
            trend.textContent = `+${value}${suffix}`;
        }
    }

    function updateReviews(element) {
        const reviews = element.querySelector('.review-count');
        if (reviews) {
            const reviewCount = Math.floor(Math.random() * (5000 - 2000) + 2000);
            reviews.textContent = `based on ${reviewCount.toLocaleString()}+ reviews`;
        }
    }

    // Her 10 saniyede bir istatistikleri güncelle
    generateRandomStats();
    setInterval(generateRandomStats, 10000);

    // Stats Counter Animation
    function animateStats() {
        generateRandomStats();
    }

    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelector('.stats-section')?.forEach(section => {
        statsObserver.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            alert('Thank you for subscribing! We\'ll keep you updated.');
            this.reset();
        });
    }

    // Feature card hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Screenshot Modal Functionality
    document.querySelectorAll('.screenshot-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const modal = document.getElementById('screenshotModal');
            const modalImg = modal.querySelector('#modalImage');
            modalImg.src = img.src;
        });
    });

    // Enhanced Download Button
    document.querySelectorAll('.btn-download-xl, .btn-download-large').forEach(button => {
        button.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            const progressContainer = document.querySelector('.download-progress');
            const progressBar = progressContainer?.querySelector('.progress-bar');
            const statusText = progressContainer?.querySelector('.status-text');
            const speedText = progressContainer?.querySelector('.download-speed');

            if (icon && progressContainer && progressBar && statusText && speedText) {
                e.preventDefault();
                progressContainer.classList.remove('d-none');
                icon.className = 'fas fa-spinner fa-spin';
                
                // Show download notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Download Starting', {
                        body: 'Your World Wars download is starting. Please wait...',
                        icon: '/images/blacktail.png'
                    });
                }

                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 2;
                    if (progress >= 100) {
                        clearInterval(interval);
                        progressBar.style.width = '100%';
                        statusText.textContent = 'Download Complete!';
                        speedText.textContent = '';
                        icon.className = 'fas fa-check';
                        
                        setTimeout(() => {
                            progressContainer.classList.add('d-none');
                            icon.className = 'fas fa-download';
                            window.location.href = this.href;
                        }, 1000);
                    } else {
                        progressBar.style.width = `${progress}%`;
                        statusText.textContent = 'Downloading...';
                        const speed = Math.floor(Math.random() * (10 - 2) + 2);
                        speedText.textContent = `${speed} MB/s`;
                    }
                }, 100);
            }
        });
    });

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    // Animate requirements on scroll
    const requirementItems = document.querySelectorAll('.requirement-item');
    const requirementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                requirementsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    requirementItems.forEach(item => requirementsObserver.observe(item));

    // Smooth scroll to download section
    document.querySelector('a[href="#download"]')?.addEventListener('click', function(e) {
        e.preventDefault();
        const downloadSection = document.getElementById('download');
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}); 