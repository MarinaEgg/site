// api/quote.js - Version qui marche (comme test-simple)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('🚀 === DÉBUT QUOTE ===');
  
  try {
    const { agentTitle, agentDescription, userRequirement, clientEmail } = req.body;

    if (!agentTitle || !userRequirement || !clientEmail) {
      return res.status(400).json({ 
        message: 'Données manquantes' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({ 
        message: 'Format email invalide' 
      });
    }

    console.log('✅ Validation OK');

    // Import nodemailer comme dans test-simple
    const nodemailer = eval('require')('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    console.log('🔌 Test connexion...');
    await transporter.verify();
    console.log('✅ Connexion OK');

    const internalEmail = process.env.INTERNAL_EMAIL || 'm.jacquet@eggon.fr';
    
    // Email interne
    const internalInfo = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: internalEmail,
      subject: `Nouvelle demande - Agent IA: ${agentTitle}`,
      html: `
        <h2>Nouvelle demande d'information</h2>
        <p><strong>Agent:</strong> ${agentTitle}</p>
        <p><strong>Client:</strong> ${clientEmail}</p>
        <p><strong>Besoins:</strong> ${userRequirement}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
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
        <p>Cordialement,<br>EggOn Technology</p>
      `
    });

    console.log('✅ Emails envoyés!', internalInfo.messageId, clientInfo.messageId);

    return res.status(200).json({ 
      message: 'Demande envoyée avec succès',
      success: true
    });

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    
    return res.status(500).json({ 
      message: 'Erreur serveur',
      success: false,
      error: error.message
    });
  }
}
