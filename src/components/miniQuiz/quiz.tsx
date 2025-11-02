import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preguntasBiblicas, Pregunta } from './preguntasQuiz';
import { FaTimes, FaTrophy, FaDownload, FaApple, FaGooglePlay } from 'react-icons/fa';
import { 
  guardarResultadoQuiz, 
  registrarDescargaApp, 
  verificarAppDescargada 
} from '../../services/quizService';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Quiz({ isOpen, onClose }: QuizProps) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [quizCompletado, setQuizCompletado] = useState(false);
  const [tiemposRespuesta, setTiemposRespuesta] = useState<number[]>([]);
  const [tiempoInicio, setTiempoInicio] = useState<number>(0);
  const [appDescargada, setAppDescargada] = useState(false);

  // Timer para cada pregunta
  useEffect(() => {
    if (isOpen && !quizCompletado && tiempoRestante > 0) {
      const timer = setTimeout(() => {
        setTiempoRestante(tiempoRestante - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (tiempoRestante === 0 && !quizCompletado) {
      // Tiempo agotado, pasar a la siguiente pregunta
      manejarSiguientePregunta();
    }
  }, [tiempoRestante, isOpen, quizCompletado]);

  // Resetear el quiz cuando se abre
  useEffect(() => {
    if (isOpen) {
      setPreguntaActual(0);
      setRespuestas([]);
      setMostrarResultado(false);
      setPuntuacion(0);
      setTiempoRestante(30);
      setMostrarExplicacion(false);
      setQuizCompletado(false);
      setTiemposRespuesta([]);
      setTiempoInicio(Date.now());
      setAppDescargada(verificarAppDescargada());
    }
  }, [isOpen]);

  const manejarRespuesta = (opcionSeleccionada: number) => {
    const tiempoRespuesta = 30 - tiempoRestante;
    const nuevaRespuesta = opcionSeleccionada;
    
    setRespuestas([...respuestas, nuevaRespuesta]);
    setTiemposRespuesta([...tiemposRespuesta, tiempoRespuesta]);
    
    // Verificar si la respuesta es correcta
    const pregunta = preguntasBiblicas[preguntaActual];
    if (nuevaRespuesta === pregunta.respuestaCorrecta) {
      setPuntuacion(puntuacion + 1);
    }
    
    setMostrarResultado(true);
    setMostrarExplicacion(true);
  };

  const manejarSiguientePregunta = () => {
    if (preguntaActual < preguntasBiblicas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setMostrarResultado(false);
      setMostrarExplicacion(false);
      setTiempoRestante(30);
    } else {
      // Quiz completado
      setQuizCompletado(true);
      // Guardar resultado en la base de datos
      guardarResultadoEnDB();
    }
  };

  const guardarResultadoEnDB = async () => {
    const tiempoTotal = Date.now() - tiempoInicio;
    

    await guardarResultadoQuiz(puntuacion, tiempoTotal);
  };

  const reiniciarQuiz = () => {
    setPreguntaActual(0);
    setRespuestas([]);
    setMostrarResultado(false);
    setPuntuacion(0);
    setTiempoRestante(30);
    setMostrarExplicacion(false);
    setQuizCompletado(false);
    setTiemposRespuesta([]);
    setTiempoInicio(Date.now());
  };

  const manejarDescargaApp = async (plataforma: 'ios' | 'android') => {
    await registrarDescargaApp(plataforma);
    setAppDescargada(true);
  };

  const pregunta = preguntasBiblicas[preguntaActual];
  const progreso = ((preguntaActual + 1) / preguntasBiblicas.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Quiz Bíblico</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Pregunta {preguntaActual + 1} de {preguntasBiblicas.length}</span>
              <span>{tiempoRestante}s</span>
            </div>
          </div>

          {/* Contenido del Quiz */}
          <div className="p-6">
            {!quizCompletado ? (
              <>
                {/* Pregunta */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {pregunta.pregunta}
                  </h3>
                  
                  {/* Opciones */}
                  <div className="space-y-3">
                    {pregunta.opciones.map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => !mostrarResultado && manejarRespuesta(index)}
                        disabled={mostrarResultado}
                        className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                          mostrarResultado
                            ? index === pregunta.respuestaCorrecta
                              ? 'border-green-500 bg-green-500/20 text-green-100'
                              : index === respuestas[respuestas.length - 1] && index !== pregunta.respuestaCorrecta
                              ? 'border-red-500 bg-red-500/20 text-red-100'
                              : 'border-gray-600 bg-gray-800 text-gray-400'
                            : 'border-gray-600 bg-gray-800 hover:border-blue-500 hover:bg-blue-500/20 text-white'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {opcion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explicación */}
                {mostrarExplicacion && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl"
                  >
                    <h4 className="font-semibold text-blue-300 mb-2">Explicación:</h4>
                    <p className="text-blue-200">{pregunta.explicacion}</p>
                  </motion.div>
                )}

                {/* Botón siguiente */}
                {mostrarResultado && (
                  <div className="flex justify-center">
                    <button
                      onClick={manejarSiguientePregunta}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      {preguntaActual < preguntasBiblicas.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Resultados finales */
              <div className="text-center">
                <div className="mb-6">
                  <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">¡Quiz Completado!</h3>
                  <p className="text-gray-300 mb-4">
                    Obtuviste {puntuacion} de {preguntasBiblicas.length} respuestas correctas
                  </p>
                  
                  {/* Mensaje según puntuación */}
                  <div className="mb-6">
                    {puntuacion === preguntasBiblicas.length && (
                      <p className="text-green-400 text-lg font-semibold">¡Perfecto! Eres un experto bíblico</p>
                    )}
                    {puntuacion >= 4 && puntuacion < preguntasBiblicas.length && (
                      <p className="text-blue-400 text-lg font-semibold">¡Excelente! Tienes buen conocimiento bíblico</p>
                    )}
                    {puntuacion >= 3 && puntuacion < 4 && (
                      <p className="text-yellow-400 text-lg font-semibold">¡Bien! Sigue estudiando la Palabra</p>
                    )}
                    {puntuacion < 3 && (
                      <p className="text-orange-400 text-lg font-semibold">¡Sigue aprendiendo! La práctica hace al maestro</p>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                  <button
                    onClick={reiniciarQuiz}
                    className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Jugar de Nuevo
                  </button>
                  
                  {!appDescargada && (
                    <div className="text-center">
                      <p className="text-gray-300 mb-4">¿Te gustó el quiz? ¡Descarga la app completa!</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="https://apps.apple.com/do/app/quizbible/id6745747418?|=en-GB"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => manejarDescargaApp('ios')}
                          className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          <FaApple className="text-xl" />
                          <span className="font-semibold">App Store</span>
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.moreno.dev.QuizBible"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => manejarDescargaApp('android')}
                          className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-green-400 transition-colors"
                        >
                          <FaGooglePlay className="text-xl" />
                          <span className="text-xl" />
                          <span className="font-semibold">Google Play</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {appDescargada && (
                    <div className="text-center">
                      <p className="text-green-400 text-lg font-semibold mb-4">
                        ¡Gracias por descargar la app! 🎉
                      </p>
                      <p className="text-gray-300">
                        Disfruta de todas las funcionalidades de QuizBible
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
