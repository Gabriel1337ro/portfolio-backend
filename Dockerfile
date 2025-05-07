FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/gabb1337dev-0.0.1-SNAPSHOT.jar ./app.jar

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod
ENV PORT=10000
ENV DATABASE_URL="jdbc:postgresql://dpg-cp8f1v6ct0pc738v8qvg-a.oregon-postgres.render.com:5432/portfolio"
ENV DATABASE_USERNAME="postgres"
ENV DATABASE_PASSWORD="gabb1337"

EXPOSE 10000
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"] 