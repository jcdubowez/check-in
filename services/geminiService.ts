
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getDeveloperInsight = async (
  completion: number,
  bugs: number,
  satisfaction: number,
  comments?: string
) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un mentor de ingeniería experimentado. Un desarrollador ha reportado lo siguiente para este mes en Sooft:
      - Completitud de tareas: ${completion}%
      - Cantidad de bugs: ${bugs}
      - Nivel de satisfacción (1-5): ${satisfaction}
      ${comments ? `- Comentarios adicionales del dev: "${comments}"` : ""}
      
      Regla importante: Si los bugs son mayores a 2, considera que la calidad del desarrollo es "moderada" o "preocupante" y ofrece consejos técnicos específicos.
      
      IMPORTANTE: No te propongas tú mismo como ayuda directa (ej. "yo te ayudo"). En su lugar, indica que "Desde Sooft vamos a estar acompañándote" o "En Sooft estamos para apoyarte en lo que necesites".
      
      Escribe una respuesta corta (máximo 3 frases) motivadora y profesional. Si la satisfacción es baja, sé empático. Si todo es positivo y los bugs son 0-2, celebra su éxito. Responde en Español.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Buen trabajo completando tu revisión mensual! Desde Sooft vamos a estar acompañándote para que sigas creciendo.";
  }
};
