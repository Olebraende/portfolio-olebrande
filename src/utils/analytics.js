/**
 * Google Analytics 4 (GA4) Integration
 * Only loads and tracks when user has given consent
 */

// Replace with your actual GA4 Measurement ID
// Get this from: https://analytics.google.com -> Admin -> Data Streams
const GA_MEASUREMENT_ID = 'G-5Q6VCE7FSP'; // TODO: Replace with your ID

/**
 * Initialize Google Analytics
 * Only call this after user has given analytics consent
 */
export const initGA = () => {
  // Check if already loaded
  if (window.gtag) {
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // Anonymize IPs for GDPR
    cookie_flags: 'SameSite=None;Secure', // Secure cookies
  });

  console.log('Google Analytics initialized');
};

/**
 * Track page view
 * Call this on route changes
 */
export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom event
 * Example: trackEvent('contact_form', { method: 'email' })
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Check if user has given analytics consent
 */
export const hasAnalyticsConsent = () => {
  const consent = localStorage.getItem('analyticsConsent');
  return consent === 'accepted';
};

/**
 * Save analytics consent
 */
export const setAnalyticsConsent = (accepted) => {
  if (accepted) {
    localStorage.setItem('analyticsConsent', 'accepted');
    initGA(); // Initialize immediately if accepted
  } else {
    localStorage.setItem('analyticsConsent', 'declined');
  }
};