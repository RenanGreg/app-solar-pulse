# 📧 API de Envio de Emails - Solar Pulse

## 📁 Arquivos Criados/Atualizados

### ✅ Criados:
1. **src/services/api.ts** - Serviço de comunicação com a API

### ✅ Atualizados:
2. **src/pages/budget/index.tsx** - Página de orçamento integrada
3. **src/pages/contact/index.tsx** - Página de contato integrada

### ✅ Dependências Instaladas:
- `axios` - Para comunicação HTTP com a API

---

## 🚀 Como Configurar

### 1️⃣ **Atualizar a URL da API**

Após fazer o deploy da sua API no Render, edite o arquivo:

**`src/services/api.ts`** (linha 5):

```typescript
// ⚠️ Troque pela URL real da sua API no Render
const API_URL = 'https://sua-api.onrender.com/api';
```

**Exemplo:**
```typescript
const API_URL = 'https://api-solar-pulse-abc123.onrender.com/api';
```

---

## 📦 Backend API Necessário

Você precisará criar uma API REST no backend com os seguintes endpoints:

### **POST /api/budget**
Recebe solicitações de orçamento e envia email.

**Body esperado:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "propertyType": "residencial",
  "averageEnergyBill": 350.50,
  "roofArea": 0,
  "message": "Endereço: Rua ABC, 123..."
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Orçamento solicitado com sucesso!"
}
```

---

### **POST /api/contact**
Recebe mensagens de contato e envia email.

**Body esperado:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "",
  "subject": "Contato via App Solar Pulse",
  "message": "Gostaria de mais informações..."
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

---

### **GET /health**
Verifica se a API está online.

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "API Solar Pulse está funcionando!"
}
```

---

## 🛠️ Estrutura de Backend Sugerida (Node.js + Express)

### **Pacotes necessários:**
```bash
npm install express cors dotenv nodemailer
```

### **Exemplo de código para envio de emails:**

```javascript
const nodemailer = require('nodemailer');

// Configurar transporter (Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Endpoint de orçamento
app.post('/api/budget', async (req, res) => {
  const { name, email, phone, propertyType, averageEnergyBill, roofArea, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🌞 Solicitação de Orçamento - Solar Pulse',
      html: `
        <h2>Olá ${name}!</h2>
        <p>Recebemos sua solicitação de orçamento.</p>
        <h3>Dados informados:</h3>
        <ul>
          <li><strong>Tipo de imóvel:</strong> ${propertyType}</li>
          <li><strong>Conta de energia média:</strong> R$ ${averageEnergyBill}</li>
          <li><strong>Observações:</strong> ${message}</li>
        </ul>
        <p>Nossa equipe entrará em contato em breve!</p>
      `
    });

    res.json({
      success: true,
      message: 'Orçamento solicitado com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar email'
    });
  }
});
```

---

## 🔐 Variáveis de Ambiente (.env)

Crie um arquivo `.env` no backend:

```env
PORT=3000
EMAIL_USER=seuemail@gmail.com
EMAIL_PASSWORD=sua_senha_app_gmail
```

⚠️ **Para Gmail:** Use "Senhas de App" em vez da senha normal:
1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma senha de app
3. Use essa senha no `.env`

---

## 📤 Serviços de Email Recomendados

### 1. **SendGrid** (Recomendado)
- ✅ 100 emails grátis por dia
- ✅ API simples
- ✅ Alta deliverability
- 🔗 https://sendgrid.com

### 2. **Gmail SMTP**
- ✅ Grátis
- ⚠️ Limite de 500 emails/dia
- ⚠️ Requer senha de app

### 3. **Mailgun**
- ✅ 5000 emails grátis por mês
- ✅ API profissional
- 🔗 https://mailgun.com

---

## 🎯 Exemplo Completo de Backend

Veja no repositório exemplo:
- Backend com Node.js + Express
- Envio de emails com Nodemailer
- Deploy no Render

---

## 🧪 Como Testar

### 1. **Testar localmente:**
```bash
# No backend
npm start

# No app
# Altere API_URL para: http://localhost:3000/api
```

### 2. **Testar no app:**
1. Acesse a página de Orçamento
2. Preencha o formulário
3. Clique em "Solicitar Orçamento"
4. Verifique se o email foi recebido

---

## 📱 Funcionalidades Implementadas

### ✅ Página de Orçamento:
- Formulário completo
- Validação de campos obrigatórios
- Loading durante envio
- Feedback visual (sucesso/erro)
- Integração com API

### ✅ Página de Contato:
- Formulário de contato
- Validação de campos
- Loading durante envio
- Feedback visual
- Integração com API

### ✅ Serviço de API:
- Tipagem TypeScript
- Tratamento de erros
- Timeout configurado (30s para cold start)
- Interceptor de erros
- Funções organizadas e documentadas

---

## 🔧 Troubleshooting

### **Erro: "Network Error"**
- Verifique se a URL da API está correta
- Verifique se o backend está rodando
- Verifique as configurações de CORS no backend

### **Erro: "Timeout"**
- O Render tem "cold start" (primeira requisição demora)
- Aumente o timeout se necessário (já configurado para 30s)

### **Email não chega:**
- Verifique spam
- Verifique credenciais do SMTP
- Verifique logs do backend

---

## 📞 Suporte

Para dúvidas, abra uma issue no repositório ou entre em contato!

---

**Desenvolvido com ❤️ para Solar Pulse** ⚡🌞
