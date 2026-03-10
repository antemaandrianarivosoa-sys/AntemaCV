/* ============================================
   CV - ANDRIANARIVOSOA Antema Fiderana
   Fichier JavaScript externe
   ============================================ */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Gestion du thème (Mode Sombre/Clair)
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    
    if (themeToggle) {
        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            
            // Mettre à jour le texte du bouton
            if (document.body.classList.contains("dark-mode")) {
                this.textContent = "☀️ Mode Clair";
                // Sauvegarder la préférence
                localStorage.setItem('theme', 'dark');
            } else {
                this.textContent = "🌙 Mode Sombre";
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Restaurer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = "☀️ Mode Clair";
        }
    }
    
    // ==========================================
    // Modal pour affichage des certifications
    // ==========================================
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    
    // Fonction pour ouvrir le modal
    window.openModal = function(src) {
        if (modal && modalImg) {
            modalImg.src = src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        }
    };
    
    // Fonction pour fermer le modal
    window.closeModal = function() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll
            
            // Nettoyer la source après l'animation
            setTimeout(() => {
                if (modalImg) modalImg.src = '';
            }, 300);
        }
    };
    
    // Ajouter les événements de clic sur les certifications
    const certLinks = document.querySelectorAll('.cert-item a, .cert-thumb');
    
    certLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Si Ctrl ou Cmd est pressé, ouvrir dans un nouvel onglet normalement
            if (e.ctrlKey || e.metaKey) {
                return; // Laisser le comportement par défaut
            }
            
            e.preventDefault();
            const imgSrc = this.href;
            openModal(imgSrc);
        });
    });
    
    // Fermer le modal en cliquant à l'extérieur
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // ==========================================
    // Animation au scroll (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes et sections
    const animatedElements = document.querySelectorAll('.card, .cert-item, .sololearn-section');
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // Smooth scroll pour les liens d'ancrage
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==========================================
    // Effet de chargement progressif des images
    // ==========================================
    const certImages = document.querySelectorAll('.cert-item img, .cert-thumb img');
    
    certImages.forEach(function(img) {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Si l'image est déjà en cache
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    console.log('CV de ANDRIANARIVOSOA Antema Fiderana chargé avec succès!');
    
});
