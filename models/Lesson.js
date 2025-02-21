const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    resources: [{ type: String }], // URLs for videos, PDFs, etc.
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Lesson', LessonSchema);
