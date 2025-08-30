// Configuration pour l'envoi d'emails
// Choisissez et configurez votre service d'email préféré

// Option 1: Nodemailer avec SMTP (recommandé pour la simplicité)
export const nodemailerConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER, // votre email
    pass: process.env.SMTP_PASS  // votre mot de passe d'application
  }
};

// Option 2: SendGrid (recommandé pour la production)
export const sendGridConfig = {
  apiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@eggon.fr',
  fromName: process.env.FROM_NAME || 'EggOn Technology'
};

// Option 3: AWS SES (pour les gros volumes)
export const awsSESConfig = {
  region: process.env.AWS_REGION || 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@eggon.fr'
};

// Fonction d'envoi avec Nodemailer
export async function sendEmailWithNodemailer(emailContent) {
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter(nodemailerConfig);
  
  try {
    const info = await transporter.sendMail({
      from: `"EggOn Technology" <${process.env.SMTP_USER}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    return { success: false, error: error.message };
  }
}

// Fonction d'envoi avec SendGrid
export async function sendEmailWithSendGrid(emailContent) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(sendGridConfig.apiKey);
  
  const msg = {
    to: emailContent.to,
    from: {
      email: sendGridConfig.fromEmail,
      name: sendGridConfig.fromName
    },
    subject: emailContent.subject,
    html: emailContent.html
  };
  
  try {
    await sgMail.send(msg);
    return { success: true, messageId: 'sendgrid-' + Date.now() };
  } catch (error) {
    console.error('Erreur SendGrid:', error);
    return { success: false, error: error.message };
  }
}

// Variables d'environnement à configurer dans votre .env
/*
# Pour Nodemailer (Gmail exemple)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application

# Pour SendGrid
SENDGRID_API_KEY=votre-clé-api-sendgrid

# Général
FROM_EMAIL=noreply@eggon.fr
FROM_NAME=EggOn Technology
NODE_ENV=production
*/