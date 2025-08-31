// api/test-email.js - Route de test pour Vercel

export default async function handler(req, res) {
  console.log('🧪 === TEST EMAIL VERCEL ===');
  
  try {
    // Test 1: Variables d'environnement
    console.log('📋 Variables env:');
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS longueur:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 'UNDEFINED');
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL);
    console.log('INTERNAL_EMAIL:', process.env.INTERNAL_EMAIL);
    
    // Test 2: Import nodemailer
    const nodemailer = eval('require')('nodemailer');
    console.log('✅ Nodemailer chargé');
    
    // Test 3: Créer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✅ Transporter créé');
    
    // Test 4: Vérifier connexion
    await transporter.verify();
    console.log('✅ Connexion Gmail OK!');
    
    // Test 5: Envoi email simple
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.INTERNAL_EMAIL,
      subject: 'Test Vercel - Configuration Email EggOn',
      html: `
        <h2>Test de configuration Vercel réussi!</h2>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>Configuration email fonctionnelle.</p>
        <p>SMTP_USER: ${process.env.SMTP_USER}</p>
        <p>FROM_EMAIL: ${process.env.FROM_EMAIL}</p>
      `
    });
    
    console.log('✅ Email envoyé! ID:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Test email envoyé avec succès!'
    });
    
  } catch (error) {
    console.error('❌ Erreur test:', error.message);
    console.error('Stack:', error.stack);
    
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
}
