
# Sistema de Gestión de Pacientes CCSS

## Descripción
Proyecto académico para la gestión de pacientes y consultas
médicas utilizando una base de datos NoSQL con MongoDB.

## Tecnologías
- MongoDB
- Node.js
- Express
- Mongoose
- HTML, CSS y JavaScript

## Funcionalidades
- Registro de pacientes
- Consulta de pacientes
- Actualización de información
- Eliminación de registros
- Gestión de consultas médicas
- Vistas de MongoDB
- Funciones de consulta
- Cursores
- Lógica de gestión mediante servicios Node.js

## Base de datos
Nombre: gestion_pacientes_ccss

El diseño contempla nueve colecciones:
- pacientes
- consultas
- centros_salud
- personal_medico
- resultados_laboratorio
- imagenes_medicas
- cirugias
- usuarios
- auditoria_accesos

## Instalación
1. Instalar Node.js y MongoDB.
2. Descargar el repositorio.
3. Ejecutar npm install.
4. Crear un archivo .env con:
   MONGO_URI=mongodb://127.0.0.1:27017/gestion_pacientes_ccss
   PORT=3000
5. Ejecutar node app.js.
6. Abrir http://localhost:3000.

## Archivos de MongoDB
En la carpeta database se encuentran los scripts
de vistas, funciones y cursores.

Los scripts .mongodb.js están preparados para
ejecutarse en Mongosh.

## Nota
Este proyecto utiliza datos ficticios y tiene
fines exclusivamente académicos.
Las funciones de servicio de Node.js no son
procedimientos almacenados de PL/SQL.
