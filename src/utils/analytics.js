const GA_MEASUREMENT_ID = 'G-5Q6VCE7FSP';

export const initGA = () => {
  if (window.gtag) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false, // important for SPA
  });
};

export const trackPageView = (url) => {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
  });
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, eventParams);
};

export const hasAnalyticsConsent = () => {
  return localStorage.getItem('analyticsConsent') === 'accepted';
};

export const setAnalyticsConsent = (accepted) => {
  localStorage.setItem('analyticsConsent', accepted ? 'accepted' : 'declined');
  if (accepted) initGA();
};
