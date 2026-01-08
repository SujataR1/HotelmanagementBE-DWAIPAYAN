// const express = require("express");
// const mongoose = require("mongoose");
// const swaggerUI = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");
// const userRoutes = require("./routes/userroutes");
// const router=require("./auth/auth");
// const app = express();
// app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://bhowmikdwaipayan505_db_user:Xp6i436kpxoqx4jT@cluster0.sbvcv5p.mongodb.net/swaggerDB"
//   )
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch(err => console.log("❌ Mongo error:", err));

// app.use("/users", userRoutes);
// app.use("/",router);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
// });
// // const PORT = 5000;

// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(`🚀 Server running on:`);
// //   console.log(`👉 Localhost: http://localhost:${PORT}`);
// //   console.log(`👉 Network:   http://192.168.0.187:${PORT}`);
// //   console.log(`📘 Swagger Docs: http://192.168.0.187:${PORT}/api-docs`);
// // });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
//const userRoutes = require("./routes/userroutes");
const authRouter = require("./auth/auth");
const app = express();

/* ================= Middleware ================= */
app.use(express.json());

/* ================= Root Route (FIX for Cannot GET /) ================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend API is running successfully");
});

/* ================= Routes ================= */
//app.use("/users", userRoutes);      // http://IP:5000/users
app.use("/", authRouter);            // /customerlogin, /customersignup
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* ================= MongoDB ================= */
const DATABASE = process.env.DATABASE;
mongoose
  .connect(
   DATABASE
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB error:", err));

/* ================= Server ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on:");
  console.log(`👉 Localhost: http://localhost:${PORT}`);
  console.log(`👉 Network:   http://192.168.0.187:${PORT}`);
  console.log(`📘 Swagger Docs: http://192.168.0.187:${PORT}/api-docs`);
});
