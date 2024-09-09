# Basic CRUD application

## Overview

This is a sample web application designed to manage employee records. It features a frontend built with Vue.js and a
backend developed with Spring Boot. The application allows users to view, add, edit, and delete employee records.

## Project Structure

- **Frontend**: A Vue.js application for the user interface.
- **Backend**: A Spring Boot application that provides the API and handles data persistence.

## Getting Started

Follow these instructions to build and run the application.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for building the frontend)
- [Maven](https://maven.apache.org/) (for building and running the backend)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (for running the backend)

### Frontend Setup

1. Install dependencies:

    ```sh
    npm install --prefix frontend
    ```

2. Build the Vue.js application:

    ```sh
    npm run build --prefix frontend
    ```

   This will generate the production-ready files in the `dist` directory.
3. Copy file into the resources/static folder

   ```sh
   cp -r frontend/dist/* src/main/resources/static
   ```

### Backend Setup

1. Run the Spring Boot application:

    - **Using the JAR file**:
        ```sh
        mvn clean package
        ```

        ```sh
        java -jar target/basic_crud_app-0.0.1-SNAPSHOT.jar
        ```

    - **Using Maven**:

        ```sh
        mvn spring-boot:run
        ```

### Accessing the Application

Once the backend is running, you can access the application in your browser at:

- **Frontend**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)

## Contributing

If you have suggestions or improvements, feel free to open an issue or submit a pull request.
