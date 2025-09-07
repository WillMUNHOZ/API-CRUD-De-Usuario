import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./routes/UserRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json" with { type: "json" };
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET

if (!MONGO_URI || !JWT_SECRET) {
    throw new Error("❌ Environment variables are missing. Please ensure MONGO_URI and JWT_SECRET are defined in your .env file");
};

app.get("/", (req, res) => res.send("🚀 Server initialized!"));

app.use(router);

app.use(errorHandlerMiddleware);

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
