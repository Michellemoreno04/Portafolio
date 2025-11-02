
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import AppMobile from './components/pages/AppMobile';

function App() {
  const location = useLocation();
  const shouldShowHeader = !location.pathname.startsWith('/app-mobile');
  
  // Asegura que al cambiar de ruta la vista inicie arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Hero />
              <Skills />
              <Projects />
              <Contact />
            </>
          )}
        />
        <Route path="/app-mobile" element={<AppMobile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;