
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
 
  { icon: <Mail className="w-6 h-6" />, label: "Email", URL:'mailto:morenov.dev@gmail.com' },
  
];

// ... resto del código existente ...
export default function Contact() {
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
    <section id="contact" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center"
          {...fadeIn}
        >
          Contactame
        </motion.h2>
        <motion.div 
          className="flex justify-center gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.URL}
              aria-label={social.label}
              title={social.label}
              variants={fadeIn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 transition-colors group"
            >
              <div className="text-blue-500 group-hover:text-blue-400 transition-colors">
                {social.icon}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}