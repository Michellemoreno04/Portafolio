# Configuración de Firebase para QuizBible

## 🔥 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita Firestore Database en tu proyecto

### 2. Configurar Firestore Database
1. En la consola de Firebase, ve a "Firestore Database"
2. Crea una base de datos en modo de prueba (para desarrollo)
3. Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura en la colección usuarios_web
    match /usuarios_web/{document} {
      allow read, write: if true; // Para desarrollo - cambiar en producción
    }
  }
}
```

### 3. Obtener credenciales de configuración
1. En la consola de Firebase, ve a "Project Settings" (⚙️)
2. En la pestaña "General", busca "Your apps"
3. Si no tienes una app web, crea una nueva
4. Copia la configuración que aparece

### 4. Actualizar archivo de configuración
Reemplaza el contenido de `src/firebase/config.ts` con tus credenciales reales:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU-API-KEY-REAL",
  authDomain: "tu-proyecto-real.firebaseapp.com",
  projectId: "tu-proyecto-real-id",
  storageBucket: "tu-proyecto-real.appspot.com",
  messagingSenderId: "tu-messaging-sender-id-real",
  appId: "tu-app-id-real"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
```

## 📊 Estructura de la Base de Datos

### Colección: `usuarios_web`
Cada documento representa un usuario que ha completado el quiz:

```typescript
{
  id: "user_1234567890_abc123", // ID único generado
  fechaPrimeraVez: Timestamp,   // Primera vez que completó el quiz
  ultimaVez: Timestamp,         // Última vez que interactuó
  quizCompletado: true,         // Si completó el quiz
  puntuacionMaxima: 5,          // Mejor puntuación obtenida
  intentos: 1,                  // Número de veces que ha jugado
  descargadoApp: false,         // Si descargó la app
  plataformaDescarga: "ios" | "android" | null, // Plataforma de descarga
  respuestas: [                 // Array de respuestas del último quiz
    {
      preguntaId: 1,
      respuestaUsuario: 1,      // Índice de la opción seleccionada
      correcta: true,           // Si la respuesta fue correcta
      tiempoRespuesta: 15       // Tiempo en segundos para responder
    }
  ]
}
```

## 🔒 Seguridad y Producción

### Reglas de Firestore para Producción
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios_web/{document} {
      // Solo permitir escritura si el usuario está autenticado
      allow read, write: if request.auth != null;
      
      // O si quieres permitir escritura anónima pero con validación
      allow create: if request.resource.data.id != null;
      allow update: if request.resource.data.id == resource.data.id;
    }
  }
}
```

### Variables de Entorno
Para mayor seguridad, considera usar variables de entorno:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... etc
};
```

## 🚀 Funcionalidades Implementadas

✅ **Almacenamiento de respuestas** en Firebase  
✅ **Tracking de descargas** de la app  
✅ **Persistencia local** para evitar mostrar el modal repetidamente  
✅ **Estadísticas del usuario** (puntuación, intentos, tiempo)  
✅ **Identificación única** de usuarios  
✅ **Manejo de errores** con fallback a localStorage  

## 📱 Cómo Funciona

1. **Primera visita**: El modal se muestra automáticamente
2. **Usuario completa el quiz**: Los resultados se guardan en Firebase
3. **Usuario descarga la app**: Se registra la descarga en la base de datos
4. **Visitas posteriores**: El modal no se muestra (verificado por localStorage)
5. **Datos persistentes**: Toda la información se mantiene en Firebase

## 🔧 Troubleshooting

### Error: "Firebase: Error (auth/network-request-failed)"
- Verifica tu conexión a internet
- Revisa las reglas de Firestore
- Confirma que las credenciales sean correctas

### Error: "Firebase: Error (auth/invalid-api-key)"
- Verifica que el API key sea correcto
- Asegúrate de que la app esté habilitada en Firebase Console

### El modal sigue apareciendo
- Verifica que localStorage esté funcionando
- Revisa la consola del navegador para errores
- Confirma que `verificarQuizCompletado()` esté retornando el valor correcto
