import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import projectRoute from "./routes/project.route.js";
import applicationRoute from "./routes/application.route.js";
import bidRoute from "./routes/bid.route.js";
import messageRoute from "./routes/message.route.js";
import { app,server } from "./socket/socket.js";

// const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'https://xoolve-career-hub.netlify.app',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Enable pre-flight requests
  


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/bid", bidRoute);
app.use("/api/v1/message", messageRoute);

server.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`)
});