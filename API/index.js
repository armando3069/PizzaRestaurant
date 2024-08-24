require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const { v4: uuidv4 } = require("uuid"); // Importă uuid
const ordersFilePath = path.join(__dirname, "../API/data/orders.json");
const usersFilePath = path.join(__dirname, "../API/data/users.json");

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
const users = [];
const secretKey = "secret"; // Folosește un secret puternic în producție

app.get("/menu", (req, res) => {
  const menuList = require("./data/data.json");
  res.json(menuList);
});

app.get('/orders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrage tokenul din header

  if (!token) {
    return res.status(401).json({ message: 'Token lipsă.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id; // ID-ul utilizatorului din token
    console.log('Decoded userId:', userId);

    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
      if (err) throw err;

      const orders = JSON.parse(data);
      // Filtrează comenzile pentru utilizatorul respectiv
      const userOrders = orders.filter(order => order.UserID === userId);
      res.status(200).json(userOrders);
    });
  } catch (error) {
    res.status(401).json({ message: 'Token invalid.' });
  }
});


app.post("/orders", (req, res) => {
  const newData = { OrderID: uuidv4(), ...req.body }; // Adaugă un ID unic

  // Verifică dacă fișierul există
  if (!fs.existsSync(ordersFilePath)) {
    // Dacă nu există, creează-l cu un conținut inițial gol
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), "utf8");
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
    fs.writeFile(
      ordersFilePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing file");
        }

        res.send(newData);
      }
    );
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username și password sunt necesare." });
  }

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      return res.status(400).json({ message: "Utilizatorul există deja." });
    }
    const newUser = {
      id: uuidv4(),
      username,
      email,
      hashedPassword,
    };
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) throw err;
      res.status(201).json({ message: "Înregistrare cu succes!" });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username și password sunt necesare." });
  }

  fs.readFile(usersFilePath, "utf8", async (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const user = users.find((u) => u.username === username);

    if (!user || !user.hashedPassword) {
      return res.status(400).json({ message: "Datele sunt incorecte." });
    }

    // Compară parola folosind bcrypt cu hashedPassword
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Autentificare eșuată" });
    }

    // Generează tokenul JWT
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token,id:user.id });
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
      success_url: "http://localhost:5174/success",
      cancel_url: "http://localhost:5174/",
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
