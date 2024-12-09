# GUIFLIX 🎬

GUIFLIX es una aplicación web que te permite explorar y buscar películas utilizando la API de TMDB (The Movie Database). La aplicación está diseñada para ofrecer una experiencia fluida y amigable en la búsqueda de información cinematográfica.

## Características ✨

- Visualización de películas populares
- Búsqueda de películas por título
- Interfaz responsiva
- Carga progresiva con skeletons
- Diseño moderno y minimalista

## Tecnologías Utilizadas 🛠️

- **React** - ⚛️
- **Vite** - 🚀
- **Tailwind CSS** - 🎨
- **React Loading Skeleton** - 💀🔄
- **Font Awesome** - 🔥
- **TMDB API** - 🎥🎬🎞️🍿

## Instalación 🚀

1. Clona el repositorio

```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias

```bash
npm install
```

3. Instala las dependencias específicas del proyecto

```bash
# Tailwind CSS y sus dependencias
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# React Loading Skeleton
npm install react-loading-skeleton

# Font Awesome
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome
```

4. Configura las variables de entorno:
   - Copia el archivo `.env.example` y renómbralo a `.env`
   ```bash
   cp .env.example .env
   ```
   - Edita el archivo `.env` y configura tus variables
   - Los valores de las variables los puedes obtener en: [TMDB API](https://www.themoviedb.org/settings/api)

5. Inicia el servidor de desarrollo

```bash
npm run dev
```

### Requisitos Previos 📋
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Una cuenta en [TMDB](https://www.themoviedb.org/) para obtener las API keys

---
Desarrollado por [Guillermo Flores](https://github.com/Guillermofr29)
```