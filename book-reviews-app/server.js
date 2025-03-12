require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves static files from public folder

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Book Schema & Model
const bookSchema = new mongoose.Schema({ title: String });
const Book = mongoose.model('Book', bookSchema);

// Serve index.html on the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: Add Book
app.post('/api/add_book', async (req, res) => {
    try {
        const newBook = new Book({ title: req.body.title });
        await newBook.save();
        res.json({ message: 'Book added successfully!', book: newBook });
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
});

// API: Get All Books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
