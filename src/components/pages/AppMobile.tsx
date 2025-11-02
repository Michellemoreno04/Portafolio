import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import flayer from '../../assets/image/quizbible-flayer.png';
import Quiz from '../miniQuiz/quiz';
import { verificarQuizCompletado } from '../../services/quizService';

export default function AppMobile() {
  const [mostrarQuiz, setMostrarQuiz] = useState(false);

  // Mostrar el quiz automáticamente solo si no se ha completado antes
  useEffect(() => {
    const quizCompletado = verificarQuizCompletado();
    
    if (!quizCompletado) {
      const timer = setTimeout(() => {
        setMostrarQuiz(true);
      }, 1000); // Mostrar después de 1 segundo

      return () => clearTimeout(timer);
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <section className="px-4 pt-6 pb-5">
        {/* Barra fija superior con botones */}
        <div
          className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur border-b border-white/10"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://apps.apple.com/do/app/quizbible/id6745747418?|=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-64 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs leading-none">Descargar en</div>
                  <div className="text-sm font-semibold">App Store (iOS)</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.moreno.dev.QuizBible"
                target="_blank"
                rel="noopener noreferrer"
                className="w-64 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-green-400 transition-colors"
              >
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs leading-none">Disponible en</div>
                  <div className="text-sm font-semibold">Google Play (Android)</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            {...fadeIn}
          >
            Aplicación Mobile
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-3xl mx-auto text-center mb-12"
            {...fadeIn}
          >
QuizBible es una app móvil cristiana que combina devocionales diarios, versículos del día, preguntas bíblicas (solo y multijugador) y un chat guía bíblico ("Nilu"), todo gamificado con rachas, niveles, insignias y recordatorios, para ayudarte a crear un hábito de estudio y meditación en la Palabra.        </motion.p>

          <motion.div {...fadeIn} className="order-2 lg:order-1">
            <div className="aspect-[9/16] max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gray-800">
              <img
                src={flayer}
                alt="Vista previa de la app"
                className="w-full h-full object-cover "
              />
            </div>
          </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div {...fadeIn} className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-4 mt-10">Características principales</h2>
            <ul className="space-y-3 text-gray-300 mb-8 list-disc pl-5">
              <li>Versículo del día: Ver, guardar en favoritos y compartir como imagen.</li>
              <li>Quiz bíblico (solo): Puntuación, experiencia, niveles, vidas/monedas, modales de nivel y racha, música/sonidos.</li>
              <li>Quiz online: Preguntas en salas en tiempo real con conteo de respuestas y resultados.</li>
              <li>Chat bíblico (Nilu): Respuestas a preguntas con historial, límites diarios y opción premium para más mensajes.</li>
             
            </ul>

           
          </motion.div>
         
        </div>

        
          <div>
        <h2 className="text-2xl font-semibold mb-4 mt-5">Cómo te ayuda a acercarte más a Dios</h2>
        <ul className="space-y-3 text-gray-300 mb-8 list-disc pl-5">
        <li>Hábito diario: Versículo del día y lecturas temáticas con recordatorios y rachas para perseverar cada día.</li>
        <li>Comprensión bíblica: Quizzes con referencias y feedback que refuerzan lo aprendido y corrigen errores.</li>
        <li>Acompañamiento: Chat guía bíblico (Nilu) para dudas comunes sobre fe, amor, perdón, etc., con límites diarios sanos.</li>
        <li>Motivación y comunidad: Multijugador online, insignias, niveles y rachas que animan la constancia y el compañerismo.</li>
        <li>Memoria espiritual: Guarda y comparte versículos clave para atesorar la Palabra y bendecir a otros.</li>
        <li>Accesibilidad: Audio, interfaz sencilla y guía visual para facilitar el estudio a cualquier ritmo.</li>
        </ul>
      </div>
      </div>

     
    </section>

      {/* Modal del Quiz - Solo se muestra si no se ha completado antes */}
      <Quiz 
        isOpen={mostrarQuiz} 
        onClose={() => setMostrarQuiz(false)} 
      />
    </>
  );
}

