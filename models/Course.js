const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    students_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Course', CourseSchema);
