// src/api/email-config.js - Configuration Gmail pour EggOn Technology

// Fonction d'envoi avec Gmail
export async function sendEmailWithNodemailer(emailContent) {
  // Import dynamique pour Vercel
  const nodemailer = await import('nodemailer');
  
  const transporter = nodemailer.default.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER, // eggoncontact@gmail.com
      pass: process.env.SMTP_PASS  // mkpdqetxouxhkyce
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  });
  
  try {
    // Vérifier la connexion
    await transporter.verify();
    console.log('✅ Connexion Gmail validée');
    
    const info = await transporter.sendMail({
      // Email affiché comme venant du domaine professionnel
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'contact@eggon-technology.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      // Adresse de réponse
      replyTo: process.env.FROM_EMAIL || 'contact@eggon-technology.com'
    });
    
    console.log('✅ Email envoyé via Gmail:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Erreur Gmail:', error);
    return { success: false, error: error.message };
  }
}

// Configuration pour les tests
export const emailConfig = {
  simulateEmails: !process.env.SMTP_USER || !process.env.SMTP_PASS,
  logEmails: true
};
export async function sendEmailWithNodemailer(emailContent) {
  const nodemailer = await import('nodemailer');
  
  // Configuration spécifique Gmail
  const transporter = nodemailer.default.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER, // eggoncontact@gmail.com
      pass: process.env.SMTP_PASS  // Mot de passe d'application
    },
    // Options Gmail
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  });
  
  try {
    // Vérifier la connexion Gmail
    await transporter.verify();
    console.log('✅ Connexion Gmail validée');
    
    const mailOptions = {
      // Affiché comme venant de votre domaine professionnel
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'contact@eggon-technology.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      // Important : définir l'adresse de réponse
      replyTo: process.env.FROM_EMAIL || 'contact@eggon-technology.com',
      // Headers pour améliorer la délivrabilité
      headers: {
        'X-Mailer': 'EggOn Technology Website',
        'X-Priority': '3',
        'Return-Path': process.env.SMTP_USER
      }
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email Gmail envoyé:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response 
    };
    
  } catch (error) {
    console.error('❌ Erreur Gmail:', error);
    
    // Messages d'erreur spécifiques Gmail
    let userMessage = 'Erreur lors de l\'envoi de l\'email';
    
    if (error.code === 'EAUTH') {
      userMessage = 'Identifiants Gmail invalides - vérifiez le mot de passe d\'application';
    } else if (error.responseCode === 534) {
      userMessage = 'Vérification 2-étapes requise - générez un mot de passe d\'application';
    } else if (error.responseCode === 535) {
      userMessage = 'Mot de passe Gmail incorrect';
    }
    
    return { 
      success: false, 
      error: error.message,
      userMessage,
      code: error.code 
    };
  }
}

// Configuration et validation
export const emailConfig = {
  // Mode simulation si pas de config Gmail
  simulateEmails: !process.env.SMTP_USER || !process.env.SMTP_PASS,
  logEmails: true,
  
  // Validation spécifique Gmail
  validateConfig() {
    const missing = [];
    
    if (!process.env.SMTP_HOST) missing.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missing.push('SMTP_USER');  
    if (!process.env.SMTP_PASS) missing.push('SMTP_PASS');
    if (!process.env.FROM_EMAIL) missing.push('FROM_EMAIL');
    
    if (missing.length > 0) {
      console.warn('⚠️ Configuration Gmail manquante:', missing.join(', '));
      console.warn('📧 Mode simulation activé');
      return false;
    }
    
    // Vérifier que c'est bien Gmail
    if (!process.env.SMTP_USER.includes('@gmail.com')) {
      console.warn('⚠️ SMTP_USER doit être une adresse Gmail');
      return false;
    }
    
    console.log('✅ Configuration Gmail complète');
    console.log(`📧 Compte Gmail: ${process.env.SMTP_USER}`);
    console.log(`📧 Affiché comme: ${process.env.FROM_EMAIL}`);
    return true;
  }
};

// Test de configuration Gmail
export async function testEmailConfiguration() {
  if (!emailConfig.validateConfig()) {
    return {
      success: false,
      message: 'Configuration Gmail incomplète'
    };
  }
  
  try {
    const testEmail = {
      to: process.env.SMTP_USER, // Test à soi-même
      subject: 'Test Gmail - EggOn Technology',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2f2f2e; text-align: center;">🎉 Configuration Gmail réussie !</h2>
            <p style="color: #333; line-height: 1.6;">
              Votre site web EggOn Technology peut maintenant envoyer des emails via Gmail.
            </p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #333;"><strong>Configuration :</strong></p>
              <p style="margin: 5px 0; color: #666;">Serveur SMTP : ${process.env.SMTP_HOST}</p>
              <p style="margin: 5px 0; color: #666;">Compte Gmail : ${process.env.SMTP_USER}</p>
              <p style="margin: 5px 0; color: #666;">Affiché comme : ${process.env.FROM_EMAIL}</p>
              <p style="margin: 5px 0; color: #666;">Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
            <p style="text-align: center; margin: 30px 0;">
              <strong style="color: #28a745;">✅ Votre système de devis est prêt !</strong>
            </p>
          </div>
        </div>
      `
    };
    
    const result = await sendEmailWithNodemailer(testEmail);
    return result;
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
export async function sendEmailWithOffice365(emailContent) {
  const nodemailer = await import('nodemailer');
  
  const transporter = nodemailer.default.createTransporter({
    host: 'smtp.office365.com', // Serveur M365
    port: 587,
    secure: false, // STARTTLS, pas SSL
    auth: {
      user: process.env.SMTP_USER, // siteweb@eggon-technology.com
      pass: process.env.SMTP_PASS  // Mot de passe normal (compte sans MFA)
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    },
    requireTLS: true,
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  });
  
  try {
    await transporter.verify();
    console.log('✅ Connexion Microsoft 365 validée');
    
    const result = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html
    });
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Erreur Microsoft 365:', error);
    return { success: false, error: error.message };
  }
}

// Fonction d'envoi avec SendGrid (alternative moderne)
export async function sendEmailWithSendGrid(emailContent) {
  try {
    const sgMail = await import('@sendgrid/mail');
    sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);
    
    const result = await sgMail.default.send({
      to: emailContent.to,
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME || 'EggOn Technology'
      },
      subject: emailContent.subject,
      html: emailContent.html
    });
    
    return { success: true, messageId: result[0].headers['x-message-id'] };
    
  } catch (error) {
    console.error('❌ Erreur SendGrid:', error);
    return { success: false, error: error.message };
  }
}

// Fonction principale qui choisit le bon service
export async function sendEmailWithNodemailer(emailContent) {
  // Prioriser SendGrid si configuré
  if (process.env.SENDGRID_API_KEY) {
    console.log('📧 Utilisation de SendGrid');
    return await sendEmailWithSendGrid(emailContent);
  }
  
  // Sinon utiliser Microsoft 365
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('📧 Utilisation de Microsoft 365');
    return await sendEmailWithOffice365(emailContent);
  }
  
  // Mode simulation si aucune config
  console.log('⚠️ Aucune configuration email - Mode simulation');
  return { 
    success: true, 
    messageId: 'simulated-' + Date.now(), 
    simulated: true 
  };
}
export async function sendEmailWithNodemailer(emailContent) {
  // Import dynamique pour Vercel
  const nodemailer = await import('nodemailer');
  
  // Configuration Outlook avec options de sécurité
  const transporter = nodemailer.default.createTransporter({
    host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // false pour STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    },
    // Options pour Outlook
    requireTLS: true,
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  });
  
  try {
    // Vérifier la connexion d'abord
    await transporter.verify();
    console.log('✅ Connexion SMTP Outlook validée');
    
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      // Headers additionnels pour Outlook
      headers: {
        'X-Mailer': 'EggOn Technology Website',
        'X-Priority': '3'
      }
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response 
    };
    
  } catch (error) {
    console.error('❌ Erreur Nodemailer Outlook:', error);
    
    // Messages d'erreur plus clairs
    let userMessage = 'Erreur lors de l\'envoi de l\'email';
    
    if (error.code === 'EAUTH') {
      userMessage = 'Erreur d\'authentification - vérifiez vos identifiants Outlook';
    } else if (error.code === 'ECONNECTION') {
      userMessage = 'Impossible de se connecter au serveur Outlook';
    } else if (error.responseCode === 535) {
      userMessage = 'Identifiants invalides - générez un nouveau mot de passe d\'application';
    }
    
    return { 
      success: false, 
      error: error.message,
      userMessage,
      code: error.code 
    };
  }
}

// Configuration pour les tests
export const emailConfig = {
  // Mode simulation si pas de config
  simulateEmails: !process.env.SMTP_USER || !process.env.SMTP_PASS,
  logEmails: true,
  
  // Validation de la configuration
  validateConfig() {
    const missing = [];
    
    if (!process.env.SMTP_HOST) missing.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missing.push('SMTP_USER');  
    if (!process.env.SMTP_PASS) missing.push('SMTP_PASS');
    if (!process.env.FROM_EMAIL) missing.push('FROM_EMAIL');
    
    if (missing.length > 0) {
      console.warn('⚠️ Configuration email manquante:', missing.join(', '));
      console.warn('📧 Mode simulation activé');
      return false;
    }
    
    console.log('✅ Configuration email complète');
    return true;
  }
};

// Test de la configuration (utilisable en développement)
export async function testEmailConfiguration() {
  if (!emailConfig.validateConfig()) {
    return {
      success: false,
      message: 'Configuration incomplète'
    };
  }
  
  try {
    const testEmail = {
      to: process.env.SMTP_USER, // Envoyer à soi-même
      subject: 'Test de configuration - EggOn Technology',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2f2f2e;">Test de configuration email réussi !</h2>
          <p>Votre configuration Outlook fonctionne parfaitement.</p>
          <p><strong>Serveur:</strong> ${process.env.SMTP_HOST}</p>
          <p><strong>Port:</strong> ${process.env.SMTP_PORT}</p>
          <p><strong>Utilisateur:</strong> ${process.env.SMTP_USER}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      `
    };
    
    const result = await sendEmailWithNodemailer(testEmail);
    return result;
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
