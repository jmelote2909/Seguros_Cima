# GUÍA DE USO - SISTEMA DE GESTIÓN DE SEGUROS CIMA

Bienvenido al Sistema de Gestión de Seguros CIMA. Esta guía te ayudará a dar tus primeros pasos en la aplicación.

## Requisitos Previos

Para que la aplicación funcione correctamente, es necesario tener un servidor MySQL activo(En mi caso uso XAMPP):
- **XAMPP**: Es la opción más sencilla. Asegúrate de iniciar el módulo **MySQL** desde el Panel de Control de XAMPP.
- **Base de Datos**: No necesitas crearla a mano. El sistema la creará automáticamente (llamada `CIMA_seguros`) siempre que MySQL esté encendido en el puerto 3306.

Para que la aplicación funcione correctamente, es necesario tener instalado lo siguiente:

- **Java**: Se recomienda usar la versión **17**.
- **MAVEN**: Se recomienda usar la versión **3.8** o superior.
- **ANGULAR**: El proyecto utiliza la versión **21.2.0**.
- **Node.js**: Se recomienda usar la versión **20 o 22 (LTS)**.
- **npm**: El proyecto utiliza la versión **11.9.0**.
- **MySQL**: Asegúrate de tener un servidor MySQL activo (por ejemplo, mediante XAMPP).
    - **Base de Datos**: El sistema la creará automáticamente (`CIMA_seguros`) en el puerto 3306.

---

## Instalación y Configuración

1. **Instalar dependencias del Frontend**:
   Dirígete a la carpeta `frontend` y ejecuta:
   
   >cd frontend
   >npm install
   >cd ..
   

2. **Ejecutar el proyecto**:
   Ejecuta el archivo por lotes en la raíz:
   >run_proyect.bat

---

## Inicio Rápido

Para empezar a usar la aplicación, puedes iniciar sesión con la cuenta de administrador que se crea automáticamente al arrancar el proyecto por primera vez.

**Credenciales de Administrador por defecto:**
- **Usuario:** admin
- **Contraseña:** 1234

---

## Funcionalidades Principales

### 1. Panel de Control (Listado de Seguros)
- **Visualización**: Verás una tabla con todos los seguros registrados.
- **Búsqueda/Filtro**: Puedes ver el coste total acumulado en el pie de la tabla.
- **Descargar Listado**: Haz clic en "DESCARGAR LISTADO" para obtener un archivo CSV con todos los datos.

### 2. Gestión de Seguros (Solo Administradores)
- **Añadir Seguro**: Usa el botón "+ AÑADIR SEGURO". Podrás subir un archivo PDF y completar los detalles.
- **Modificar**: Haz clic en el icono del lápiz (✏️) en la lista.
- **Eliminar**: Haz clic en el icono de la papelera (🗑️).

### 3. Visualización de Detalles
- Haz clic en cualquier fila para abrir la **Ficha Técnica**.
- Permite ver el desglose de costes y descargar el PDF original ("DESCARGAR SEGURO").

### 4. API & Swagger (Solo Desarrolladores)
- La documentación interactiva de la API está disponible en: 
  `http://localhost:8080/swagger-ui/index.html` (con el backend en ejecución).

---

## Roles de Usuario

- **ADMIN**: Acceso total para añadir, editar, borrar y descargar.
- **CLIENTE**: Puede registrarse, ver el listado y descargar PDFs, pero no puede modificarlos.

---
