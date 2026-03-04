# GUÍA DE USO - SISTEMA DE GESTIÓN DE SEGUROS CIMA

Bienvenido al Sistema de Gestión de Seguros CIMA. Esta guía te ayudará a dar tus primeros pasos en la aplicación.

## Requisitos Previos

Para que la aplicación funcione correctamente, es necesario tener un servidor MySQL activo(En mi caso uso XAMPP):
- **XAMPP**: Es la opción más sencilla. Asegúrate de iniciar el módulo **MySQL** desde el Panel de Control de XAMPP.
- **Base de Datos**: No necesitas crearla a mano. El sistema la creará automáticamente (llamada `CIMA_seguros`) siempre que MySQL esté encendido en el puerto 3306.

## Inicio Rápido

Para empezar a usar la aplicación, puedes iniciar sesión con la cuenta de administrador que se crea automáticamente al arrancar el proyecto por primera vez.

**Credenciales de Administrador por defecto:**
- **Usuario:** admin
- **Contraseña:** 1234

## Funcionalidades Principales

### 1. Panel de Control (Listado de Seguros)
- **Visualización**: Verás una tabla con todos los seguros registrados.
- **Búsqueda/Filtro**: Puedes ver el coste total acumulado en el pie de la tabla.
- **Descargar Listado**: Haz clic en "DESCARGAR LISTADO" para obtener un archivo Excel (CSV) con todos tus datos.

### 2. Gestión de Seguros (Solo Administradores)
- **Añadir Seguro**: Usa el botón "+ AÑADIR SEGURO" en el menú superior. Podrás subir un archivo PDF y completar los detalles técnicos.
- **Modificar**: Haz clic en el icono del lápiz (✏️) en la lista para actualizar los datos de un seguro existente.
- **Eliminar**: Haz clic en el icono de la papelera (🗑️) para borrar un seguro. Se te pedirá confirmación.

### 3. Visualización de Detalles
- Haz clic en cualquier fila de la tabla para abrir la **Ficha Técnica** del seguro.
- Desde la ficha, podrás ver el desglose de costes (diario, mensual, anual) y descargar el PDF original pulsando "DESCARGAR SEGURO".

## Roles de Usuario

- **ADMIN**: Tiene acceso total para añadir, editar, borrar y descargar seguros.
- **CLIENTE**: Puede registrarse por su cuenta, ver el listado de seguros, ver los detalles y descargar los PDFs, pero NO puede modificarlos ni borrarlos.

---
