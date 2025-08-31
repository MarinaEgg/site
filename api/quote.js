// api/quote.js - Copie exacte de test-simple qui marche

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('🧪 Quote basé sur test-simple');
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { agentTitle, userRequirement, clientEmail } = req.body;

    if (!agentTitle || !userRequirement || !clientEmail) {
      return res.status(400).json({ message: 'Données manquantes' });
    }

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
    
    // Email interne
    const internalInfo = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.INTERNAL_EMAIL,
      subject: `Nouvelle demande - Agent IA: ${agentTitle}`,
      html: `
        <h2>Nouvelle demande d'information</h2>
        <p><strong>Agent:</strong> ${agentTitle}</p>
        <p><strong>Client:</strong> ${clientEmail}</p>
        <p><strong>Besoins:</strong> ${userRequirement}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
    });

    // Email client
    const clientInfo = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: clientEmail,
      subject: `Confirmation - Agent IA: ${agentTitle}`,
      html: `
        <h2>Merci pour votre demande !</h2>
        <p>Nous avons bien reçu votre demande concernant l'agent IA <strong>"${agentTitle}"</strong>.</p>
        <p>Notre équipe vous répondra sous 48h ouvrées.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });
    
    console.log('✅ Emails envoyés!', internalInfo.messageId, clientInfo.messageId);
    
    return res.status(200).json({ 
      success: true, 
      messageId: internalInfo.messageId,
      message: 'Demande envoyée avec succès!'
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
