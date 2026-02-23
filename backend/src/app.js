import express from "express";
import cors from "cors";
import helmet from "helmet";
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));


app.use(helmet());

app.use("/", urlRoutes);

export default app;