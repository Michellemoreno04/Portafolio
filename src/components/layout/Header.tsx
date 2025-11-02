import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-blue-900/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-blue-500"
        >
          Portfolio
        </motion.div>

        {/* Menú para desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex gap-6"
        >
          <a href="#home" className="hover:text-blue-500 transition-colors">Inicio</a>
          <a href="#skills" className="hover:text-blue-500 transition-colors">Tecnologías</a>
          <a href="#projects" className="hover:text-blue-500 transition-colors">Proyectos</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">Contacto</a>
        </motion.div>

        {/* Botón del menú móvil */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú móvil */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm py-4 px-4"
          >
            <div className="flex flex-col items-end mr-5 gap-4">
              <a 
                href="#home" 
                className="hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#skills" 
                className="hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tecnologías
              </a>
             <a 
                href="#projects" 
                className="hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Proyectos
              </a>
              <a 
                href="#contact" 
                className="hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}