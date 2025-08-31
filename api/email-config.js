// api/email-config.js - VERSION VERCEL COMPATIBLE (ES6)

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

// 🔄 VERSION ALTERNATIVE avec import moderne
export async function sendEmailModern(emailContent) {
  console.log('🔧 === EMAIL MODERN VERSION ===');
  
  try {
    console.log('✅ Nodemailer loaded (ES6)');
    console.log('🔍 Available methods:', Object.getOwnPropertyNames(nodemailer));
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.verify();
    console.log('✅ Connection verified');
    
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html
    });
    
    console.log('✅ Email sent:', info.messageId);
    
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Modern method failed:', error.message);
    return { success: false, error: error.message };
  }
}

// 🧪 VERSION DE TEST POUR DEBUGGING
export async function debugNodemailer() {
  console.log('🧪 === DEBUG NODEMAILER ES6 ===');
  
  try {
    console.log('📋 Nodemailer object type:', typeof nodemailer);
    console.log('📋 Nodemailer keys:', Object.keys(nodemailer));
    console.log('📋 Nodemailer methods:', Object.getOwnPropertyNames(nodemailer));
    console.log('📋 Has createTransport?', typeof nodemailer.createTransport);
    
    return { success: true, debug: 'Check logs for details' };
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    return { success: false, error: error.message };
  }
}
