// api/email-config.js - VERSION VERCEL COMPATIBLE

// Import ES6 standard pour Vercel
import nodemailer from 'nodemailer';

export async function sendEmailWithNodemailer(emailContent) {
  console.log('🔧 === EMAIL VERCEL VERSION ===');
  
  try {
    console.log('📦 Nodemailer importé (ES6)...');
    console.log('🔍 Méthodes disponibles:', Object.getOwnPropertyNames(nodemailer));
    
    console.log('🚛 Création transporteur...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✅ Transporteur créé');

    console.log('🔌 Test connexion...');
    await transporter.verify();
    console.log('✅ Connexion Gmail OK');
    
    console.log('📧 Préparation email...');
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'eggoncontact@gmail.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      replyTo: process.env.FROM_EMAIL || 'eggoncontact@gmail.com'
    };

    console.log('🚀 Envoi email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ SUCCESS! Email envoyé:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId
    };
    
  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    console.error('Stack:', error.stack);
    
    return { 
      success: false, 
      error: error.message
    };
  }
}

// Version simplifiée pour test
export async function sendTestEmail() {
  console.log('🧪 === TEST EMAIL SIMPLE ===');
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.verify();
    console.log('✅ Connexion OK');
    
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.INTERNAL_EMAIL,
      subject: 'Test EggOn - Configuration Vercel',
      html: '<h2>Test réussi!</h2><p>Configuration email fonctionnelle sur Vercel.</p>'
    });
    
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return { success: false, error: error.message };
  }
}
