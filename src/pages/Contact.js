import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/header/Header';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  contentSection: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1,
    margin: 0,
    padding: 0,
    paddingTop: '80px',
    '@media (max-width: 768px)': {
      paddingTop: '70px',
    },
  }
}));

export const Contact = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Remplacer par votre endpointt d'email
      console.log('Form data to send:', formData);

      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.contentSection}>
        <section
          style={{
            minHeight: '100vh',
            width: '100%',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1rem, 3vw, 2rem)',
            backgroundColor: 'transparent',
            color: '#fafafa',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginBottom: 'clamp(3rem, 6vh, 4rem)'
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                  fontWeight: '600',
                  color: 'rgba(250, 250, 250, 0.8)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {t('navigation.contact').toUpperCase()}
              </h3>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '700',
                  color: '#fafafa',
                  lineHeight: '1.1',
                  marginBottom: '2rem',
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {t('contact.title')}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                  color: 'rgba(250, 250, 250, 0.9)',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {t('contact.subtitle')}
              </p>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                position: 'relative'
              }}
            >
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {/* Name Field */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'rgba(250, 250, 250, 0.9)',
                        marginBottom: '0.5rem',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        color: '#fafafa',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fce96b';
                        e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'rgba(250, 250, 250, 0.9)',
                        marginBottom: '0.5rem',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        color: '#fafafa',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fce96b';
                        e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {/* Company Field */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'rgba(250, 250, 250, 0.9)',
                        marginBottom: '0.5rem',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        color: '#fafafa',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fce96b';
                        e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'rgba(250, 250, 250, 0.9)',
                        marginBottom: '0.5rem',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        color: '#fafafa',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fce96b';
                        e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: '2rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'rgba(250, 250, 250, 0.9)',
                      marginBottom: '0.5rem',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1rem',
                      color: '#fafafa',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      resize: 'vertical',
                      minHeight: '120px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#fce96b';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center' }}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '0.6rem 1.5rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: isSubmitting ? 'rgba(47, 47, 46, 0.7)' : '#2f2f2e',
                      background: isSubmitting ? 'rgba(252, 233, 107, 0.6)' : 'transparent',
                      border: `1px solid ${isSubmitting ? 'rgba(252, 233, 107, 0.6)' : '#fce96b'}`,
                      borderRadius: '50px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.4s ease-out',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      textTransform: 'none',
                      letterSpacing: '0.1em',
                      minWidth: '180px',
                      height: '40px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = '#fce96b';
                        e.target.style.color = '#2f2f2e';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#fce96b';
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transition: 'all 0.4s ease-out',
                      transform: 'translateX(0)'
                    }}>
                      <span style={{
                        marginRight: '8px',
                        opacity: 0,
                        transition: 'all 0.4s ease-out'
                      }}>→</span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        {isSubmitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <div
                              style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(47, 47, 46, 0.3)',
                                borderTop: '2px solid #2f2f2e',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }}
                            />
                            Sending...
                          </span>
                        ) : (
                          <>
                            Send Message
                            <span style={{
                              marginLeft: '8px',
                              opacity: 1,
                              transition: 'all 0.4s ease-out'
                            }}>→</span>
                          </>
                        )}
                      </span>
                    </div>
                  </motion.button>
                </div>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      background: submitStatus === 'success'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      border: `1px solid ${submitStatus === 'success'
                        ? 'rgba(34, 197, 94, 0.3)'
                        : 'rgba(239, 68, 68, 0.3)'}`,
                      color: submitStatus === 'success' ? '#22c55e' : '#ef4444'
                    }}
                  >
                    {submitStatus === 'success'
                      ? '✓ Message sent successfully! We\'ll get back to you soon.'
                      : '✗ Failed to send message. Please try again.'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
