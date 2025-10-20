# 🚀 GUIA DE DEPLOY NO RENDER - API SOLAR PULSE

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:
- ✅ Conta no GitHub
- ✅ Conta no Render (https://render.com) - **GRÁTIS**
- ✅ API no repositório: https://github.com/RenanGreg/api-solar-pulse
- ✅ Email Gmail com senha de app configurada

---

## 🎯 PASSO A PASSO COMPLETO

### 1️⃣ **Preparar o Repositório da API**

A API já está pronta no repositório: `https://github.com/RenanGreg/api-solar-pulse`

**Verifique se o repositório contém:**
- ✅ `package.json`
- ✅ `src/server.js`
- ✅ `.env.example`
- ✅ Todos os arquivos necessários

---

### 2️⃣ **Criar Conta no Render**

1. Acesse: **https://render.com**
2. Clique em **"Get Started for Free"**
3. Conecte com sua conta do GitHub
4. Autorize o Render a acessar seus repositórios

---

### 3️⃣ **Criar Web Service**

1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte o repositório: **`RenanGreg/api-solar-pulse`**
4. Clique em **"Connect"**

---

### 4️⃣ **Configurar o Web Service**

Preencha os campos:

#### **Informações Básicas:**
```
Name: api-solar-pulse
Region: Oregon (US West) - ou a mais próxima
Branch: main
Root Directory: (deixe em branco)
```

#### **Build & Deploy:**
```
Runtime: Node
Build Command: npm install
Start Command: npm start
```

#### **Instance Type:**
```
☑️ Free (Selecione o plano gratuito)
```

---

### 5️⃣ **Configurar Variáveis de Ambiente**

⚠️ **MUITO IMPORTANTE!** Clique em **"Advanced"** e adicione as variáveis de ambiente:

```bash
# Porta (obrigatório)
PORT=3001

# MongoDB Atlas (obrigatório)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/solar-pulse?retryWrites=true&w=majority

# Configuração de Email Gmail (obrigatório)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seuemail@gmail.com
EMAIL_PASSWORD=sua_senha_app_16_caracteres
EMAIL_FROM_NAME=Solar Pulse
EMAIL_FROM_ADDRESS=seuemail@gmail.com

# Segurança
NODE_ENV=production
FRONTEND_URL=exp://192.168.0.1:8081
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 📧 **Como obter EMAIL_PASSWORD (Senha de App do Gmail):**

1. Acesse: https://myaccount.google.com/apppasswords
2. Faça login na sua conta Google
3. Em **"Selecionar app"**, escolha **"Outro (nome personalizado)"**
4. Digite: **"API Solar Pulse Render"**
5. Clique em **"Gerar"**
6. Copie a senha de 16 caracteres (ex: `abcd efgh ijkl mnop`)
7. Cole em `EMAIL_PASSWORD` (sem espaços: `abcdefghijklmnop`)

⚠️ **NUNCA use sua senha normal do Gmail!**

#### 🗄️ **Configurar MongoDB Atlas (GRÁTIS):**

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um cluster gratuito (M0)
4. Vá em **"Database Access"** → Crie um usuário
5. Vá em **"Network Access"** → Adicione **0.0.0.0/0** (permitir de qualquer lugar)
6. Clique em **"Connect"** → **"Connect your application"**
7. Copie a string de conexão e substitua `<password>` pela senha do usuário

Exemplo de `MONGODB_URI`:
```
mongodb+srv://meuusuario:minhasenha@cluster0.abc123.mongodb.net/solar-pulse?retryWrites=true&w=majority
```

---

### 6️⃣ **Deploy!**

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (2-5 minutos)
3. Acompanhe os logs em tempo real

**Você verá:**
```
==> Cloning from https://github.com/RenanGreg/api-solar-pulse...
==> Running build command...
==> npm install
==> Starting service...
==> ✅ Servidor rodando na porta 3001
```

---

### 7️⃣ **Obter URL da API**

Após o deploy, você receberá uma URL tipo:
```
https://api-solar-pulse.onrender.com
```

⚠️ **Copie essa URL!** Você vai precisar dela no app.

---

### 8️⃣ **Testar a API**

#### **Teste 1: Health Check**
```bash
curl https://api-solar-pulse.onrender.com/health
```

**Resposta esperada:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-20T10:30:00.000Z"
}
```

#### **Teste 2: Enviar Orçamento**
```bash
curl -X POST https://api-solar-pulse.onrender.com/api/budget \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Usuario",
    "email": "seu-email@gmail.com",
    "phone": "(11) 99999-9999",
    "address": "São Paulo, SP",
    "powerBill": "R$ 300,00"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Solicitação de orçamento recebida com sucesso",
  "data": {
    "id": "...",
    "name": "Teste Usuario",
    "email": "seu-email@gmail.com",
    "emailSent": true
  }
}
```

✅ **Verifique seu email!** Você deve ter recebido um email de confirmação.

---

### 9️⃣ **Atualizar o App React Native**

Edite o arquivo: **`src/services/api.ts`**

```typescript
// Substitua pela URL do Render
const API_URL = __DEV__ 
  ? 'http://localhost:3001/api'  // Desenvolvimento
  : 'https://api-solar-pulse.onrender.com/api';  // Produção ← COLE SUA URL AQUI
```

---

### 🔟 **Testar no App**

1. Reinicie o app:
```bash
npm start
```

2. Acesse a página de **Orçamento**
3. Preencha o formulário
4. Clique em **"Solicitar Orçamento"**
5. ✅ Verifique se recebeu o email!

---

## 🎨 **Recursos do Plano Gratuito do Render**

✅ **O que você tem:**
- 750 horas/mês de runtime (suficiente para sempre-on)
- Auto-deploy a cada push no GitHub
- HTTPS automático
- Logs em tempo real
- Environment variables
- Custom domains (opcional)

⚠️ **Limitações:**
- **Cold Start:** Primeira requisição após inatividade demora ~30s
- Service "hiberna" após 15 min sem uso
- 512 MB RAM
- 0.1 CPU

💡 **Dica:** Para manter a API sempre ativa, use um serviço de ping como:
- **UptimeRobot** (https://uptimerobot.com)
- **Cron-job.org** (https://cron-job.org)

Configurar para fazer ping na API a cada 10 minutos:
```
https://api-solar-pulse.onrender.com/health
```

---

## 📊 **Monitoramento**

### **Ver logs em tempo real:**
1. Acesse o dashboard do Render
2. Clique no seu service
3. Vá em **"Logs"**

### **Verificar métricas:**
- CPU Usage
- Memory Usage
- Requests por minuto
- Erros

---

## 🔧 **Troubleshooting**

### ❌ **Erro: "Build failed"**
**Solução:**
- Verifique se `package.json` tem o script `"start": "node src/server.js"`
- Verifique se todas as dependências estão em `dependencies` (não em `devDependencies`)

### ❌ **Erro: "Application failed to respond"**
**Solução:**
- Verifique se a variável `PORT` está configurada
- Verifique se o servidor está escutando em `process.env.PORT`

### ❌ **Erro: "Invalid login" (Email)**
**Solução:**
- Use **Senha de App** do Gmail, não a senha normal
- Verifique se a senha não tem espaços

### ❌ **Erro: "MongoServerError: Authentication failed"**
**Solução:**
- Verifique usuário e senha do MongoDB
- Certifique-se de que adicionou `0.0.0.0/0` no Network Access

### ❌ **Email não chega:**
**Solução:**
- Verifique pasta de spam
- Teste a senha de app localmente primeiro
- Veja os logs no Render para erros de email

---

## 🔄 **Atualizações Automáticas**

✅ **Cada vez que você fizer push no GitHub, o Render faz deploy automático!**

```bash
git add .
git commit -m "Atualização da API"
git push origin main
```

O Render detecta e faz deploy automaticamente! 🚀

---

## 📝 **Checklist Final**

- [ ] API deployada no Render
- [ ] MongoDB Atlas configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Senha de app do Gmail gerada
- [ ] Health check funcionando
- [ ] Teste de envio de email OK
- [ ] URL atualizada no app
- [ ] App testado e funcionando
- [ ] Email de confirmação recebido

---

## 🎉 **Parabéns!**

Sua API está no ar e funcionando! 

**Próximos passos:**
- [ ] Configurar custom domain (opcional)
- [ ] Adicionar monitoramento (UptimeRobot)
- [ ] Configurar backup do MongoDB
- [ ] Implementar analytics

---

## 📞 **Suporte**

**Render Docs:** https://render.com/docs
**MongoDB Docs:** https://docs.mongodb.com/atlas/
**GitHub da API:** https://github.com/RenanGreg/api-solar-pulse

---

**Desenvolvido com ❤️ para Solar Pulse** ⚡🌞
