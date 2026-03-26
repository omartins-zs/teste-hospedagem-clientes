# Configuração do EmailJS

## 📧 Como Configurar o EmailJS

### 1. Criar Conta no EmailJS
1. Acesse https://www.emailjs.com
2. Crie uma conta gratuita
3. Faça login no painel

### 2. Criar um Serviço de Email
1. No painel, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor (Gmail, Outlook, etc)
4. Siga as instruções para conectar
5. Anote o **Service ID** gerado

### 3. Criar um Template de Email
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Use este template no **Code Editor** (ícone `<>`) do EmailJS:

**Assunto:** 📝 Novo Orçamento: {{from_name}} - 5G Decorações

**Conteúdo (Code Editor):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #F5F1E8; padding: 20px;">
  <div style="max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <div style="text-align: center; margin-bottom: 24px;">
      <a style="text-decoration: none; outline: none" href="https://5gdecoracoes.com.br" target="_blank">
        <img
          style="height: 60px; vertical-align: middle"
          height="60px"
          src="https://5gdecoracoes.com.br/assets/images/logos/Logo_Melhorado_Sem_Fundo.png"
          alt="5G Decorações"
        />
      </a>
    </div>
    
    <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #F5F1E8; padding-bottom: 10px;">Novo Pedido de Orçamento</h2>
    
    <p style="color: #4b5563;">Você recebeu uma nova solicitação através do formulário do site:</p>
    
    <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>👤 Nome:</strong> {{from_name}}</p>
      <p style="margin: 0 0 10px 0;"><strong>📱 WhatsApp:</strong> {{from_phone}}</p>
      <p style="margin: 0 0 10px 0;"><strong>📍 Cidade:</strong> {{from_city}}</p>
      <p style="margin: 0;"><strong>💬 Mensagem:</strong></p>
      <div style="margin-top: 8px; padding: 12px; border-left: 4px solid #b45309; background-color: #fff; font-style: italic; color: #374151;">
        {{message}}
      </div>
    </div>

    <p style="text-align: center; margin-top: 30px;">
      <a
        style="
          display: inline-block;
          text-decoration: none;
          outline: none;
          color: #ffffff;
          background-color: #25d366;
          padding: 12px 32px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 16px;
        "
        href="https://wa.me/{{from_phone}}"
        target="_blank"
      >
        Responder via WhatsApp
      </a>
    </p>
    
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
      Este é um email automático enviado pelo sistema de orçamentos.<br />
      <strong>5G Decorações - Pisos Laminados e Vinílicos</strong>
    </p>
  </div>
</div>
```

4. Anote o **Template ID** gerado

### 4. Obter a Public Key
1. Vá em **Account** > **General**
2. Copie sua **Public Key**

### 5. Configurar no Site
1. Abra o arquivo `config.js`
2. Preencha os dados na seção `emailjs`:

```javascript
emailjs: {
    publicKey: 'sua_public_key_aqui',
    serviceId: 'seu_service_id_aqui',
    templateId: 'seu_template_id_aqui'
}
```

### 6. Variáveis do Template
O formulário envia estas variáveis:
- `{{from_name}}` - Nome do cliente
- `{{from_phone}}` - Telefone/WhatsApp
- `{{from_city}}` - Cidade
- `{{message}}` - Mensagem (opcional)

### 7. Testar
1. Preencha o formulário no site
2. Envie
3. Verifique se o email chegou na sua caixa de entrada

## ⚠️ Fallback
Se o EmailJS não estiver configurado, o formulário redirecionará automaticamente para o WhatsApp como alternativa.

## 📝 Notas
- O plano gratuito do EmailJS permite 200 emails/mês
- Para mais emails, considere um plano pago
- Os emails são enviados diretamente do navegador (sem servidor)
