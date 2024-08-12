require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid'); // Importă uuid
const ordersFilePath = path.join(__dirname, '../API/data/orders.json');

const { log } = require("console");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Stripe secret key is not set");
} else {
  console.log("Stripe secret key is set");
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/menu", (req, res) => {
  const menuList = require("./data/data.json");
  res.json(menuList);
});



app.post("/orders", (req, res) => {
  const newData = { id: uuidv4(),...req.body,  }; // Adaugă un ID unic

  // Verifică dacă fișierul există
  if (!fs.existsSync(ordersFilePath)) {
    // Dacă nu există, creează-l cu un conținut inițial gol
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), 'utf8');
  }

  // Citește conținutul fișierului
  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Error parsing JSON");
    }

    jsonData.push(newData);

    // Scrie datele actualizate în fișier
    fs.writeFile(ordersFilePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error writing file");
      }

      res.send(newData); 
    });
  });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Received items:", items);

    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "ron", // RON pentru leu românesc
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Stripe acceptă sume în cenți
        },
        quantity: item.quantity, // Asigură-te că este număr
      })),
      mode: "payment",
      success_url: "http://localhost:5175/success",
      cancel_url: "http://localhost:5175/",
    });

    console.log("Created checkout session:", session);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
