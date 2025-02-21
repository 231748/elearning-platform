const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user with duplicate email check
router.post('/', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = new User({ name, email, password, role });
        await user.save();
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            enrolled_courses: user.enrolled_courses,
            progress: user.progress
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users (hide password)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a user by ID (hide password)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
