# Documentación Técnica del Sistema de Gestión Académica

Este documento detalla de manera estructurada cómo fue construido el proyecto, qué tecnologías y librerías se utilizaron, y el razonamiento detrás de cada elección técnica, abarcando desde la capa visual hasta el modelo de datos en la nube.

---

## 1. Arquitectura Base y Lenguajes

### React + Vite 
El sistema es una **Single Page Application (SPA)** impulsada por **React**.
* **Por qué se usó:** React permite trabajar de manera declarativa basándose en componentes reutilizables, lo cual es ideal para un panel de gestión educativa (Dashboard, Listas, y Formularios de Planillas repetitivos).
* **Vite como Construidor:** En lugar de herramientas antiguas como Create React App, se utilizó **Vite**. Vite optimiza enormemente el tiempo de compilación y servidor de desarrollo mediante el uso de "Esbuild", lo que resulta en tiempos de espera casi nulos para previsualizar cambios.

### TypeScript
El proyecto está escrito íntegramente en **TypeScript**.
* **Por qué se usó:** Al ser un entorno educativo con muchos tipos de usuarios, roles, notas y relaciones (ej. `TeacherAssignment`, `Student`, `Course`), TypeScript proporciona seguridad de tipos estática en toda la base de código. Esto minimiza errores durante el desarrollo y asegura que los objetos transferidos al backend (Firebase) tengan las propiedades correctas antes de enviarse.

---

## 2. Interfaz de Usuario y Estilos

### Tailwind CSS
* **Por qué se usó:** Tailwind es un framework CSS orientado a utilidades (*Utility-first*). Permite diseñar directamente en los componentes (archivos `.tsx`) sin tener que crear hojas de estilo separadas. Reduce grandemente el tamaño de la compilación CSS y soluciona problemas comunes como la colisión de nombres de clases.

### Shadcn / UI
* **Qué es:** No es una biblioteca de componentes "instalable" (como Bootstrap o Material UI), sino un sistema de componentes accesibles y personalizables de código abierto que se copian y empaquetan dentro de la subcarpeta `src/components/ui`.
* **Por qué se usó:**
    1. **Personalización Absoluta:** Como el código del componente vive en el proyecto (no encapsulado en `node_modules`), se puede modificar cualquier comportamiento interno si se requiere, a diferencia de librerías estrictas.
    2. **Basado en Radix UI:** Posee primitivas accesibles bajo el capó (WAI-ARIA compliance) como diálogos modal, selectores, y menús. 
    3. **Diseño Moderno:** Entrega una apariencia visual limpia, profesional, moderna y coherente para aplicaciones de escritorio (paneles B2B/B2C).

### Lucide React (Íconos)
* **Por qué se usó:** Se utilizó para la iconografía del sistema. Es sumamente ligero, flexible y se integra con consistencia a la estética neutral empleada por Shadcn y Tailwind.

---

## 3. Gestión de Estado y Datos

### Zustand
La aplicación delega el manejo del estado global (cuentas, usuario actual, cursos y planillas) a **Zustand**.
* **Por qué se usó (frente a Redux u otros):** Zustand es minimalista. No requiere envolver la aplicación en `Providers` complejos ni escribir *reducers/actions* aparatosos. Permite tener *stores* separados modularizados (ej: `planillas-store.ts`, `accounts-store.ts`, `courses-store.ts`, `store.ts` para Sesión). Maneja tanto estado síncrono como asíncrono (llamadas a Firebase) de forma fluida y sin dependencias extrañas.

### Firebase Backend (Firestore & Auth)
El Backend as a Service (BaaS) seleccionado es **Google Firebase**. 
Específicamente el producto Cloud Firestore:
* **Por qué se usó:** Firestore es una base de datos NoSQL de documentos orientada al tiempo real, ideal para prototipado rápido y aplicaciones reactivas front-end. Su formato y consulta basada en documentos anidados y colecciones independientes (`users`, `courses`, `planillas`) es excelente para almacenar relaciones como las notas de múltiples alumnos.
* **Sin backend tradicional requerido:** Vite/React hace consultas directas al SDK de Firebase (como se refleja en los stores), permitiendo no tener que mantener ni desplegar un servidor en NodeJS/Express particular.
* **Autenticación Delegada Simplificada:** El sistema hace uso del CI (Cédula de Identidad Paragua) definido en Firestore como la contraseña del usuario `(account.ci === password)`. Aunque es validado del lado cliente, toda la logística base asume la cuenta oficial contenida centralmente en el ambiente Firebase.

---

## 4. Enrutamiento (Routing)

### React Router DOM (v6)
* **Por qué se usó:** Define todas las rutas del sistema SPA (`/admin`, `/docente/planillas`, etc.) protegiendo y segregando inteligentemente las vistas dependiendo de los roles del usuario. Esto permite navegar por el sistema y cambiar interfaces sin hacer recargas completas de la página en el navegador.

---

## 5. Arquitectura de Datos y Modelo de Entidad-Relación

El sistema utiliza una arquitectura NoSQL basada en colecciones y documentos, optimizada para lecturas rápidas de reportes y planillas. 

Para una visión técnica profunda, diagramas detallados de las relaciones y especificaciones de campos, consulte el documento:
👉 **[MODELO_DATOS.md](file:///c:/Users/Giovanni%20Portillo/Documents/GitHub/Programa-academico/MODELO_DATOS.md)**

---
*Este registro sirve como marco de referencia para entender a profundidad qué conforma el sistema bajo el capó a fin de extenderlo y darle mantenimiento futuro continuo sin perder lineamiento de arquitectura.*
