const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/robosoccer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Team schema
const teamSchema = new mongoose.Schema({
    name: String,
    played: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsFor: Number,
    goalsAgainst: Number,
});

// Team model
const Team = mongoose.model('Team', teamSchema);

// Routes
app.get('/api/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/teams', async (req, res) => {
    const team = new Team(req.body);
    try {
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/teams/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/teams/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.use(express.static('/Users/manmathmohanty/Desktop/untitled folder 15')); // Serve static files

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
