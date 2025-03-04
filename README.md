# 📡 Shwapno Inventory Management API  

🚀 **Live API**: [Shwapno Backend](https://shwapno-server.vercel.app/)  
🌍 **Frontend**: [Shwapno Inventory System](https://shwapno.vercel.app/dashboard/analytics)  
📂 **GitHub Repo**: [Shwapno Server](https://github.com/ShakirMahmud/Shwapno-Server)  

## 📖 Table of Contents  

- [Introduction](#-introduction)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Why These Packages?](#-why-these-packages)  
- [Contributors](#-contributors)  

---

## 🚀 Introduction  

The **Shwapno Inventory Management API** is a **Node.js & Express** backend for managing inventory through barcode scanning and a Kanban-style categorization system. It allows users to:  

✅ **Scan barcodes** and retrieve product details from an external API.  
✅ **Store products in MongoDB** with categorization.  
✅ **Manage inventory via API** for adding, updating, and retrieving products.  
✅ **View analytics** on product distribution and recent additions.  

---

## 🛠 Tech Stack  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (NoSQL)  
- **Libraries:**  
  - **cors** - Enables cross-origin requests.  
  - **dotenv** - Manages environment variables.  
  - **express** - Handles routing and API requests.  
  - **mongodb** - Database driver for MongoDB connection.  

---

## 🔧 Installation  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v16 or later)  
- **MongoDB** (local or cloud instance)  

### Steps  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/ShakirMahmud/Shwapno-Server.git
cd Shwapno-Server
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Set up environment variables**  

Create a `.env` file in the root folder and add the following:  
```env
PORT=5000
DB_USER=your_database_username
DB_PASS=your_database_password
MONGO_URI=mongodb+srv://<DB_USER>:<DB_PASS>@your-cluster.mongodb.net/inventory
```

**Important:** Never expose sensitive credentials in public repositories! Use `.gitignore` to exclude `.env` from being committed:  

```sh
echo ".env" >> .gitignore
```

4️⃣ **Start the server**  
```sh
npm start
```
Server should now be running at: `http://localhost:5000/`  

---

## 📦 Why These Packages?  

| Package | Purpose |
|---------|---------|
| **express** | Handles API routing and request processing. |
| **mongodb** | Connects and interacts with MongoDB. |
| **dotenv** | Manages environment variables securely. |
| **cors** | Enables cross-origin requests from the frontend. |

---

## 👨‍💻 Contributors  

👤 **Md. Shakir Mahmud** – MERN Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/shakirmahmud9/)  
🌍 [Portfolio](https://shakir-portfolio.vercel.app/)  

---

### ⚠️ Security Best Practices  
- **Never hardcode credentials in code or README files.**  
- **Use `.env` files and ensure they are added to `.gitignore`.**  
- **Use environment variables in cloud deployments instead of storing them in code.**  
