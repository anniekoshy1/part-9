const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose
  .connect('mongodb+srv://XDZKLiHnK4GOFblC:W4dYxNJsdhyqDjFm@cluster0.s0qvw.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
// Define Item Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});
const Item = mongoose.model('Item', itemSchema);
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
// Serve uploaded images
app.use('/uploads', express.static('uploads'));
// Routes
// Create (POST)
app.post('/items', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const newItem = new Item({
      name,
      brand,
      price: parseFloat(price),
      image: req.file.filename,
    });
    await newItem.save();
    res.status(201).json({ success: true, newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Update (PUT)
app.put('/items/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price } = req.body;
    const updateData = { name, brand, price: parseFloat(price) };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, updatedItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Delete (DELETE)
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));