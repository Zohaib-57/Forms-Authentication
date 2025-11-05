const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
	res.json({
		status: "Ok",
		message: "Server is running",
	})
);

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).send();
});
app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running at Port ${PORT}`);
});
