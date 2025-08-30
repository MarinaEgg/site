// src/api/email-config.js - Configuration email pour Vercel

// Fonction d'envoi avec Nodemailer
export async function sendEmailWithNodemailer(emailContent) {
  // Import dynamique pour Vercel
  const nodemailer = await import('nodemailer');
  
  const transporter = nodemailer.default.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
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
  // Import dynamique pour Vercel
  const sgMail = await import('@sendgrid/mail');
  sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: emailContent.to,
    from: {
      email: process.env.FROM_EMAIL || 'noreply@eggon.fr',
      name: process.env.FROM_NAME || 'EggOn Technology'
    },
    subject: emailContent.subject,
    html: emailContent.html
  };
  
  try {
    await sgMail.default.send(msg);
    return { success: true, messageId: 'sendgrid-' + Date.now() };
  } catch (error) {
    console.error('Erreur SendGrid:', error);
    return { success: false, error: error.message };
  }
}

// Configuration pour l'environnement de développement
export const testEmailConfig = {
  simulateEmails: process.env.NODE_ENV === 'development',
  logEmails: true
};
