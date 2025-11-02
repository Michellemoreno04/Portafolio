export interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
}



export const preguntasBiblicas: Pregunta[] = [
  {
    id: 1,
    pregunta: "¿Quién construyó el arca según la Biblia?",
    opciones: ["Moisés", "Noé", "Abraham", "David"],
    respuestaCorrecta: 1,
    explicacion: "Noé construyó el arca por mandato de Dios para salvar a su familia y a los animales del diluvio."
  },
  {
    id: 2,
    pregunta: "¿Cuántos discípulos tuvo Jesús?",
    opciones: ["10", "11", "12", "13"],
    respuestaCorrecta: 2,
    explicacion: "Jesús tuvo 12 discípulos principales: Pedro, Andrés, Santiago, Juan, Felipe, Bartolomé, Tomás, Mateo, Santiago hijo de Alfeo, Tadeo, Simón y Judas Iscariote."
  },
  {
    id: 3,
    pregunta: "¿En qué ciudad nació Jesús?",
    opciones: ["Jerusalén", "Nazaret", "Belén", "Galilea"],
    respuestaCorrecta: 2,
    explicacion: "Jesús nació en Belén de Judea, como profetizó Miqueas: 'Pero tú, Belén Efrata, aunque eres pequeña entre los millares de Judá, de ti me saldrá el que será Señor en Israel.'"
  },
  {
    id: 4,
    pregunta: "¿Quién fue el primer rey de Israel?",
    opciones: ["David", "Salomón", "Saúl", "Samuel"],
    respuestaCorrecta: 2,
    explicacion: "Saúl fue el primer rey de Israel, ungido por Samuel. Gobernó durante aproximadamente 40 años antes de ser sucedido por David."
  },
  {
    id: 5,
    pregunta: "¿Cuál es el primer libro de la Biblia?",
    opciones: ["Éxodo", "Génesis", "Levítico", "Números"],
    respuestaCorrecta: 1,
    explicacion: "Génesis es el primer libro de la Biblia y significa 'origen' o 'comienzo'. Relata la creación del mundo y los orígenes del pueblo de Israel."
  }
];
