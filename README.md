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
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
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

### Notas

- El workflow detecta automáticamente el nombre de tu repositorio y configura el base path correctamente
- Si tu repositorio se llama `[usuario].github.io`, la aplicación se desplegará en la raíz
- Asegúrate de que el secreto `GEMINI_API_KEY` esté configurado correctamente para que la aplicación funcione
