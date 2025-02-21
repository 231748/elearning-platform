const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new course (protected route)
router.post('/', auth, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor_id', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor_id', 'name email');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a course (protected route)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a course (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
