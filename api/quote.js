// api/quote.js - API Route avec eval('require') pour compatibilité Vercel

// 🔧 Import avec eval('require') au lieu d'import ES6
const { sendEmailWithNodemailer } = eval('require')('./email-config.js');

export default async function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 🔍 LOG INITIAL DE DÉBOGAGE
  console.log('🚀 === DÉBUT TRAITEMENT DEMANDE QUOTE ===');
  console.log('📝 Body reçu:', req.body);
  console.log('🔧 Variables env:', {
    SMTP_HOST: process.env.SMTP_HOST || 'NON_DEFINI',
    SMTP_USER: process.env.SMTP_USER || 'NON_DEFINI',
    SMTP_PASS: process.env.SMTP_PASS ? 'DÉFINI' : 'NON_DEFINI',
    INTERNAL_EMAIL: process.env.INTERNAL_EMAIL || 'NON_DEFINI',
    FROM_EMAIL: process.env.FROM_EMAIL || 'NON_DEFINI',
    FROM_NAME: process.env.FROM_NAME || 'NON_DEFINI',
    NODE_ENV: process.env.NODE_ENV || 'NON_DEFINI'
  });

  try {
    const { agentTitle, agentDescription, userRequirement, clientEmail } = req.body;

    // 📋 VALIDATION DÉTAILLÉE
    console.log('📋 Validation des données...');
    if (!agentTitle || !userRequirement || !clientEmail) {
      console.error('❌ Données manquantes:', { 
        agentTitle: !!agentTitle, 
        userRequirement: !!userRequirement, 
        clientEmail: !!clientEmail 
      });
      return res.status(400).json({ 
        message: 'Données manquantes: agentTitle, userRequirement et clientEmail sont requis' 
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      console.error('❌ Format email invalide:', clientEmail);
      return res.status(400).json({ 
        message: 'Format d\'email client invalide' 
      });
    }

    console.log('✅ Validation réussie');

    const internalEmail = process.env.INTERNAL_EMAIL || 'm.jacquet@eggon-technology.com';
    console.log('📧 Email interne:', internalEmail);

    // Email pour l'équipe EggOn (notification interne)
    const internalEmailContent = {
      to: internalEmail,
      subject: `Nouvelle demande d'information - Agent IA: ${agentTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f1be49 0%, #f0d943 100%); padding: 30px; text-align: center;">
            <h1 style="color: #2f2f2e; margin: 0; font-size: 24px;">EggOn Technology</h1>
            <p style="color: #2f2f2e; margin: 5px 0 0 0; opacity: 0.8;">Nouvelle demande de devis</p>
          </div>
          
          <div style="background: white; padding: 30px;">
            <h2 style="color: #2f2f2e; margin: 0 0 20px 0;">Agent IA demandé: ${agentTitle}</h2>
            
            ${agentDescription ? `
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2f2f2e; margin: 0 0 10px 0;">Description:</h3>
                <p style="color: #666; margin: 0;">${agentDescription}</p>
              </div>
            ` : ''}
            
            <div style="background: #fff1d4; padding: 20px; border-radius: 8px; border-left: 4px solid #f1be49; margin: 20px 0;">
              <h3 style="color: #2f2f2e; margin: 0 0 10px 0;">Besoins spécifiques du client:</h3>
              <p style="font-style: italic; color: #333; margin: 0;">"${userRequirement}"</p>
            </div>
            
            <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; border-left: 4px solid #f1be49; margin: 20px 0;">
              <h3 style="color: #2f2f2e; margin: 0 0 10px 0;">Informations client:</h3>
              <p style="margin: 0; color: #333;">
                <strong>Email:</strong> ${clientEmail}<br>
                <strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}<br>
                <strong>Source:</strong> Site web EggOn - Collection d'agents IA
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${clientEmail}" style="background: #fce96b; color: #2f2f2e; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Répondre au client
              </a>
            </div>
          </div>
          
          <div style="padding: 15px; text-align: center; color: #666; font-size: 12px; background: #f8f9fa;">
            Email généré automatiquement - EggOn Technology
          </div>
        </div>
      `
    };

    // Email de confirmation pour le client
    const clientEmailContent = {
      to: clientEmail,
      subject: `Confirmation de votre demande - Agent IA: ${agentTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #fce96b 0%, #f1be49 100%); padding: 30px; text-align: center;">
            <h1 style="color: #2f2f2e; margin: 0; font-size: 28px;">EggOn Technology</h1>
            <p style="color: #2f2f2e; margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Explainable AI Governance</p>
          </div>
          
          <div style="background: white; padding: 30px;">
            <h2 style="color: #2f2f2e; margin: 0 0 20px 0;">Merci pour votre demande de devis !</h2>
            
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              Nous avons bien reçu votre demande concernant l'agent IA <strong>"${agentTitle}"</strong>.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2f2f2e; margin: 0 0 15px 0;">Récapitulatif de votre demande:</h3>
              <p style="margin: 10px 0;"><strong>Agent souhaité:</strong> ${agentTitle}</p>
              <div style="margin: 15px 0;">
                <p style="margin: 0 0 5px 0;"><strong>Vos besoins spécifiques:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #fce96b;">
                  <p style="font-style: italic; color: #555; margin: 0;">"${userRequirement}"</p>
                </div>
              </div>
            </div>
            
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="color: #2f2f2e; margin: 0 0 15px 0;">Prochaines étapes:</h3>
              <div style="color: #333; line-height: 1.8;">
                <p style="margin: 8px 0;">✅ Notre équipe technique analyse vos besoins</p>
                <p style="margin: 8px 0;">✅ Nous préparons un retour personnalisé</p>
                <p style="margin: 8px 0;">✅ Vous recevrez une réponse sous 48h ouvrées</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #fff3cd; border-radius: 8px;">
              <p style="margin: 0 0 15px 0; color: #333; font-size: 16px;"><strong>Une question ?</strong></p>
              <a href="mailto:eggoncontact@gmail.com" style="background: #2f2f2e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Nous contacter
              </a>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px; background: #f8f9fa;">
            EggOn Technology - Explainable AI Governance<br>
            Email généré automatiquement suite à votre demande
          </div>
        </div>
      `
    };

    // 🚀 FONCTION D'ENVOI AMÉLIORÉE AVEC LOGS DÉTAILLÉS
    async function sendEmailSafely(emailContent, type) {
      console.log(`📤 === Tentative envoi ${type} ===`);
      console.log(`📧 Destinataire: ${emailContent.to}`);
      console.log(`📌 Sujet: ${emailContent.subject}`);

      try {
        // Vérifier la configuration AVANT d'appeler sendEmailWithNodemailer
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
          console.log(`⚠️ Configuration SMTP manquante - Mode simulation pour ${type}`);
          console.log(`📋 EMAIL SIMULÉ (${type}):`, {
            to: emailContent.to,
            subject: emailContent.subject,
            timestamp: new Date().toISOString()
          });
          return { success: true, messageId: 'simulated-' + Date.now(), simulated: true };
        }

        console.log(`🔌 Configuration SMTP OK, tentative envoi réel ${type}...`);
        
        // Envoi réel avec la fonction externe
        const result = await sendEmailWithNodemailer(emailContent);
        
        if (result.success) {
          console.log(`✅ ${type} envoyé avec succès!`, result.messageId);
        } else {
          console.error(`❌ Échec ${type}:`, result.error);
        }
        
        return result;
        
      } catch (error) {
        console.error(`💥 Exception lors de l'envoi ${type}:`, error.message);
        console.error(`🔍 Stack trace:`, error.stack);
        return { success: false, error: error.message };
      }
    }

    // 📬 ENVOI DES EMAILS
    console.log('📬 === DÉBUT ENVOI DES EMAILS ===');
    
    const [internalEmailResponse, clientEmailResponse] = await Promise.allSettled([
      sendEmailSafely(internalEmailContent, 'EMAIL INTERNE'),
      sendEmailSafely(clientEmailContent, 'EMAIL CLIENT')
    ]);

    // 📊 ANALYSE DES RÉSULTATS
    console.log('📊 === RÉSULTATS ENVOI ===');
    console.log('Internal result:', internalEmailResponse);
    console.log('Client result:', clientEmailResponse);

    const internalSuccess = internalEmailResponse.status === 'fulfilled' && internalEmailResponse.value.success;
    const clientSuccess = clientEmailResponse.status === 'fulfilled' && clientEmailResponse.value.success;

    if (internalSuccess && clientSuccess) {
      console.log('🎉 === SUCCÈS COMPLET ===');
      console.log('✅ Demande d'informations traitée avec succès:', {
        agentTitle,
        clientEmail,
        timestamp: new Date().toISOString(),
        simulated: internalEmailResponse.value.simulated || clientEmailResponse.value.simulated || false
      });

      return res.status(200).json({ 
        message: 'Demande d'informations envoyée avec succès',
        success: true,
        simulated: internalEmailResponse.value.simulated || clientEmailResponse.value.simulated || false
      });
    } else {
      // 📝 LOG DÉTAILLÉ DES ERREURS
      console.error('💥 === ÉCHEC ENVOI ===');
      if (!internalSuccess) {
        console.error('❌ Email interne failed:', 
          internalEmailResponse.status === 'rejected' 
            ? internalEmailResponse.reason 
            : internalEmailResponse.value
        );
      }
      if (!clientSuccess) {
        console.error('❌ Email client failed:', 
          clientEmailResponse.status === 'rejected' 
            ? clientEmailResponse.reason 
            : clientEmailResponse.value
        );
      }

      const errorMessage = !internalSuccess && !clientSuccess 
        ? 'Erreur lors de l\'envoi des deux emails'
        : !internalSuccess 
          ? 'Erreur lors de l\'envoi de l\'email interne'
          : 'Erreur lors de l\'envoi de l\'email client';

      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error('💥 === ERREUR GÉNÉRALE API ===');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    const isDev = process.env.NODE_ENV === 'development';
    
    return res.status(500).json({ 
      message: 'Erreur lors du traitement de votre demande',
      success: false,
      error: isDev ? error.message : 'Erreur interne',
      // 🔍 Infos de debug en développement
      debug: isDev ? {
        timestamp: new Date().toISOString(),
        stack: error.stack,
        env: {
          SMTP_HOST: process.env.SMTP_HOST || 'NON_DEFINI',
          SMTP_USER: process.env.SMTP_USER || 'NON_DEFINI',
          hasPass: !!process.env.SMTP_PASS,
          INTERNAL_EMAIL: process.env.INTERNAL_EMAIL || 'NON_DEFINI'
        }
      } : undefined
    });
  }
}
