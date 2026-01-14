# Build Stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first to leverage caching
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Production Stage
FROM eclipse-temurin:21-jre

ARG APP_VERSION
ARG GIT_REVISION

ENV APP_VERSION=$APP_VERSION
ENV GIT_REVISION=$GIT_REVISION
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Add non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Expose port (default 8080 or configurable)
EXPOSE 8080

# Environment variables should be passed at runtime
# CMD using exec syntax for correct signal handling
ENTRYPOINT ["java", "-jar", "app.jar"]
