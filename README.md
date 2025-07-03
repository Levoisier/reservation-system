# ✅ Sistema de Reservas

Este proyecto es una interfaz *Frontend* utilizada para realizar reservas en un restaurante.  
Cuenta con dos vistas: una para clientes y otra para el personal.  
Permite al cliente visualizar una interfaz atractiva para hacer reservas.  
Por otro lado, permite al personal llevar el control de las mesas reservadas y disponibles.

## 🔧 Tecnologías Utilizadas

- React
- Tailwind CSS
- Framer Motion 
- Fetch API (con datos JSON simulados)

## ⚙️ Cómo ejecutar el proyecto

1. Instalar Node.js (si aún no lo tienes):
   - Ve a http://nodejs.org  
   - Descarga e instala la versión LTS (recomendada)  
   - Verifica la instalación abriendo una terminal y escribiendo: `node --version`

2. Instalar Visual Studio Code (si aún no lo tienes):
   - Ve a https://code.visualstudio.com  
   - Descárgalo e instálalo según tu sistema operativo

3. Instalar dependencias:
   - Abre la terminal en VSCode (Terminal → Nueva Terminal)  
   - Ejecuta: `npm install`  
   - Espera a que se instalen todas las dependencias

4. Iniciar el servidor de desarrollo:
   - En la terminal, ejecuta: `npm run dev`  
   - Se mostrará una URL local (normalmente http://localhost:5173)  
   - Haz clic en la URL o cópiala en tu navegador

## 🧠 Diseño

- Se utiliza SVG para la disposición de las mesas  
- Se usa Framer Motion para animaciones modernas  
- La API está simulada con JSON estático, pero la app está lista para conectarse a una API real

## 🔄 Comunicación con el Backend

- Uso de `fetch()` para simular llamadas a la API como `/tables` y `/reservations`  
- Muestra estados de carga, éxito y error  
- Se puede cambiar fácilmente a una API real modificando la URL

## 📁 Estructura del proyecto

- 📁 **src/**  
  Carpeta principal del código fuente donde viven los componentes de React y la lógica de la app.  
  Aquí se construye la interfaz y el comportamiento de la aplicación.

  | Carpeta/Archivo | Descripción |
  |-----------------|-------------|
  | **`components/`** | Contiene componentes reutilizables de UI |
  | └── `ReservationForm.jsx` | Formulario principal donde los clientes seleccionan fecha, número de personas, mesa y confirman la reserva. Incluye  animaciones y validación.
  | └── `WaiterDashboard.jsx` | Componente de panel para gestionar o visualizar las reservas |
  | **`App.jsx`** | Componente raíz donde se define la estructura de la app. Normalmente envuelve a todos los demás componentes |
  | **`main.jsx`** | Punto de entrada de la app de React. Renderiza `<App />` en el DOM e inicializa la aplicación |
  | **`index.css`** | Estilos globales de la aplicación. Incluye directivas de Tailwind CSS |

- 📁 **node_modules/**  
  Se crea automáticamente al ejecutar `npm install`.  
  Contiene todas las bibliotecas y dependencias externas.

- 📄 **.gitignore**  
  Especifica qué archivos o carpetas debe ignorar Git.  
  Evita rastrear archivos sensibles o innecesarios (como node_modules, .env, etc.)

- ⚙️ **Archivos de Configuración**  
  - `package.json`: Lista las dependencias del proyecto y los scripts. Define la metadata y cómo ejecutar/compilar la app.  
  - `package-lock.json`: Archivo autogenerado que bloquea versiones exactas de paquetes instalados.  
  - `vite.config.ts` o `vite.config.js`: Archivo de configuración de Vite. Controla cómo funciona el servidor de desarrollo y cómo se construye la app.  
  - `tailwind.config.js`: Personaliza la configuración de Tailwind (colores, fuentes, *breakpoints*, etc.)  
  - `postcss.config.js`: Configuración de PostCSS, usado internamente por Tailwind.  
  - `eslint.config.js`: Configuración para ESLint, herramienta que ayuda a detectar errores de código en JavaScript/React.


`ENGLISH`

# ✅ Reservation System 

    This project is a Frontend interface used to make reservations at a restaurant.
    It has two views, for customers and staff. Allows to the client to visualize a 
    beautiful interface to make reservations. In the other hand, allows the staff
    to keep track of reserved and free tables.

## 🔧 Tech Stack

    - React.
    - Tailwind CSS.
    - Framer Motion.
    - Fetch API (with mock JSON data).

## ⚙️ How to Run

    1. Install Node.js (if you haven't already):
        - Go to http://nodejs.org.
        - Download and install the LTS version (recommended).
        - Verify installation by opening terminal/command prompt and typing: node --version.
    2. Install Visual Studio Code (if you haven't already): 
        - Go to code.visualstudio.com.
        - Download and install for your operating system.
    3. Install dependencies:
        - Open the terminal in VSCode (Terminal → New Terminal).
        - Run: `npm install`.
        - Wait for all dependencies to install.
    4. Start the development server:
        - In the terminal, run: `npm run dev`.
        - The terminal will show a local URL (usually http://localhost:5173).
        - Click on the URL or copy it to your browser.

## 🧠 Design Decisions

    - SVG used for table layout.
    - Framer Motion for modern animations.
    - API simulated with static JSON but app is API-ready.

## 🔄 Backend Communication

    - Using `fetch()` to simulate API calls like `/tables` and `/reservations`
    - Shows loading, success, and error states
    - Easily switch to real API by changing the URL

## 📁 Project Structure Overview

    - 📁 src/
        The main source folder where your React components and app logic live.
        This is where you'll build the actual interface and behavior.
                
        Description 

    | **`components/`**               | Contains reusable UI components.
           └── `ReservationForm.jsx`  | Main form where customers select a date, guests, table, and confirm their reservation. Includes animations and validation.                   
           └── `WaiterDashboard.jsx`  | Dashboard component (likely for staff) to manage or view reservations.
    
     **`App.jsx`**     | Root component where the app structure is defined. This typically wraps everything else.                                                    |
        **`main.jsx`**    | Entry point of the React app. Renders `<App />` into the DOM and initializes the app.                                                       |
     **`index.css`**   | Global styles for the app. Tailwind directives.

    - 📁 node_modules/
        Automatically created when you run `npm install`.
        Contains all third-party libraries and dependencies.
    - 📄 .gitignore
        Specifies which files/folders Git should ignore.
        Prevents tracking of sensitive or unnecessary files (like node_modules, .env, etc.).
    - ⚙️ Configuration Files
        package.json:	Lists the project's dependencies and scripts. It defines the app's metadata and how to run/build it.
        package-lock.json:	Auto-generated to lock the exact versions of installed packages for consistency.
        vite.config.ts or vite.config.js:	Vite’s configuration file. Controls how the dev server works and how your app is built.
        tailwind.config.js:	Customizes your Tailwind setup (colors, fonts, breakpoints, etc).
        postcss.config.js:	Config for PostCSS, which Tailwind uses internally.
        eslint.config.js:	Configuration for ESLint, a tool to catch JavaScript/React coding issues early.
    