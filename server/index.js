


const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const userRoutes = require("./routes/userroutes");
const router=require("./auth/auth");
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://bhowmikdwaipayan505_db_user:Xp6i436kpxoqx4jT@cluster0.sbvcv5p.mongodb.net/swaggerDB"
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ Mongo error:", err));

app.use("/users", userRoutes);
app.use("/",router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
