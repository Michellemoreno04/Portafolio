import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          
        >
          <h1 className="text-5xl font-bold mb-4">
            Hola, Soy <span className="text-blue-500">Michelle Moreno</span> {' '}
            <span className="text-blue-500">Desarrollador Frontend</span>
          </h1>
          <p className="text-gray-400 mb-6 text-lg leading-relaxed">
            Con más de 4 años de experiencia en el desarrollo de aplicaciones web y móviles,
            me especializo en crear soluciones digitales innovadoras que combinan diseño 
            excepcional con funcionalidad robusta. Mi pasión es transformar ideas en 
            experiencias digitales memorables.
          </p>
          <div className="flex gap-4">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-colors"
            >
              Contáctame
            </motion.a>
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-500/10 transition-colors"
            >
              Ver Proyectos
            </motion.a>
          </div>
        </motion.div>
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-blue-500/70 blur-3xl rounded-full"></div>
          <img 
            src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_960_720.png"
            alt="Profile"
            className="relative  shadow-2xl rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}