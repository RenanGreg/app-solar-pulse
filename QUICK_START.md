# 🚀 GUIA RÁPIDO - API de Email Solar Pulse

## ✅ O que foi feito?

### 1. **Instalado:**
- ✅ `axios` - Para comunicação com API

### 2. **Criado:**
- ✅ `src/services/api.ts` - Serviço de API com tipagem TypeScript
- ✅ `backend-example/` - Exemplo completo de backend Node.js

### 3. **Atualizado:**
- ✅ `src/pages/budget/index.tsx` - Integrado com API
- ✅ `src/pages/contact/index.tsx` - Integrado com API

---

## 📋 Próximos Passos

### ⚡ PASSO 1: Configure o Backend

```bash
# Entre na pasta do backend
cd backend-example

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite o .env e adicione seu email
nano .env  # ou use o editor de sua preferência
```

**No arquivo `.env`, adicione:**
```env
PORT=3000
EMAIL_USER=seuemail@gmail.com
EMAIL_PASSWORD=sua_senha_app_gmail
```

### 🔐 PASSO 2: Gerar Senha de App do Gmail

1. Acesse: https://myaccount.google.com/apppasswords
2. Em "Selecionar app", escolha **Outro (nome personalizado)**
3. Digite: **API Solar Pulse**
4. Clique em **Gerar**
5. Copie a senha de 16 caracteres
6. Cole no `.env` na variável `EMAIL_PASSWORD`

⚠️ **NÃO use sua senha normal do Gmail!**

### 🚀 PASSO 3: Teste Localmente

```bash
# Rode o servidor
npm start
```

**Abra outro terminal e teste:**
```bash
# Teste o health check
curl http://localhost:3000/health
```

Se ver algo como:
```json
{"status":"ok","message":"API Solar Pulse está funcionando!"}
```

✅ **Está funcionando!**

### 📱 PASSO 4: Configure o App para Usar o Backend Local

Edite `src/services/api.ts` (linha 5):
```typescript
// Para testar localmente (desenvolvimento)
const API_URL = 'http://localhost:3000/api';

// Para produção (depois do deploy no Render)
// const API_URL = 'https://sua-api.onrender.com/api';
```

### 🧪 PASSO 5: Teste no App

1. Inicie o app:
```bash
npm start
```

2. Acesse a página de **Orçamento**
3. Preencha o formulário
4. Clique em **Solicitar Orçamento**
5. ✅ Verifique se recebeu o email!

---

## 🌐 PASSO 6: Deploy no Render (Produção)

### 1. Criar repositório no GitHub:
```bash
# Na pasta backend-example
git init
git add .
git commit -m "Backend Solar Pulse"
git branch -M main
git remote add origin https://github.com/seu-usuario/api-solar-pulse.git
git push -u origin main
```

### 2. Deploy no Render:

1. Acesse: https://render.com
2. Clique em **New +** → **Web Service**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** `api-solar-pulse`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Adicione as variáveis de ambiente:
   - `EMAIL_USER`: seu email
   - `EMAIL_PASSWORD`: senha de app
6. Clique em **Create Web Service**

### 3. Aguarde o deploy (2-3 minutos)

Você receberá uma URL tipo:
```
https://api-solar-pulse-abc123.onrender.com
```

### 4. Atualize no app:

Edite `src/services/api.ts`:
```typescript
const API_URL = 'https://api-solar-pulse-abc123.onrender.com/api';
```

### 5. Teste novamente no app! 🎉

---

## 🎯 Estrutura Final

```
app-solar-pulse/
├── src/
│   ├── services/
│   │   └── api.ts                 ← Serviço de API (✅ Criado)
│   └── pages/
│       ├── budget/
│       │   └── index.tsx          ← Integrado (✅ Atualizado)
│       └── contact/
│           └── index.tsx          ← Integrado (✅ Atualizado)
│
├── backend-example/               ← Backend completo (✅ Criado)
│   ├── server.js                 ← Servidor Express
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── API_INTEGRATION.md            ← Documentação (✅ Criado)
└── QUICK_START.md                ← Este arquivo (✅ Criado)
```

---

## 🔧 Comandos Úteis

### Backend:
```bash
cd backend-example

# Instalar dependências
npm install

# Rodar servidor (produção)
npm start

# Rodar servidor (desenvolvimento com auto-reload)
npm run dev

# Testar API
curl http://localhost:3000/health
```

### App:
```bash
# Instalar dependências
npm install

# Iniciar app
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 📧 Exemplo de Teste Completo

### 1. Backend rodando:
```bash
cd backend-example
npm start
```

### 2. App rodando:
```bash
cd ..
npm start
```

### 3. No app:
- Acesse **Orçamento**
- Preencha:
  - Nome: João Silva
  - Email: seu-email@gmail.com
  - Telefone: (11) 99999-9999
  - Conta de energia: 350
- Clique em **Solicitar Orçamento**

### 4. Verifique:
- ✅ Apareceu mensagem de sucesso no app
- ✅ Recebeu email de confirmação
- ✅ Você (empresa) recebeu notificação do orçamento

---

## ❓ Problemas Comuns

### ❌ "Network Error"
**Solução:** Verifique se o backend está rodando e a URL está correta.

### ❌ "Invalid login"
**Solução:** Use **Senha de App** do Gmail, não sua senha normal.

### ❌ Email não chega
**Solução:**
1. Verifique pasta de spam
2. Confirme credenciais no `.env`
3. Teste o servidor de email: `npm start` e veja os logs

### ❌ "Timeout"
**Solução:** No Render, a primeira requisição pode demorar (cold start). Aguarde 30s.

---

## 🎉 Pronto!

Agora você tem uma API completa integrada ao seu app!

**Funcionalidades:**
- ✅ Solicitar orçamento → envia email
- ✅ Enviar mensagem de contato → envia email
- ✅ Feedback visual (loading, sucesso, erro)
- ✅ Validação de formulários
- ✅ Backend pronto para deploy

---

## 📞 Suporte

Precisa de ajuda? Entre em contato!

**Documentação Completa:** Veja `API_INTEGRATION.md`

---

**Desenvolvido com ❤️ para Solar Pulse** ⚡🌞
