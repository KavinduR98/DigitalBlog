import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";


const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);// http://localhost:5000/users/signup
app.use("/blog", blogRouter);


app.get("/", (req, res) => {
    res.send("Welcome to blog API");
});

const port = process.env.PORT || 8800;


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(port,()=> console.log(`Server is running on ${port}🔥🔥🔥`));
    })
.catch((error)=> console.log(`${port}did not connect`));