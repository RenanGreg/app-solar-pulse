// ========================================
// 🚀 API BACKEND - SOLAR PULSE
// ========================================
// Deploy no Render: https://render.com
// ========================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARES ==========
app.use(cors());
app.use(express.json());

// ========== CONFIGURAÇÃO DE EMAIL ==========
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Validar configuração de email
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro na configuração de email:', error);
  } else {
    console.log('✅ Servidor de email pronto para enviar mensagens');
  }
});

// ========== ROUTES ==========

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Solar Pulse está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

// POST /api/budget - Solicitar Orçamento
app.post('/api/budget', async (req, res) => {
  try {
    const { name, email, phone, propertyType, averageEnergyBill, roofArea, message } = req.body;

    // Validação
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e telefone são obrigatórios',
      });
    }

    // Email para o cliente
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🌞 Solicitação de Orçamento Recebida - Solar Pulse',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            h2 { color: #667eea; }
            strong { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ Solar Pulse</h1>
              <p>Energia Solar Inteligente</p>
            </div>
            <div class="content">
              <h2>Olá, ${name}! 👋</h2>
              <p>Recebemos sua solicitação de orçamento e estamos muito felizes em poder ajudá-lo!</p>
              
              <div class="info-box">
                <h3>📋 Dados da Solicitação:</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Tipo de Imóvel:</strong> ${propertyType || 'Não informado'}</p>
                <p><strong>Conta de Energia Média:</strong> R$ ${averageEnergyBill || 'Não informado'}</p>
                <p><strong>Área do Telhado:</strong> ${roofArea || 'Não informado'} m²</p>
                ${message ? `<p><strong>Observações:</strong> ${message}</p>` : ''}
              </div>

              <p>✅ <strong>Próximos Passos:</strong></p>
              <ul>
                <li>Nossa equipe analisará suas informações</li>
                <li>Entraremos em contato em até 24 horas</li>
                <li>Enviaremos uma proposta personalizada</li>
              </ul>

              <p style="color: #667eea; font-weight: bold;">🌞 Em breve você estará economizando com energia solar!</p>
            </div>
            <div class="footer">
              <p>Solar Pulse - Energia Solar Inteligente</p>
              <p>📞 (11) 9999-9999 | ✉️ contato@solarpulse.com.br</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email para a empresa (notificação interna)
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Seu email para receber notificações
      subject: `🔔 Nova Solicitação de Orçamento - ${name}`,
      html: `
        <h2>Nova Solicitação de Orçamento! 🎯</h2>
        <h3>Informações do Cliente:</h3>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefone:</strong> ${phone}</li>
          <li><strong>Tipo de Imóvel:</strong> ${propertyType}</li>
          <li><strong>Conta Média:</strong> R$ ${averageEnergyBill}</li>
          <li><strong>Área do Telhado:</strong> ${roofArea} m²</li>
          <li><strong>Mensagem:</strong> ${message || 'Nenhuma mensagem adicional'}</li>
        </ul>
        <p><strong>⏰ Recebido em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `,
    };

    // Enviar emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(companyMailOptions);

    res.json({
      success: true,
      message: 'Orçamento solicitado com sucesso! Verifique seu email.',
    });
  } catch (error) {
    console.error('Erro ao enviar orçamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar solicitação. Tente novamente.',
    });
  }
});

// POST /api/contact - Enviar Mensagem de Contato
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validação
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e mensagem são obrigatórios',
      });
    }

    // Email para o cliente
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Mensagem Recebida - Solar Pulse',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ Solar Pulse</h1>
            </div>
            <div class="content">
              <h2>Olá, ${name}! 👋</h2>
              <p>Recebemos sua mensagem e agradecemos pelo contato!</p>
              <p><strong>Nossa equipe responderá em até 24 horas.</strong></p>
              <p>📞 Precisa de atendimento urgente? Ligue: (11) 9999-9999</p>
            </div>
            <div class="footer">
              <p>Solar Pulse - Energia Solar Inteligente</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email para a empresa
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `💬 Nova Mensagem de Contato - ${name}`,
      html: `
        <h2>Nova Mensagem de Contato! 📬</h2>
        <h3>Informações:</h3>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefone:</strong> ${phone || 'Não informado'}</li>
          <li><strong>Assunto:</strong> ${subject}</li>
          <li><strong>Mensagem:</strong> ${message}</li>
        </ul>
        <p><strong>⏰ Recebido em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `,
    };

    // Enviar emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(companyMailOptions);

    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente.',
    });
  }
});

// POST /api/users - Criar usuário (opcional)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone, metadata } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios',
      });
    }

    // Email de boas-vindas
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Bem-vindo à Solar Pulse!',
      html: `
        <h2>Bem-vindo, ${name}! 🌞</h2>
        <p>Obrigado por se cadastrar na Solar Pulse!</p>
        <p>Estamos felizes em tê-lo conosco na jornada da energia solar.</p>
        <p><strong>Em breve você receberá novidades e ofertas exclusivas!</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      data: { name, email, phone },
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar usuário',
    });
  }
});

// GET /api/stats - Estatísticas (placeholder)
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 0,
      totalBudgets: 0,
      totalMessages: 0,
    },
  });
});

// GET /api/users - Listar usuários (placeholder)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚡ API Solar Pulse');
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌍 http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

module.exports = app;
