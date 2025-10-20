# 🚀 API Backend - Solar Pulse

API REST para gerenciamento de orçamentos e envio de emails para o aplicativo Solar Pulse.

## 📦 Tecnologias

- **Node.js** + **Express** - Framework web
- **Nodemailer** - Envio de emails
- **CORS** - Permitir requisições do app
- **dotenv** - Variáveis de ambiente

---

## 🛠️ Instalação Local

### 1. Instalar dependências:
```bash
npm install
```

### 2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e preencha:
```env
PORT=3000
EMAIL_USER=seuemail@gmail.com
EMAIL_PASSWORD=sua_senha_app
```

### 3. Rodar o servidor:
```bash
npm start
```

**Servidor rodando em:** http://localhost:3000

---

## 🔐 Configurar Email Gmail

### Para usar Gmail, você precisa gerar uma "Senha de App":

1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione **App:** Outro (nome personalizado)
3. Digite: "API Solar Pulse"
4. Clique em **Gerar**
5. Copie a senha de 16 caracteres
6. Cole no `.env` em `EMAIL_PASSWORD`

⚠️ **NÃO USE SUA SENHA NORMAL DO GMAIL!**

---

## 📡 Endpoints Disponíveis

### ✅ **GET /health**
Verifica se a API está online.

**Exemplo:**
```bash
curl http://localhost:3000/health
```

**Resposta:**
```json
{
  "status": "ok",
  "message": "API Solar Pulse está funcionando!",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

---

### 📧 **POST /api/budget**
Solicitar orçamento e enviar email.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "propertyType": "residencial",
  "averageEnergyBill": 350.50,
  "roofArea": 50,
  "message": "Gostaria de um orçamento"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Orçamento solicitado com sucesso! Verifique seu email."
}
```

---

### 💬 **POST /api/contact**
Enviar mensagem de contato.

**Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 88888-8888",
  "subject": "Dúvida sobre instalação",
  "message": "Quanto tempo leva a instalação?"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

---

### 👤 **POST /api/users**
Cadastrar novo usuário e enviar email de boas-vindas.

**Body:**
```json
{
  "name": "Pedro Costa",
  "email": "pedro@email.com",
  "phone": "(11) 77777-7777",
  "metadata": {
    "source": "app-mobile"
  }
}
```

---

## 🌐 Deploy no Render

### 1. Criar conta no Render:
🔗 https://render.com

### 2. Criar novo Web Service:
- Conecte seu repositório GitHub
- Configure:
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`

### 3. Adicionar variáveis de ambiente:
No dashboard do Render, adicione:
```
EMAIL_USER=seuemail@gmail.com
EMAIL_PASSWORD=sua_senha_app
```

### 4. Deploy automático:
✅ Cada push no GitHub faz deploy automático!

### 5. URL da API:
Após o deploy, você receberá uma URL tipo:
```
https://api-solar-pulse-abc123.onrender.com
```

### 6. Atualizar no app:
Edite `src/services/api.ts`:
```typescript
const API_URL = 'https://api-solar-pulse-abc123.onrender.com/api';
```

---

## ⚡ Testando a API

### Testar health check:
```bash
curl https://sua-api.onrender.com/health
```

### Testar orçamento:
```bash
curl -X POST https://sua-api.onrender.com/api/budget \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "phone": "(11) 99999-9999",
    "propertyType": "residencial",
    "averageEnergyBill": 300,
    "roofArea": 40,
    "message": "Teste de API"
  }'
```

---

## 📧 Serviços de Email Alternativos

### **SendGrid** (Recomendado para produção)
- 100 emails grátis por dia
- Alta deliverability
- Dashboard profissional

**Configuração:**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### **Mailgun**
- 5000 emails grátis por mês
- API simples

### **Amazon SES**
- Barato ($0.10 por 1000 emails)
- Integração com AWS

---

## 🐛 Troubleshooting

### ❌ Erro: "Invalid login"
- Certifique-se de usar **Senha de App** do Gmail
- Não use sua senha normal

### ❌ Erro: "Connection timeout"
- Verifique se o servidor está rodando
- Verifique configurações de firewall

### ❌ Email não chega:
- Verifique pasta de spam
- Verifique credenciais no `.env`
- Teste o transporter com `transporter.verify()`

---

## 📝 Licença

MIT - Solar Pulse Team

---

## 📞 Suporte

Dúvidas? Abra uma issue no repositório!

---

**Desenvolvido com ❤️ para Solar Pulse** ⚡🌞
