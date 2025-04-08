import React from 'react';
import { Code2, Smartphone, Globe, Server, Database, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const technologies = [
  {
    icon: <Code2 className="w-12 h-12" />,
    name: 'Desarrollo Frontend',
    skills: ['JavaScript', 'React', 'TypeScript'],
    description: 'Creación de interfaces modernas y responsivas con las últimas tecnologías web.',
    level: '95%'
  },
 
  {
    icon: <Smartphone className="w-12 h-12" />,
    name: 'Desarrollo Móvil',
    skills: ['React Native', 'iOS', 'Android'],
    description: 'Desarrollo de aplicaciones móviles nativas y multiplataforma.',
    level: '85%'
  },
  {
    icon: <Database className="w-12 h-12" />,
    name: 'Bases de Datos',
    skills: ['Firebase'],
    description: 'Gestión y optimización de bases de datos NoSQL.',
    level: '88%'
  },
  {
    icon: <Globe className="w-12 h-12" />,
    name: 'CMS & E-commerce',
    skills: ['WordPress', 'WooCommerce', 'Shopify'],
    description: 'Desarrollo y personalización de sitios web comerciales.',
    level: '80%'
  },
  
];

export default function Skills() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center"
          {...fadeIn}
        >
          Dominio de <span className="text-blue-500">Tecnologías</span>
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-blue-500 mb-6">{tech.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{tech.name}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {tech.skills.map((skill, i) => (
                  <span key={i} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 mb-6">{tech.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: tech.level }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}