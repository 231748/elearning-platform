const mongoose = require('mongoose');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      console.log('Connected to MongoDB for seeding');

      // Create a sample course
      const course = new Course({
         title: "Introduction to MongoDB",
         description: "Learn the basics of MongoDB.",
         instructor_id: new mongoose.Types.ObjectId(), // Use 'new' here
         lessons: [],
         students_enrolled: []
      });

      await course.save();

      // Create a sample lesson for the course
      const lesson = new Lesson({
         course_id: course._id,
         title: "What is MongoDB?",
         content: "MongoDB is a NoSQL database that offers flexibility in data modeling...",
         resources: ["http://example.com/video"],
         quiz_id: null
      });

      await lesson.save();

      console.log("Sample course and lesson created.");
      mongoose.disconnect();
  })
  .catch(err => console.error(err));
