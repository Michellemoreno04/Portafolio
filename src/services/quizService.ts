import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface UsuarioWeb {
  id?: string;
  fechaPrimeraVez: any;
  ultimaVez: any;
  quizCompletado: boolean;
  puntuacionMaxima: number;
  intentos: number;
  descargadoApp: boolean;
  plataformaDescarga?: 'ios' | 'android' | null;
  
}

export interface ResultadoQuiz {
  usuarioId: string;
  fecha: any;
  puntuacion: number;
  tiempoTotal: number;
 
}

// Generar ID único para el usuario
const generarIdUsuario = (): string => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Obtener ID del usuario desde localStorage
const obtenerIdUsuario = (): string => {
  let userId = localStorage.getItem('quizbible_user_id');
  if (!userId) {
    userId = generarIdUsuario();
    localStorage.setItem('quizbible_user_id', userId);
  }
  return userId;
};

// Verificar si el usuario ya completó el quiz
export const verificarQuizCompletado = (): boolean => {
  return localStorage.getItem('quizbible_quiz_completado') === 'true';
};

// Marcar quiz como completado en localStorage
export const marcarQuizCompletado = (): void => {
  localStorage.setItem('quizbible_quiz_completado', 'true');
};

// Guardar resultado del quiz en Firebase
export const guardarResultadoQuiz = async (
  puntuacion: number,
  
  tiempoTotal: number
): Promise<void> => {
  try {
    const userId = obtenerIdUsuario();
    const fecha = new Date();
    
    // Crear documento de usuario si no existe
    const usuarioRef = collection(db, 'usuarios_web');
    const q = query(usuarioRef, where('id', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Usuario nuevo - crear documento
      const nuevoUsuario: UsuarioWeb = {
        id: userId,
        fechaPrimeraVez: serverTimestamp(),
        ultimaVez: serverTimestamp(),
        quizCompletado: true,
        puntuacionMaxima: puntuacion,
        intentos: 1,
        descargadoApp: false,
       
      };
      
      await addDoc(usuarioRef, nuevoUsuario);
    } else {
      // Usuario existente - actualizar documento
      const docRef = doc(db, 'usuarios_web', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        ultimaVez: serverTimestamp(),
        quizCompletado: true,
        intentos: querySnapshot.docs[0].data().intentos + 1,
        puntuacionMaxima: Math.max(querySnapshot.docs[0].data().puntuacionMaxima || 0, puntuacion),
       
      });
    }
    
    // Marcar como completado en localStorage
    marcarQuizCompletado();
    
  } catch (error) {
    console.error('Error al guardar resultado del quiz:', error);
    // Aún marcamos como completado en localStorage para evitar mostrar el modal
    marcarQuizCompletado();
  }
};

// Registrar descarga de la app
export const registrarDescargaApp = async (plataforma: 'ios' | 'android'): Promise<void> => {
  try {
    const userId = obtenerIdUsuario();
    const usuarioRef = collection(db, 'usuarios_web');
    const q = query(usuarioRef, where('id', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = doc(db, 'usuarios_web', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        descargadoApp: true,
        plataformaDescarga: plataforma,
        ultimaVez: serverTimestamp()
      });
    }
    
    // Guardar en localStorage también
    localStorage.setItem('quizbible_app_descargada', 'true');
    
  } catch (error) {
    console.error('Error al registrar descarga de la app:', error);
    // Aún guardamos en localStorage
    localStorage.setItem('quizbible_app_descargada', 'true');
  }
};

// Verificar si ya descargó la app
export const verificarAppDescargada = (): boolean => {
  return localStorage.getItem('quizbible_app_descargada') === 'true';
};
