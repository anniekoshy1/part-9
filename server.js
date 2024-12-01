const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@cluster0.mongodb.net/gearInventory?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  img_name: { type: String },
  rating: { type: Number },
  features: { type: [String] },
});

const Gear = mongoose.model("Gear", gearSchema);

const itemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  img_name: Joi.string().optional(),
  rating: Joi.number().optional(),
  features: Joi.array().items(Joi.string()).optional(),
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/upload", upload.single("gear"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log("File uploaded successfully:", req.file);
  res.send({ message: "File uploaded successfully!", file: req.file });
});

app.get("/api/gear", async (req, res) => {
  try {
    const items = await Gear.find();
    res.json(items);
  } catch (err) {
    console.error("Error fetching gear items:", err);
    res.status(500).json({ success: false, message: "Failed to fetch gear items" });
  }
});

app.post("/api/gear", async (req, res) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details);
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const newItem = new Gear(req.body);
    await newItem.save();
    console.log("New gear item added:", newItem);
    res.status(201).json({ success: true, newItem });
  } catch (err) {
    console.error("Error saving gear item:", err);
    res.status(500).json({ success: false, message: "Failed to add gear item" });
  }
});

app.put("/api/gear/:id", async (req, res) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details);
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const updatedItem = await Gear.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    console.log("Gear item updated:", updatedItem);
    res.json({ success: true, updatedItem });
  } catch (err) {
    console.error("Error updating gear item:", err);
    res.status(500).json({ success: false, message: "Failed to update gear item" });
  }
});

app.delete("/api/gear/:id", async (req, res) => {
  try {
    const deletedItem = await Gear.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    console.log("Gear item deleted:", deletedItem);
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting gear item:", err);
    res.status(500).json({ success: false, message: "Failed to delete gear item" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
