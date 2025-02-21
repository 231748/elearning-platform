const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correct_answer: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Quiz', QuizSchema);
