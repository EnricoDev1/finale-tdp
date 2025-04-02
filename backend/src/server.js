import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js";
import path from "path";

dotenv.config()
const app = express()

// ejs stuffs
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static("public"));

// parse request
app.use(express.json());

// start every request with /api/
app.use('/api', apiRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server in ascolto su http://localhost:3000.")
})
