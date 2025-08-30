// api/email-config.js - Configuration Gmail améliorée pour Vercel

export async function sendEmailWithNodemailer(emailContent) {
  console.log('🔧 === CONFIGURATION EMAIL ===');
  
  try {
    // Import dynamique pour Vercel
    console.log('📦 Import nodemailer...');
    const nodemailer = await import('nodemailer');
    console.log('✅ Nodemailer importé');

    // Configuration du transporteur
    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      // Nouvelles options pour Gmail
      pool: false, // Désactive le pool de connexions pour Vercel
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5
    };

    console.log('⚙️ Configuration SMTP:', {
      host: config.host,
      port: config.port,
      user: config.auth.user || 'NON_DEFINI',
      hasPass: !!config.auth.pass
    });

    const transporter = nodemailer.default.createTransporter(config);
    console.log('🚛 Transporteur créé');

    // Test de connexion
    console.log('🔌 Test de connexion SMTP...');
    await transporter.verify();
    console.log('✅ Connexion Gmail validée');
    
    // Préparation du mail
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'contact@eggon-technology.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      replyTo: process.env.FROM_EMAIL || 'contact@eggon-technology.com',
      // Headers additionnels pour améliorer la délivrabilité
      headers: {
        'X-Mailer': 'EggOn Technology',
        'X-Priority': '3',
        'Importance': 'Normal'
      }
    };

    console.log('📧 Options mail préparées:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    });

    // Envoi du mail
    console.log('🚀 Envoi en cours...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email envoyé via Gmail!');
    console.log('📋 Détails envoi:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    // Fermer la connexion proprement
    transporter.close();
    
    return { 
      success: true, 
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    };
    
  } catch (error) {
    console.error('❌ === ERREUR GMAIL ===');
    console.error('Type:', error.constructor.name);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Command:', error.command);
    console.error('Response:', error.response);
    console.error('Stack:', error.stack);
    
    // Types d'erreurs spécifiques Gmail
    let errorType = 'UNKNOWN';
    if (error.code === 'EAUTH') {
      errorType = 'AUTHENTICATION_FAILED';
      console.error('🔐 Erreur d\'authentification Gmail');
    } else if (error.code === 'ECONNECTION') {
      errorType = 'CONNECTION_FAILED';
      console.error('🌐 Erreur de connexion SMTP');
    } else if (error.code === 'ETIMEDOUT') {
      errorType = 'TIMEOUT';
      console.error('⏱️ Timeout de connexion');
    } else if (error.responseCode >= 500) {
      errorType = 'SERVER_ERROR';
      console.error('🏥 Erreur serveur Gmail');
    }
    
    return { 
      success: false, 
      error: error.message,
      errorType,
      code: error.code,
      details: {
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      }
    };
  }
}
