import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./routes/UserRoutes";

config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ The MONGO_URI variable is not defined in the .env file");
    process.exit(1);
};

app.get("/", (req, res) => res.send("🚀 Server initialized!"));

app.use(router);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port: http://localhost:${PORT}`);
        });

        server.on("error", (error) => {
            console.error("❌ Error on stating server", error.message);
        });
    })
    .catch((error) => {
        console.error("❌ Error connecting to database", error);
    })
