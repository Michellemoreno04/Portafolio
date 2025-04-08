
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico completa con gestión de productos, carrito de compras y pasarela de pagos.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=500"
  },
  {
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico completa con gestión de productos, carrito de compras y pasarela de pagos.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=500"
  },

  {
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico completa con gestión de productos, carrito de compras y pasarela de pagos.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=500"
  },
  
 
];

export default function Projects() {
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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center"
          {...fadeIn}
        >
          Proyectos <span className="text-blue-500">Destacados</span>
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <button >
                <motion.a 
                  href="#"
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center text-blue-500 hover:text-blue-400"
                >
                  Visitar <ChevronRight className="w-4 h-4 ml-1" />
                </motion.a>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}