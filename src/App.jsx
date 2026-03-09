import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopOnMount from './components/layout/ScrollToTopOnMount';
import CookieConsent from './components/ui/ConsentBanner';
import { hasAnalyticsConsent, initGA, trackPageView } from './utils/analytics';
import Home from './pages/Home';

const Tjenester = lazy(() => import('./pages/Tjenester'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const Prosjekter = lazy(() => import('./pages/Prosjekter'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <div key={location.pathname} className="page-transition">
          <Suspense fallback={null}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/prosjekter" element={<Prosjekter />} />
              <Route path="/tjenester" element={<Tjenester />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}

export default App;
