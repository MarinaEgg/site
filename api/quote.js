// API endpoint pour gérer les demandes de devis d'agents IA
// Ce fichier peut être utilisé avec Next.js API routes ou un serveur Express

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { agentTitle, agentDescription, userRequirement, clientEmail, email } = req.body;

    // Validation des données
    if (!agentTitle || !userRequirement || !clientEmail || !email) {
      return res.status(400).json({ 
        message: 'Données manquantes: agentTitle, userRequirement, clientEmail et email sont requis' 
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({ 
        message: 'Format d\'email client invalide' 
      });
    }

    // Email pour l'équipe EggOn (notification interne)
    const internalEmailContent = {
      to: email,
      subject: `Nouvelle demande de devis - Agent IA: ${agentTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2f2f2e; border-bottom: 2px solid #fce96b; padding-bottom: 10px;">
            Nouvelle demande de devis d'agent IA
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2f2f2e; margin-top: 0;">Agent demandé:</h3>
            <p><strong>${agentTitle}</strong></p>
            ${agentDescription ? `<p style="color: #666;">${agentDescription}</p>` : ''}
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #fce96b; margin: 20px 0;">
            <h3 style="color: #2f2f2e; margin-top: 0;">Besoins spécifiques du client:</h3>
            <p style="font-style: italic; color: #333;">"${userRequirement}"</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="color: #2f2f2e; margin-top: 0;">Informations client:</h3>
            <p style="margin: 0; color: #333;">
              <strong>Email:</strong> ${clientEmail}<br>
              <strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}<br>
              <strong>Source:</strong> Site web EggOn - Collection d'agents IA
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            Cet email a été généré automatiquement depuis le site web EggOn Technology.
          </p>
        </div>
      `
    };

    // Email de confirmation pour le client
    const clientEmailContent = {
      to: clientEmail,
      subject: `Confirmation de votre demande de devis - Agent IA: ${agentTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #fce96b;">
            <h1 style="color: #2f2f2e; margin: 0;">EggOn Technology</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Explainable AI Governance</p>
          </div>
          
          <h2 style="color: #2f2f2e; margin: 30px 0 20px 0;">
            Merci pour votre demande de devis !
          </h2>
          
          <p style="color: #333; line-height: 1.6;">
            Nous avons bien reçu votre demande concernant l'agent IA <strong>"${agentTitle}"</strong>.
          </p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2f2f2e; margin-top: 0;">Récapitulatif de votre demande:</h3>
            <p><strong>Agent souhaité:</strong> ${agentTitle}</p>
            <p><strong>Vos besoins spécifiques:</strong></p>
            <p style="font-style: italic; color: #555; background: #fff; padding: 15px; border-radius: 5px;">"${userRequirement}"</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2f2f2e; margin-top: 0;">Prochaines étapes:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>Notre équipe technique analyse vos besoins</li>
              <li>Nous préparons un devis personnalisé</li>
              <li>Vous recevrez notre proposition sous 48h ouvrées</li>
            </ul>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Si vous avez des questions, n'hésitez pas à nous contacter à 
            <a href="mailto:contact@eggon.fr" style="color: #2f2f2e;">contact@eggon.fr</a>
          </p>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f0f0f0; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Confidentialité:</strong> Conformément à notre engagement, cet email ne contient aucune publicité.<br>
              Nous utilisons votre adresse uniquement pour le suivi de votre demande de devis.
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px; text-align: center;">
            EggOn Technology - Explainable AI Governance<br>
            Cet email a été généré automatiquement suite à votre demande sur notre site web.
          </p>
        </div>
      `
    };

    // Envoyer les deux emails
    const [internalEmailResponse, clientEmailResponse] = await Promise.all([
      sendEmail(internalEmailContent),
      sendEmail(clientEmailContent)
    ]);
    
    if (internalEmailResponse.success && clientEmailResponse.success) {
      // Log pour le suivi
      console.log('Demande de devis envoyée:', {
        agentTitle,
        clientEmail,
        userRequirement: userRequirement.substring(0, 100) + '...',
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({ 
        message: 'Demande de devis envoyée avec succès',
        success: true 
      });
    } else {
      throw new Error('Erreur lors de l\'envoi des emails');
    }

  } catch (error) {
    console.error('Erreur API quote:', error);
    return res.status(500).json({ 
      message: 'Erreur interne du serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Fonction d'envoi d'email - à adapter selon votre service
async function sendEmail(emailContent) {
  try {
    // Exemple avec Nodemailer (à configurer selon vos besoins)
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html
    });

    return { success: true, messageId: info.messageId };
    */

    // Pour le développement, simuler l'envoi
    console.log('Email simulé envoyé à:', emailContent.to);
    console.log('Sujet:', emailContent.subject);
    
    return { success: true, messageId: 'simulated-' + Date.now() };
    
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: error.message };
  }
}
