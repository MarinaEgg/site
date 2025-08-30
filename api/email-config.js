// api/email-config.js - VERSION ULTRA-SIMPLE qui DOIT fonctionner

export async function sendEmailWithNodemailer(emailContent) {
  console.log('🔧 === EMAIL SIMPLE VERSION ===');
  
  try {
    console.log('📦 Import nodemailer simple...');
    
    // 🚀 MÉTHODE LA PLUS SIMPLE : Require classique dans une fonction async
    const nodemailer = eval('require')('nodemailer');
    console.log('✅ Nodemailer importé via require');
    
    console.log('🚛 Création transporteur...');
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // 🔧 Utilisation du service Gmail directement
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
      from: `"${process.env.FROM_NAME || 'EggOn Technology'}" <${process.env.FROM_EMAIL || 'contact@eggon-technology.com'}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      replyTo: process.env.FROM_EMAIL || 'contact@eggon-technology.com'
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
    // Import avec await import()
    const nodemailerModule = await import('nodemailer');
    
    // Essayer différentes façons d'accéder à createTransporter
    let nodemailer;
    if (nodemailerModule.default) {
      nodemailer = nodemailerModule.default;
    } else {
      nodemailer = nodemailerModule;
    }
    
    console.log('✅ Nodemailer loaded');
    
    const transporter = nodemailer.createTransporter({
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
