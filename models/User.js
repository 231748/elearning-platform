const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    progress: [
        {
            course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            completed_lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
            quiz_scores: [{ quiz_id: mongoose.Schema.Types.ObjectId, score: Number }]
        }
    ]
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
