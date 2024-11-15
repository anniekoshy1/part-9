const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const Images = {
    "gear": [
        {
            "_id": 1,
            "name": "Lululemon Speed Up Short 4\"",
            "img_name": "assets/images/lululemon-shorts.jpg",
            "brand": "Lululemon",
            "price": "$68",
            "rating": 4.9,
            "features": [
              "Quick-drying fabric",
              "Breathable mesh liner",
              "Back pocket for essentials"
            ]
          },
          {
            "_id": 2,
            "name": "Men's Running Shorts",
            "img_name": "assets/images/mens-running-shorts.jpg",
            "brand": "Nike",
            "price": "$40",
            "rating": 4.7,
            "features": [
              "Lightweight and breathable",
              "Elastic waistband with drawstring",
              "Moisture-wicking technology"
            ]
          },
          {
            "_id": 3,
            "name": "Women's Running Tank Top",
            "img_name": "assets/images/womens-tank-top.jpg",
            "brand": "Adidas",
            "price": "$30",
            "rating": 4.8,
            "features": [
              "Sweat-wicking fabric",
              "Slim fit design",
              "Reflective details for visibility"
            ]
          },
          {
            "_id": 4,
            "name": "On Men's Focus Tank",
            "img_name": "assets/images/on-focus-tank.jpg",
            "brand": "On Running",
            "price": "$60",
            "rating": 4.6,
            "features": [
              "Ultra-lightweight design",
              "Seamless construction for comfort",
              "Moisture-control fabric"
            ]
          },
          {
            "_id": 5,
            "name": "TriggerPoint GRID Foam Roller",
            "img_name": "assets/images/grid-foam-roller.jpg",
            "brand": "TriggerPoint",
            "price": "$35",
            "rating": 4.8,
            "features": [
              "Patented multi-density design",
              "Ideal for muscle recovery and injury prevention",
              "Durable and easy to carry"
            ]
          },
          {
            "_id": 6,
            "name": "RumbleRoller Textured Foam Roller",
            "img_name": "assets/images/rumbleroller.jpg",
            "brand": "RumbleRoller",
            "price": "$50",
            "rating": 4.7,
            "features": [
              "Deep tissue massage capability",
              "Flexible foam knobs for muscle relief",
              "Durable and high-density"
            ]
          },
          {
            "_id": 7,
            "name": "AmazonBasics High-Density Foam Roller",
            "img_name": "assets/images/amazon-foam-roller.jpg",
            "brand": "AmazonBasics",
            "price": "$20",
            "rating": 4.6,
            "features": [
              "Extra-firm for deep tissue massage",
              "Lightweight and easy to transport",
              "Durable polypropylene material"
            ]
          },
          {
            "_id": 8,
            "name": "LuxFit Premium High-Density Foam Roller",
            "img_name": "assets/images/luxfit-foam-roller.jpg",
            "brand": "LuxFit",
            "price": "$25",
            "rating": 4.7,
            "features": [
              "Helps improve muscle recovery",
              "Great for balance and posture",
              "Maintains shape and firmness over time"
            ]
          },
          {
            "_id": 9,
            "name": "TriggerPoint Lacrosse Ball",
            "img_name": "assets/images/triggerpoint-lacrosse.jpg",
            "brand": "TriggerPoint",
            "price": "$10",
            "rating": 4.8,
            "features": [
              "Durable material for deep tissue massage",
              "Perfect for targeting small muscle groups",
              "Compact and portable"
            ]
          },
          {
            "_id": 10,
            "name": "ProSource Lacrosse Ball",
            "img_name": "assets/images/prosource-lacrosse.jpg",
            "brand": "ProSource",
            "price": "$8",
            "rating": 4.6,
            "features": [
              "High-density rubber construction",
              "Ideal for trigger point therapy",
              "Great for improving mobility"
            ]
          },
          {
            "_id": 11,
            "name": "RAD Recovery Rounds",
            "img_name": "assets/images/rad-recovery.jpg",
            "brand": "RAD",
            "price": "$16",
            "rating": 4.7,
            "features": [
              "Firmness designed for deep pressure",
              "Includes two different density balls",
              "Effective for myofascial release"
            ]
          },
          {
            "_id": 12,
            "name": "Rogue Lacrosse Ball",
            "img_name": "assets/images/rogue-lacrosse.jpg",
            "brand": "Rogue",
            "price": "$12",
            "rating": 4.9,
            "features": [
              "Textured surface for enhanced grip",
              "Effective for breaking up muscle knots",
              "Durable and easy to clean"
            ]
          },
            {
              "_id": 13,
              "name": "Hoka One One Clifton 8",
              "img_name": "assets/images/hoka.jpg",
              "brand": "Hoka",
              "price": "$140",
              "rating": 4.7,
              "features": [
                "Extra cushioning for long distances",
                "Lightweight and breathable",
                "Supportive midsole"
              ]
            },
            {
              "_id": 14,
              "name": "Brooks Ghost 14",
              "img_name": "assets/images/brooks.jpg",
              "brand": "Brooks",
              "price": "$130",
              "rating": 4.8,
              "features": [
                "Soft cushioning",
                "Seamless transitions",
                "Perfect for daily running"
              ]
            },
            {
              "_id": 15,
              "name": "New Balance Fresh Foam X More V4",
              "img_name": "assets/images/fresh-foam-v4.jpg",
              "brand": "New Balance",
              "price": "$150",
              "rating": 4.7,
              "features": [
                "Maximum cushioning for comfort",
                "Durable rubber outsole for traction",
                "Breathable engineered mesh upper"
              ]
            },
            {
              "_id": 16,
              "name": "Nike Zoom Rival Track Spikes",
              "img_name": "assets/images/spikes.jpg",
              "brand": "Nike",
              "price": "$70",
              "rating": 4.6,
              "features": [
                "Lightweight design for speed",
                "Durable spike plate",
                "Breathable upper mesh"
              ]
            },
            {
                "_id": 17,
                "name": "Goodr OG Running Sunglasses",
                "img_name": "assets/images/goodr-sunglasses.jpg",
                "brand": "Goodr",
                "price": "$25",
                "rating": 4.7,
                "features": [
                  "Lightweight frame",
                  "Polarized lenses",
                  "No-slip coating"
                ]
              },
              {
                "_id": 18,
                "name": "Oakley Flak 2.0 XL",
                "img_name": "assets/images/oakley-flak.jpg",
                "brand": "Oakley",
                "price": "$170",
                "rating": 4.9,
                "features": [
                  "High Definition Optics",
                  "UV protection",
                  "Impact-resistant lenses"
                ]
              },
              {
                "_id": 19,
                "name": "Roka Phantom Titanium Sunglasses",
                "img_name": "assets/images/roka-phantom.jpg",
                "brand": "Roka",
                "price": "$190",
                "rating": 4.8,
                "features": [
                  "Ultra-lightweight",
                  "Titanium frame",
                  "Sweat-resistant"
                ]
              },
              {
                "_id": 20,
                "name": "Nike Tailwind Sunglasses",
                "img_name": "assets/images/nike-tailwind.jpg",
                "brand": "Nike",
                "price": "$80",
                "rating": 4.6,
                "features": [
                  "Ventilated nose bridge",
                  "Polycarbonate lenses",
                  "Adjustable frame"
                ]
              },
              {
                "_id": 21,
                "name": "Nike AeroLoft Running Vest",
                "img_name": "assets/images/nike-aeroloft.jpg",
                "brand": "Nike",
                "price": "$180",
                "rating": 4.8,
                "features": [
                  "Insulated with lightweight warmth",
                  "Breathable design",
                  "Water-resistant fabric"
                ]
              },
              {
                "_id": 22,
                "name": "Patagonia Nano Puff Vest",
                "img_name": "assets/images/patagonia-nano.jpg",
                "brand": "Patagonia",
                "price": "$149",
                "rating": 4.7,
                "features": [
                  "Windproof and water-resistant",
                  "Recycled insulation",
                  "Packs into its own pocket"
                ]
              },
              {
                "_id": 23,
                "name": "Salomon Agile Running Vest",
                "img_name": "assets/images/salomon-agile.jpg",
                "brand": "Salomon",
                "price": "$100",
                "rating": 4.6,
                "features": [
                  "Stretchable fabric for easy movement",
                  "Reflective details for visibility",
                  "Lightweight and compact design"
                ]
              },
              {
                "_id": 24,
                "name": "The North Face Ventrix Vest",
                "img_name": "assets/images/northface-ventrix.jpg",
                "brand": "The North Face",
                "price": "$160",
                "rating": 4.9,
                "features": [
                  "Dynamic insulation for warmth",
                  "Breathable stretch fabric",
                  "Durable water-repellent finish"
                ]
              },
              {
                "_id": 25,
                "name": "Apple Watch Series 8",
                "img_name": "assets/images/apple-watch.jpg",
                "brand": "Apple",
                "price": "$399",
                "rating": 4.7,
                "features": [
                  "GPS and cellular options",
                  "Heart rate monitoring",
                  "Fitness tracking",
                  "ECG and blood oxygen monitoring",
                  "Water-resistant up to 50 meters"
                ]
              },
              {
                "_id": 26,
                "name": "Garmin Forerunner 955",
                "img_name": "assets/images/garmin-forerunner.jpg",
                "brand": "Garmin",
                "price": "$499",
                "rating": 4.8,
                "features": [
                  "Advanced GPS tracking",
                  "Multi-sport modes",
                  "VO2 max and recovery metrics",
                  "Built-in music storage",
                  "Battery life up to 2 weeks"
                ]
              },
              {
                "_id": 27,
                "name": "Polar Vantage V2",
                "img_name": "assets/images/polar-vantage.jpg",
                "brand": "Polar",
                "price": "$499",
                "rating": 4.5,
                "features": [
                  "Heart rate and GPS tracking",
                  "Running power metrics",
                  "Sleep and recovery insights",
                  "Waterproof up to 100 meters",
                  "40-hour battery life"
                ]
              },
              {
                "_id": 28,
                "name": "Coros Pace 2",
                "img_name": "assets/images/coros-pace.jpg",
                "brand": "Coros",
                "price": "$199",
                "rating": 4.6,
                "features": [
                  "Lightweight design",
                  "GPS and barometer",
                  "Heart rate and stride analysis",
                  "Up to 30 hours battery life",
                  "Multi-sport modes"
                ]
              },
              {
                "_id": 29,
                "name": "Lululemon Water Bottle",
                "img_name": "assets/images/lululemon-bottle.jpg",
                "brand": "Lululemon",
                "price": "$38",
                "rating": 4.6,
                "features": [
                  "Leak-proof",
                  "Double-wall insulation",
                  "Keeps drinks cold for 24 hours"
                ]
              },
              {
                "_id": 30,
                "name": "Hydro Flask Standard Mouth Bottle",
                "img_name": "assets/images/hydroflask-bottle.jpg",
                "brand": "Hydro Flask",
                "price": "$45",
                "rating": 4.8,
                "features": [
                  "Durable stainless steel",
                  "TempShield insulation",
                  "Keeps drinks cold up to 24 hours and hot up to 12 hours"
                ]
              },
              {
                "_id": 31,
                "name": "Owala FreeSip Bottle",
                "img_name": "assets/images/owala-bottle.jpg",
                "brand": "Owala",
                "price": "$22",
                "rating": 4.7,
                "features": [
                  "Spill-proof lid",
                  "Built-in carry loop",
                  "Available in multiple colors"
                ]
              },
              {
                "_id": 32,
                "name": "Yeti Rambler Bottle",
                "img_name": "assets/images/yeti-bottle.jpg",
                "brand": "Yeti",
                "price": "$50",
                "rating": 4.9,
                "features": [
                  "18/8 stainless steel",
                  "Double-wall vacuum insulation",
                  "Duracoat color won't chip or crack"
                ]
              }
    ]
};
const itemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  img_name: Joi.string().required(),
  rating: Joi.number().required(),
  features: Joi.array().items(Joi.string()).required(),
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/upload", upload.single("gear"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log("File uploaded successfully:", req.file);
  res.send({ message: "File uploaded successfully!", file: req.file });
});


app.get("/api/gear", (req, res) => {
    res.json(Images.gear);
});

app.post("/api/gear", (req, res) => { 
  const { error } = itemSchema.validate(req.body); 
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const newItem = { ...req.body, _id: Images.gear.length + 1 };
  Images.gear.push(newItem);
  res.json({ success: true, newItem });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});