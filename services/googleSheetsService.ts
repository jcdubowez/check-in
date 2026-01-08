export interface GoogleSheetsReview {
  email: string;
  completion: number;
  bugs: number;
  satisfaction: number;
  comments?: string;
  timestamp: string;
  monthId: string;
  monthName: string;
}

// La variable de entorno se inyecta en tiempo de build por Vite
// @ts-ignore - Vite inyecta estas variables en tiempo de build
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Verifica si ya existe una respuesta para un email y monthId en Google Sheets
 */
export const checkIfResponseExists = async (email: string, monthId: string): Promise<boolean> => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('⚠️ Google Script URL not configured. Usando solo localStorage.');
      return false;
    }

    console.log('🔍 Verificando en Google Sheets:', { email, monthId });

    // Usar POST porque GET no está recibiendo los parámetros correctamente en Google Apps Script
    // Intentar POST sin no-cors para poder leer la respuesta
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check',
          email: email,
          monthId: monthId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📥 Respuesta de Google Sheets (POST):', result);
      
      if (result.success === false) {
        console.warn('⚠️ Google Sheets reportó error:', result.error);
        return false;
      }
      
      // Si tiene exists, usarlo
      if (typeof result.exists === 'boolean') {
        return result.exists;
      }
      
      return false;
    } catch (postError) {
      // Si POST falla por CORS, intentar GET como fallback
      console.log('⚠️ POST falló, intentando GET como fallback...');
      const getUrl = new URL(GOOGLE_SCRIPT_URL);
      getUrl.searchParams.set('action', 'check');
      getUrl.searchParams.set('email', email);
      getUrl.searchParams.set('monthId', monthId);
      
      const getResponse = await fetch(getUrl.toString(), {
        method: 'GET',
      });

      if (getResponse.ok) {
        const getResult = await getResponse.json();
        console.log('📥 Respuesta de Google Sheets (GET fallback):', getResult);
        
        if (typeof getResult.exists === 'boolean') {
          return getResult.exists;
        }
      }
      
      throw postError;
    }
  } catch (error) {
    console.warn('⚠️ Error verificando en Google Sheets, usando localStorage:', error);
    return false;
  }
};

export const saveToGoogleSheets = async (review: GoogleSheetsReview): Promise<boolean> => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('⚠️ Google Script URL not configured. Los datos solo se guardarán en localStorage.');
      console.warn('   Configura VITE_GOOGLE_SCRIPT_URL en GitHub Secrets o .env.local');
      return false;
    }

    console.log('📤 Enviando datos a Google Sheets...', {
      email: review.email,
      url: GOOGLE_SCRIPT_URL.substring(0, 50) + '...'
    });

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script no devuelve CORS headers
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'append',
        data: {
          email: review.email,
          completion: review.completion,
          bugs: review.bugs,
          satisfaction: review.satisfaction,
          comments: review.comments || '',
          timestamp: review.timestamp,
          monthId: review.monthId,
          monthName: review.monthName,
        },
      }),
    });

    // Con no-cors no podemos verificar la respuesta, pero asumimos éxito
    console.log('✅ Datos enviados a Google Sheets (modo no-cors)');
    return true;
  } catch (error) {
    console.error('❌ Error saving to Google Sheets:', error);
    return false;
  }
};

