# Portfolio Backend

API REST desarrollada con Spring Boot que gestiona la información del portfolio personal. Implementa autenticación JWT, manejo de roles, y endpoints seguros para la gestión de datos personales, educación, experiencia y proyectos.

## Tecnologías Utilizadas

- Java 17
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- PostgreSQL
- JPA/Hibernate
- Maven
- Docker

## Características

- Autenticación y autorización con JWT
- CRUD completo para entidades principales
- Manejo de roles y permisos
- Documentación con Swagger/OpenAPI
- Tests unitarios y de integración
- Configuración para desarrollo y producción
- Dockerización

## Requisitos

- Java 17 o superior
- Maven
- PostgreSQL
- Docker (opcional)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/gabrielfigueroa/portfolio-backend.git
```

2. Configurar la base de datos:
- Crear una base de datos PostgreSQL
- Configurar las credenciales en `application.properties`

3. Ejecutar la aplicación:
```bash
./mvnw spring-boot:run
```

## Documentación API

La documentación de la API está disponible en:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI: `http://localhost:8080/v3/api-docs`

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── portfolio/
│   │           ├── config/
│   │           ├── controller/
│   │           ├── model/
│   │           ├── repository/
│   │           ├── service/
│   │           └── security/
│   └── resources/
│       └── application.properties
└── test/
    └── java/
        └── com/
            └── portfolio/
                └── tests/
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Gabriel Figueroa - [LinkedIn](https://www.linkedin.com/in/gabriel-figueroa-068b77322/) 