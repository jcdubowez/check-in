<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ALfhir4s5XdHNa0y_xGADxs2eInMALpK

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Crea un archivo `.env.local` con las siguientes variables:
   ```
   GEMINI_API_KEY=tu_clave_de_gemini
   VITE_GOOGLE_SCRIPT_URL=url_de_tu_google_apps_script
   ```
3. Run the app:
   `npm run dev`

## Desplegar en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración inicial

1. **Habilita GitHub Pages en tu repositorio:**
   - Ve a Settings → Pages en tu repositorio de GitHub
   - En "Source", selecciona "GitHub Actions"

2. **Configura el secreto de la API:**
   - Ve a Settings → Secrets and variables → Actions
   - Crea un nuevo secreto llamado `GEMINI_API_KEY`
   - Agrega tu clave de API de Gemini como valor

3. **Haz push de tus cambios:**
   - El workflow se ejecutará automáticamente cuando hagas push a la rama `main` o `master`
   - También puedes ejecutarlo manualmente desde la pestaña "Actions"

### URL de despliegue

Una vez desplegado, tu aplicación estará disponible en:
- `https://[tu-usuario].github.io/[nombre-del-repositorio]/`

### Probar localmente con el base path de GitHub Pages

Para probar cómo se verá la aplicación en GitHub Pages localmente:

```bash
npm run preview:gh-pages
```

Esto construirá la aplicación con el base path `/check-in/` y la servirá localmente para que puedas verificar que todo funciona correctamente.

### Solución de problemas

Si la aplicación no se ve en GitHub Pages:

1. **Verifica que GitHub Pages esté habilitado:**
   - Ve a Settings → Pages
   - Asegúrate de que "Source" esté configurado como "GitHub Actions"

2. **Verifica el workflow:**
   - Ve a la pestaña "Actions" en tu repositorio
   - Revisa que el último workflow se haya completado exitosamente
   - Si hay errores, revisa los logs del workflow

3. **Verifica el secreto GEMINI_API_KEY:**
   - Ve a Settings → Secrets and variables → Actions
   - Asegúrate de que `GEMINI_API_KEY` esté configurado
   - Si falta, la aplicación puede no funcionar correctamente

4. **Verifica la consola del navegador:**
   - Abre las herramientas de desarrollador (F12)
   - Revisa la pestaña "Console" para ver errores de JavaScript
   - Revisa la pestaña "Network" para ver si hay recursos que no se cargan (404)

5. **Limpia la caché:**
   - A veces GitHub Pages puede servir una versión en caché
   - Intenta hacer un hard refresh (Ctrl+Shift+R o Cmd+Shift+R)
   - O espera unos minutos y vuelve a intentar

## Integración con Google Sheets

Las respuestas del check-in se guardan automáticamente en Google Sheets.

### Configuración de Google Sheets

1. **Abre tu Google Sheet:**
   - Ve a: https://docs.google.com/spreadsheets/d/1Kxu7-T_ArqZ5dqV3Xw8D8Bo4tZsmTtBZggDWey-hUsA/edit

2. **Crea el Google Apps Script:**
   - En tu Google Sheet, ve a **Extensiones** → **Apps Script**
   - Copia el contenido del archivo `google-apps-script.js` de este repositorio
   - Pega el código en el editor de Apps Script
   - Guarda el proyecto (Ctrl+S o Cmd+S)

3. **Despliega el script:**
   - Haz clic en **Desplegar** → **Nueva implementación**
   - Selecciona tipo **Aplicación web**
   - Configura:
     - **Ejecutar como:** Yo (tu cuenta)
     - **Quién tiene acceso:** Cualquiera
   - Haz clic en **Desplegar**
   - **Copia la URL de la aplicación web** (algo como: `https://script.google.com/macros/s/...`)

4. **Configura la URL en GitHub:**
   - Ve a Settings → Secrets and variables → Actions
   - Crea un nuevo secreto llamado `VITE_GOOGLE_SCRIPT_URL`
   - Pega la URL de tu Google Apps Script
   - También agrega esta variable en tu `.env.local` para desarrollo local

### Estructura de datos en Google Sheets

Los datos se guardan con las siguientes columnas:
- Email
- Completitud (%)
- Bugs
- Satisfacción
- Comentarios
- Timestamp
- Month ID
- Month Name

### Notas

- El workflow detecta automáticamente el nombre de tu repositorio y configura el base path correctamente
- Si tu repositorio se llama `[usuario].github.io`, la aplicación se desplegará en la raíz
- Asegúrate de que los secretos `GEMINI_API_KEY` y `VITE_GOOGLE_SCRIPT_URL` estén configurados correctamente
- El archivo `404.html` se crea automáticamente para que las rutas de React funcionen correctamente en GitHub Pages
- Los datos también se guardan en localStorage como respaldo
