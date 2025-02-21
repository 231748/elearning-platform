# E-learning Platform Backend

## Overview
This project is a backend application for an E-learning Platform, built using Node.js, Express, and MongoDB. The system demonstrates advanced data modeling with MongoDB’s flexible schema, secure CRUD operations for managing users, courses, lessons, and quizzes, and JWT-based authentication to protect sensitive endpoints.

## Table of Contents
- Aim and Goals
- Relevance
- Features
- System Architecture
- Installation and Setup
- API Endpoints
- Data Collection via Seeding
- Usage
- Future Improvements
- License

## Aim and Goals
Aim: Develop a scalable and secure backend for an E-learning system.  
Goals:  
• Implement comprehensive CRUD operations for managing users, courses, lessons, and quizzes.  
• Secure API endpoints using JWT-based authentication.  
• Demonstrate advanced data modeling with nested documents in MongoDB.  
• Provide a solid foundation for future integration with a frontend interface.

## Relevance
The project addresses current needs in digital education:
• Scalability: MongoDB’s NoSQL approach allows for flexible data schema evolution.  
• Security: JWT authentication protects critical API endpoints.  
• Efficient Data Management: Advanced CRUD operations and robust data modeling ensure smooth data handling.  
• Practical Application: Serves as a backend framework that can be integrated into larger E-learning solutions.

## Features
• User Management: Create, read, update, and delete user profiles with secure password storage.  
• Course Management: Manage courses, including course creation, updates, and deletion.  
• Lesson and Quiz Handling: Organize lessons and associated quizzes within courses.  
• Authentication: Secure endpoints using JWT, with password encryption using bcrypt.  
• Data Seeding: A seed script populates the database with sample data for testing and demonstration.

## System Architecture
• Backend: Built with Node.js and Express.  
• Database: MongoDB with Mongoose as the ODM.  
• Security: JWT-based authentication and bcrypt for password hashing.  
• Data Modeling: Uses multiple collections with nested documents to represent relationships between users, courses, lessons, and quizzes.

## Database Schema

The database schema defines how data is organized and structured in your application. For this project, the schema includes several collections with specific fields and relationships. Below is a summary of what your schema documentation should cover:

### Collections and Their Key Fields

- **Users**
  - **Fields:** _id, name, email, password (hashed), role, enrolled_courses (array of Course references), progress (array of embedded documents tracking course progress and quiz scores).
  - **Relationships:** Users can enroll in multiple courses; progress data links users to course activities.

- **Courses**
  - **Fields:** _id, title, description, instructor_id (reference to a User), lessons (array of Lesson references), students_enrolled (array of User references).
  - **Relationships:** Each course is created by an instructor and includes multiple lessons.

- **Lessons**
  - **Fields:** _id, course_id (reference to a Course), title, content, resources (array of URLs), quiz_id (reference to a Quiz).
  - **Relationships:** Lessons belong to courses; a lesson can optionally include a quiz.

- **Quizzes**
  - **Fields:** _id, lesson_id (reference to a Lesson), questions (an array where each question includes the text, options, and the correct answer).
  - **Relationships:** Each quiz is associated with a lesson.

### Relationships and Data Modeling Techniques

- **Nested Documents:**  
  Some fields, such as the progress information within Users, use nested documents to store multiple related data points (e.g., course progress and quiz scores).

- **References:**  
  Collections reference each other using unique identifiers (for example, a Course document references its instructor by storing the User's _id).

### Visual Representation

- **Entity-Relationship Diagram (ERD):**  
  Consider creating an ERD to visually represent the collections, their fields, and how they relate to one another. This diagram can be included as an image in your documentation.

### Purpose of the Schema Documentation

- **Clarity:** It provides a clear overview of how data is structured within your application.
- **Maintenance:** A well-documented schema makes it easier to maintain and extend the database as the project grows.
- **Communication:** It helps reviewers, such as your instructor or team members, understand the relationships and structure of your data.

This comprehensive schema documentation should be included in your technical documentation to support the setup instructions and explain your data modeling decisions.

## Installation and Setup
1. Clone the repository from GitHub.  
2. Install dependencies using the package manager.  
```npm install```
3. Create an environment file with the following variables: MONGO_URI, JWT_SECRET, and PORT.
```MONGO_URI=your_mongo_connection_string```
```JWT_SECRET=your_jwt_secret```
```PORT=5050```
5. Run the server using a tool like nodemon.
```nodemon server.js```
7. (Optional) Execute the seed script to populate the database with sample data. ```node seed.js```

## API Endpoints
User Endpoints:
• POST: Create a new user. ```{"name": "Alice Doe", "email": "alice@example.com", "password": "securepassword", "role": "student"}```
• GET: Retrieve all users (with sensitive information excluded).  
• GET by ID: Retrieve a user by ID.  
• PUT: Update a user.  
• DELETE: Delete a user.

Authentication Endpoint:
• POST: Authenticate a user and return a JWT. ```{ "email": "alice@example.com", "password": "securepassword" }```

Course Endpoints:
• POST: Create a new course (protected, requires JWT).  
• GET: Retrieve all courses.  
• GET by ID: Retrieve a course by ID.  
• PUT: Update a course (protected).  
• DELETE: Delete a course (protected).

Similar endpoints are provided for lessons and quizzes.

## Data Collection via Seeding
In the absence of an external data source, a seed script was implemented to simulate data collection. This script automatically populates the database with sample courses and lessons, which is useful for testing and demonstration purposes.

## Usage
• Testing the API: Use tools such as Postman or cURL to interact with the API endpoints.  
• Authentication: Secure routes require a valid JWT in the Authorization header (formatted as "Bearer <token>").

## Future Improvements
• Integrate a frontend interface for a complete user experience.  
• Enhance security with role-based access control.  
• Expand analytics to monitor user engagement and course performance.  
• Improve error handling and logging for better maintainability.

## License
This project is licensed under the MIT License.
