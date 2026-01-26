// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DO WHATSAPP
// ═══════════════════════════════════════════════════════════════
// 
// ⬇️ ALTERE O NÚMERO ABAIXO COM SEU WHATSAPP ⬇️
// 
// Formato: apenas números, com DDD
// Exemplos:
//   - São Paulo: 11999999999
//   - Rio de Janeiro: 21999999999
//   - Belo Horizonte: 31999999999
//
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
    whatsappNumber: '119622334151', // ⬅️ EDITE AQUI: Coloque seu número (apenas números, com DDD)
    whatsappMessage: 'Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%205G%20Decorações.%0A%0A📋%20Serviços%20Oferecidos:%0A✅%20Venda%20de%20Pisos%20Laminados%0A✅%20Instalação%20Profissional%20de%20Pisos%0A✅%20Pisos%20Click%0A✅%20Acabamentos%20e%20Rodapés%0A%0A🏆%20Diferenciais:%0A•%20Profissionais%20Qualificados%20e%20Experientes%0A•%20Orçamento%20Rápido%20pelo%20WhatsApp%0A•%20Atendimento%20em%20toda%20a%20região%0A•%20Garantia%20de%20Serviço%0A%0AGostaria%20de%20solicitar%20um%20orçamento%20personalizado.',
    
    // ═══════════════════════════════════════════════════════════════
    // CONFIGURAÇÃO DO EMAILJS
    // ═══════════════════════════════════════════════════════════════
    // 
    // ⬇️ CONFIGURE SEU EMAILJS ABAIXO ⬇️
    // 
    // 1. Crie uma conta em https://www.emailjs.com
    // 2. Crie um serviço de email (Gmail, Outlook, etc)
    // 3. Crie um template de email
    // 4. Preencha os dados abaixo:
    //
    // ═══════════════════════════════════════════════════════════════
    
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY', // ⬅️ Sua Public Key do EmailJS
        serviceId: 'YOUR_SERVICE_ID',  // ⬅️ ID do seu serviço de email
        templateId: 'YOUR_TEMPLATE_ID' // ⬅️ ID do template de email
    }
};
