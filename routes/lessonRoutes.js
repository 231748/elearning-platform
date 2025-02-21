const express = require('express');
const Lesson = require('../models/Lesson');
const router = express.Router();

// Create a new lesson
router.post('/', async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        await lesson.save();
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all lessons
router.get('/', async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('course_id', 'title');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a lesson by ID
router.get('/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('course_id', 'title');
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a lesson
router.put('/:id', async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a lesson
router.delete('/:id', async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
