const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const items = [
  {
    _id: 1,
    name: "Lululemon Speed Up Short 4\"",
    img_name: "/assets/images/lululemon-shorts.jpg",
    brand: "Lululemon",
    price: "$68",
    rating: 4.9,
    features: [
      "Quick-drying fabric",
      "Breathable mesh liner",
      "Back pocket for essentials"
    ]
  },
  {
    _id: 2,
    name: "Men's Running Shorts",
    img_name: "/assets/images/mens-running-shorts.jpg",
    brand: "Nike",
    price: "$40",
    rating: 4.7,
    features: [
      "Lightweight and breathable",
      "Elastic waistband with drawstring",
      "Moisture-wicking technology"
    ]
  },
  {
    _id: 3,
    name: "Women's Running Tank Top",
    img_name: "/assets/images/womens-tank-top.jpg",
    brand: "Adidas",
    price: "$30",
    rating: 4.8,
    features: [
      "Sweat-wicking fabric",
      "Slim fit design",
      "Reflective details for visibility"
    ]
  },
  {
    _id: 4,
    name: "On Men's Focus Tank",
    img_name: "/assets/images/on-focus-tank.jpg",
    brand: "On Running",
    price: "$60",
    rating: 4.6,
    features: [
      "Ultra-lightweight design",
      "Seamless construction for comfort",
      "Moisture-control fabric"
    ]
  },
  {
    _id: 5,
    name: "Trigger Point Grid Foam Roller",
    img_name: "/assets/images/grid-foam-roller.jpg",
    brand: "Trigger Point",
    price: "$35",
    rating: 4.8,
    features: [
      "Durable multi-density foam",
      "Unique pattern for deep tissue massage",
      "Compact and portable"
    ]
  },
  {
    _id: 6,
    name: "Goodr Running Sunglasses",
    img_name: "/assets/images/goodr-sunglasses.jpg",
    brand: "Goodr",
    price: "$25",
    rating: 4.7,
    features: [
      "Polarized lenses",
      "No-slip coating",
      "Stylish and functional"
    ]
  },
  {
    _id: 7,
    name: "Nike AeroLoft Running Vest",
    img_name: "/assets/images/nike-aeroloft.jpg",
    brand: "Nike",
    price: "$150",
    rating: 4.9,
    features: [
      "Lightweight insulation",
      "Breathable and wind-resistant",
      "Reflective elements for safety"
    ]
  },
  {
    _id: 8,
    name: "Trigger Point Lacrosse Ball",
    img_name: "/assets/images/trigger-point-lacrosse.jpg",
    brand: "Trigger Point",
    price: "$15",
    rating: 4.5,
    features: [
      "Firm and durable construction",
      "Ideal for deep tissue massage",
      "Portable and easy to use"
    ]
  }
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});