# Portfolio Backend

Backend para la aplicación de portfolio desarrollada con Spring Boot.

## Tecnologías utilizadas

- Java 17
- Spring Boot 3.2.3
- PostgreSQL
- Maven

## Configuración local

1. Clonar el repositorio
2. Configurar la base de datos PostgreSQL
3. Configurar las variables de entorno en `application.properties`
4. Ejecutar `./mvnw spring-boot:run`

## Variables de entorno

- `DATABASE_URL`: URL de la base de datos
- `DATABASE_USERNAME`: Usuario de la base de datos
- `DATABASE_PASSWORD`: Contraseña de la base de datos
- `ADMIN_USERNAME`: Usuario administrador
- `ADMIN_PASSWORD`: Contraseña administrador

## Despliegue

La aplicación está configurada para desplegarse en Render. 