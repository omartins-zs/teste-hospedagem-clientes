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
3. Use este template como base:

```
Assunto: Novo Orçamento - 5G Decorações

Olá,

Você recebeu um novo pedido de orçamento:

Nome: {{from_name}}
Telefone: {{from_phone}}
Cidade: {{from_city}}
Mensagem: {{message}}

---
Este email foi enviado através do formulário do site.
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
