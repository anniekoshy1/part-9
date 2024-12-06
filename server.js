const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Joi = require('joi');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure the images directory exists
const imagesDir = './public/images';
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// MongoDB Connection
const mongoURI =
  process.env.MONGODB_URI ||
  'mongodb+srv://XDZKLiHnK4GOFblC:W4dYxNJsdhyqDjFm@cluster0.s0qvw.mongodb.net/';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on DB connection failure
  });

// Mongoose Schema and Model
const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  img_name: { type: String },
  rating: { type: Number },
  features: [String],
});
const Gear = mongoose.model('Gear', gearSchema);

// Joi Schema for Validation
const itemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  img_name: Joi.string().optional(),
  rating: Joi.number().optional(),
  features: Joi.array().items(Joi.string()).optional(),
});

// Serve Static HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload Route (Handling file uploads)
app.post('/api/upload', upload.single('gear'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  console.log('File uploaded successfully:', req.file);
  res.json({ success: true, message: 'File uploaded successfully!', file: req.file });
});

// Get all gear items
app.get('/api/gear', async (req, res) => {
  try {
    const items = await Gear.find();
    res.json(items);
  } catch (err) {
    console.error('Error fetching gear items:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch gear items' });
  }
});

// Create a new gear item
app.post('/api/gear', upload.single('gear'), async (req, res) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    console.error('Validation error:', error.details);
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  try {
    const newItem = new Gear({
      ...req.body,
      img_name: req.file ? req.file.filename : null,
    });
    await newItem.save();
    console.log('New gear item added:', newItem);
    res.status(201).json({ success: true, newItem });
  } catch (err) {
    console.error('Error saving gear item:', err);
    res.status(500).json({ success: false, message: 'Failed to add gear item' });
  }
});

// Update an existing gear item by ID
app.put('/api/gear/:id', upload.single('gear'), async (req, res) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    console.error('Validation error:', error.details);
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  try {
    const updatedData = {
      ...req.body,
      ...(req.file && { img_name: req.file.filename }), // Update image if new one uploaded
    };
    const updatedItem = await Gear.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    console.log('Gear item updated:', updatedItem);
    res.json({ success: true, updatedItem });
  } catch (err) {
    console.error('Error updating gear item:', err);
    res.status(500).json({ success: false, message: 'Failed to update gear item' });
  }
});

// Delete a gear item by ID
app.delete('/api/gear/:id', async (req, res) => {
  try {
    const deletedItem = await Gear.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    console.log('Gear item deleted:', deletedItem);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting gear item:', err);
    res.status(500).json({ success: false, message: 'Failed to delete gear item' });
  }
});
console.log('Request body:', req.body);
console.log('Uploaded file:', req.file);


// Listening on the desired port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
