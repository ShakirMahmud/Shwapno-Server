const express = require("express");
const cors = require("cors");
const axios = require("axios");  // Use axios to send HTTP requests
require("dotenv").config();

const { connectToDatabase } = require("./src/config/dbConnection");
const productsRoutes = require("./src/routes/productsRoutes");
const categoriesRoutes = require("./src/routes/categoriesRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection and server start
async function startServer() {
  try {
    await connectToDatabase();

    // Routes
    app.use("/products", productsRoutes);
    app.use("/categories", categoriesRoutes);
    app.use("/stats", statsRoutes);

    app.get("/api/proxy/product/:barcode", async (req, res) => {
      const { barcode } = req.params;
      try {
        const response = await axios.get(
          `https://products-test-aci.onrender.com/product/${barcode}`
        );
        res.json(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        res.status(500).json({ error: "Failed to fetch product data." });
      }
    });

    // Basic route
    app.get("/", (req, res) => {
      res.send("Shwapno Server is running!");
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer();
