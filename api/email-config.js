// src/api/email-config.js - Configuration Gmail simple pour Vercel

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
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'contact@eggon-technology.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      replyTo: process.env.FROM_EMAIL || 'contact@eggon-technology.com'
    });
    
    console.log('✅ Email envoyé via Gmail:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Erreur Gmail:', error);
    return { success: false, error: error.message };
  }
}
