import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';
import Container from '../components/layout/Container';
import Toast from '../components/ui/Toast';
import styles from '../styles/modules/Kontakt.module.css';

const Kontakt = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const email = 'olembrande.work@gmail.com';

  // Set page meta tags
  usePageMeta(
    `${t.contact.title} | Ole Brænde`,
    language === 'no'
      ? 'Ta kontakt for et uforpliktende tilbud. Jeg hjelper deg med webutvikling, hosting og vedlikehold.'
      : 'Get in touch for a no-obligation quote. I help you with web development, hosting and maintenance.'
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        setToastMessage(t.contact.success);
        setShowToast(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setToastMessage(t.contact.error);
        setShowToast(true);
      }
    } catch {
      setToastMessage(t.contact.error);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    setToastMessage(t.contact.emailCopied);
    setShowToast(true);
  };

  return (
    <div className={styles.kontakt}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.title}>
            <span className="gradient-text">{t.contact.title}</span>
          </h1>
          <p className={styles.subtitle}>{t.contact.subtitle}</p>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            {/* Contact Form */}
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>{t.contact.formTitle}</h2>
              
              <form
                name="contact"
                method="POST"
                action="/kontakt"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className={styles.form}
              >
                {/* Netlify form fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className={styles.formGroup}>
                  <label htmlFor="name">{t.contact.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{t.contact.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{t.contact.subject}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                  {!isSubmitting && <i className="bx bx-send"></i>}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>{t.contact.infoTitle}</h3>
              
              <div className={styles.infoItem}>
                <i className="bx bx-envelope"></i>
                <div>
                  <strong>{t.contact.emailLabel}</strong>
                  <p>{email}</p>
                  <button
                    className={styles.copyBtn}
                    onClick={copyEmailToClipboard}
                  >
                    <i className="bx bx-copy"></i>
                    {t.contact.copyEmail}
                  </button>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <a
                  href="https://www.linkedin.com/in/olebrande/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <i className="bx bxl-linkedin"></i>
                  {t.contact.linkedinLabel}
                </a>
                
                <a
                  href="https://github.com/Olebraende"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <i className="bx bxl-github"></i>
                  {t.contact.githubLabel}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Kontakt;