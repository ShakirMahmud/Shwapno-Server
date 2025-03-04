const express = require("express");
const cors = require("cors");
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
