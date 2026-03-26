// Validação e envio do formulário
document.addEventListener('DOMContentLoaded', function() {
    // Ano automático no footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Configurar links do WhatsApp
    let whatsappNumber = '119622334151'; // Número padrão (edite no config.js)
    let whatsappMessage = 'Olá,%20gostaria%20de%20um%20orçamento%20para%20piso';
    
    // Tentar carregar do config.js se disponível
    if (typeof CONFIG !== 'undefined') {
        whatsappNumber = CONFIG.whatsappNumber;
        whatsappMessage = CONFIG.whatsappMessage || whatsappMessage;
    }
    
    const whatsappLink = `https://wa.me/55${whatsappNumber}?text=${whatsappMessage}`;
    
    // Atualizar todos os links do WhatsApp
    const whatsappLinks = [
        document.getElementById('whatsapp-hero'),
        document.getElementById('whatsapp-cta'),
        document.getElementById('whatsapp-footer'),
        document.getElementById('whatsapp-float'),
        document.getElementById('whatsapp-nav'),
        document.getElementById('whatsapp-nav-mobile')
    ];
    
    whatsappLinks.forEach(link => {
        if (link) {
            link.href = whatsappLink;
        }
    });
    
    // Formatar e atualizar telefone no footer
    const phoneFooter = document.getElementById('phone-footer');
    if (phoneFooter) {
        const formattedPhone = formatPhone(whatsappNumber);
        phoneFooter.textContent = formattedPhone;
        phoneFooter.href = `tel:+55${whatsappNumber}`;
    }

    // Formatar e atualizar telefone na seção de contato
    const phoneContact = document.getElementById('phone-contact');
    if (phoneContact) {
        const formattedPhone = formatPhone(whatsappNumber);
        phoneContact.textContent = formattedPhone;
    }
    
    // Função para formatar telefone
    function formatPhone(phone) {
        if (phone.length === 11) {
            return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
        } else if (phone.length === 10) {
            return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6)}`;
        }
        return phone;
    }
    
    const form = document.getElementById('contactForm');
    const telefoneInput = document.getElementById('telefone');
    
    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    // Inicializar EmailJS se disponível
    if (typeof emailjs !== 'undefined' && CONFIG.emailjs && CONFIG.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(CONFIG.emailjs.publicKey);
    }
    
    // Função de validação dos campos do formulário
    function validateForm() {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const cidade = document.getElementById('cidade').value.trim();

        // Validações
        if (!nome || nome.length < 3) {
            showMessage('Por favor, insira um nome válido (mínimo 3 caracteres).', 'error');
            return null;
        }

        if (!telefone || telefone.length < 14) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            return null;
        }

        if (!cidade || cidade.length < 2) {
            showMessage('Por favor, insira uma cidade válida.', 'error');
            return null;
        }

        return {
            nome: nome,
            telefone: telefone,
            cidade: cidade,
            mensagem: document.getElementById('mensagem').value.trim() || 'Gostaria de solicitar um orçamento para instalação de piso.'
        };
    }

    // Botão de envio por Email
    const submitEmailButton = document.getElementById('submit-email');
    if (submitEmailButton) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar formulário
            const formData = validateForm();
            if (!formData) return;

            // Botão de submit
            const originalText = submitEmailButton.innerHTML;
            submitEmailButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            submitEmailButton.disabled = true;

            // Verificar se EmailJS está configurado
            if (typeof emailjs === 'undefined' || !CONFIG.emailjs || CONFIG.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
                showMessage('EmailJS não está configurado. Por favor, configure no arquivo config.js ou entre em contato pelo WhatsApp.', 'error');
                submitEmailButton.innerHTML = originalText;
                submitEmailButton.disabled = false;
                return;
            }

            // Enviar via EmailJS
            const templateParams = {
                from_name: formData.nome,
                from_phone: formData.telefone,
                from_city: formData.cidade,
                message: formData.mensagem,
                to_email: 'givaldodecor@hotmail.com'
            };

            emailjs.send(
                CONFIG.emailjs.serviceId,
                CONFIG.emailjs.templateId,
                templateParams
            )
            .then(function(response) {
                showMessage('Orçamento enviado com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                submitEmailButton.innerHTML = originalText;
                submitEmailButton.disabled = false;
            }, function(error) {
                console.error('Erro ao enviar email:', error);
                showMessage('Erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.', 'error');
                submitEmailButton.innerHTML = originalText;
                submitEmailButton.disabled = false;
            });
        });
    }

    // Botão de envio por WhatsApp
    const submitWhatsAppButton = document.getElementById('submit-whatsapp');
    if (submitWhatsAppButton) {
        submitWhatsAppButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Validar formulário
            const formData = validateForm();
            if (!formData) return;

            // Formatar mensagem do WhatsApp
            const mensagemWhatsApp = `Olá! Meu nome é ${formData.nome}.%0ATelefone: ${formData.telefone}%0ACidade: ${formData.cidade}%0AMensagem: ${formData.mensagem}%0A%0AGostaria de solicitar um orçamento para instalação de piso.`;

            // Abrir WhatsApp
            const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${mensagemWhatsApp}`;
            window.open(whatsappUrl, '_blank');

            // Limpar formulário após envio
            showMessage('Redirecionando para o WhatsApp...', 'success');
            setTimeout(() => {
                form.reset();
            }, 1000);
        });
    }
    
    // Função para exibir mensagens de feedback
    function showMessage(text, type) {
        // Remover mensagem anterior se existir
        const existingMessage = document.getElementById('form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar elemento de mensagem
        const messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        messageDiv.setAttribute('role', 'alert');
        messageDiv.setAttribute('aria-live', 'polite');
        
        // Cores baseadas no tipo
        let bgColor = 'bg-blue-500';
        let icon = 'fa-info-circle';
        
        if (type === 'success') {
            bgColor = 'bg-green-500';
            icon = 'fa-check-circle';
        } else if (type === 'error') {
            bgColor = 'bg-red-500';
            icon = 'fa-exclamation-circle';
        }
        
        messageDiv.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg mb-6 flex items-center`;
        messageDiv.innerHTML = `
            <i class="fas ${icon} mr-3 text-xl" aria-hidden="true"></i>
            <span>${text}</span>
            <button onclick="this.parentElement.remove()" 
                    class="ml-auto text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
                    aria-label="Fechar mensagem">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;
        
        // Inserir antes do formulário
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-remover após 5 segundos (exceto erros)
        if (type !== 'error') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        // Scroll suave para a mensagem
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Scroll suave para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ignorar links do WhatsApp e links vazios
            if (this.id && (this.id.includes('whatsapp') || href === '#')) {
                return; // Deixa o link do WhatsApp funcionar normalmente
            }
            
            if (href !== '#' && href !== '#contato') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Altura da navbar
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    const mobileMenu = document.querySelector('.mobile-menu-items');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenu.style.maxHeight = '0';
                        const button = document.getElementById('mobile-menu-button');
                        if (button) {
                            button.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                        }
                    }
                }
            }
        });
    });
    
    // Menu mobile toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuItems = document.querySelector('.mobile-menu-items');
    
    if (mobileMenuButton && mobileMenuItems) {
        mobileMenuButton.addEventListener('click', function() {
            const isActive = mobileMenuItems.classList.contains('active');
            mobileMenuItems.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
            
            if (!isActive) {
                mobileMenuItems.style.maxHeight = '500px';
                this.innerHTML = '<i class="fas fa-times text-2xl" aria-hidden="true"></i>';
            } else {
                mobileMenuItems.style.maxHeight = '0';
                this.innerHTML = '<i class="fas fa-bars text-2xl" aria-hidden="true"></i>';
            }
        });
    }
    
    // Efeito de scroll na navbar
    const navbar = document.querySelector('.navbar-scroll');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-[0_2px_10px_rgba(0,0,0,0.1)]');
            } else {
                navbar.classList.remove('shadow-[0_2px_10px_rgba(0,0,0,0.1)]');
            }
        });
    }
});

// Animação de entrada suave para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar cards das seções de serviços e diferenciais
    const serviceCards = document.querySelectorAll('#servicos .grid > div');
    const differentialCards = document.querySelectorAll('#diferenciais .grid > div');
    const allCards = [...serviceCards, ...differentialCards];
    
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Lightbox para galeria
    initLightbox();
});

// Lightbox Gallery
function initLightbox() {
    const galleryImages = document.querySelectorAll('[data-gallery="gallery"]');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const currentIndexSpan = document.getElementById('current-index');
    const totalImagesSpan = document.getElementById('total-images');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryImages);
    
    // Atualizar total de imagens
    if (totalImagesSpan) {
        totalImagesSpan.textContent = images.length;
    }

    // Abrir lightbox ao clicar na imagem
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Card "+X" para ver mais fotos
    const morePhotosCard = document.getElementById('more-photos-card');
    if (morePhotosCard) {
        morePhotosCard.addEventListener('click', () => {
            openLightbox(0); // Abre o lightbox na primeira imagem
        });
    }
    
    // Função para abrir lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        if (lightboxModal) {
            lightboxModal.classList.remove('hidden');
            lightboxModal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevenir scroll do body
        }
    }
    
    // Função para fechar lightbox
    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.add('hidden');
            lightboxModal.classList.remove('flex');
            document.body.style.overflow = ''; // Restaurar scroll do body
        }
    }
    
    // Função para atualizar imagem no lightbox
    function updateLightboxImage() {
        if (images[currentImageIndex] && lightboxImage) {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt || `Imagem ${currentImageIndex + 1}`;
            
            if (currentIndexSpan) {
                currentIndexSpan.textContent = currentImageIndex + 1;
            }
        }
    }
    
    // Navegação anterior
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }
    
    // Navegação próxima
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Fechar ao clicar no fundo (mas não na imagem)
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.id === 'lightbox-modal') {
                closeLightbox();
            }
        });
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || lightboxModal.classList.contains('hidden')) {
            return;
        }
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Prevenir propagação de clique na imagem
    if (lightboxImage) {
        lightboxImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Função para toggle do collapse "Mais Escolhidos"
function toggleMaisEscolhidos(marca) {
    const collapse = document.getElementById(`collapse-${marca}`);
    if (collapse) {
        collapse.classList.toggle('hidden');
    }
}

// Modal para visualizar imagens dos catálogos em tamanho maior
function openImageModal(imageSrc) {
    // Criar modal se não existir
    let modal = document.getElementById('catalog-image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'catalog-image-modal';
        modal.className = 'fixed inset-0 z-[3000] hidden items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="relative w-full h-full flex items-center justify-center p-4">
                <button onclick="closeImageModal()" 
                        class="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors duration-300 z-10 bg-black bg-opacity-50 rounded-full p-3 md:p-4 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Fechar imagem">
                    <i class="fas fa-times text-2xl md:text-3xl"></i>
                </button>
                <img id="catalog-modal-image" 
                     src="" 
                     alt="Catálogo" 
                     class="max-w-full max-h-[90vh] md:max-h-[95vh] object-contain rounded-lg shadow-2xl">
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modalImage = document.getElementById('catalog-modal-image');
    if (modalImage) {
        modalImage.src = imageSrc;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('catalog-image-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// Fechar modal ao clicar no fundo
document.addEventListener('click', function(e) {
    const modal = document.getElementById('catalog-image-modal');
    if (modal && e.target === modal) {
        closeImageModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});