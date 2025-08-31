// api/test-simple.js - Test basique pour Vercel

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('🧪 Test simple nodemailer sur Vercel');
  
  try {
    console.log('📋 Variables env:', {
      SMTP_USER: process.env.SMTP_USER,
      FROM_EMAIL: process.env.FROM_EMAIL,
      INTERNAL_EMAIL: process.env.INTERNAL_EMAIL,
      hasPass: !!process.env.SMTP_PASS
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    console.log('🔌 Test connexion Gmail...');
    await transporter.verify();
    console.log('✅ Connexion réussie!');
    
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.INTERNAL_EMAIL,
      subject: 'Test Vercel Simple - EggOn',
      html: `
        <h2>Test basique réussi!</h2>
        <p>Nodemailer fonctionne sur Vercel.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });
    
    console.log('✅ Email envoyé!', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Email de test envoyé avec succès!'
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
}
