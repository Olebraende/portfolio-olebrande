import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopOnMount from './components/layout/ScrollToTopOnMount';
import CookieConsent from './components/ui/CookieConsent';
import { hasAnalyticsConsent, initGA, trackPageView } from './utils/analytics';
import Home from './pages/Home';
import Tjenester from './pages/Tjenester';
import Kontakt from './pages/Kontakt';

function App() {
  const location = useLocation();

  // Initialize analytics if user has previously given consent
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initGA();
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return (
    <>
      <ScrollToTopOnMount />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tjenester" element={<Tjenester />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}

export default App;