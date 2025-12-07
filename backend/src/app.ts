import express  , {Request , Response} from "express";
const app = express();
import cors from 'cors';
import userRouter from "./Routes/userRoutes";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
app.use(cookieParser());
app.get("/",(req:Request,res:Response)=>{
  res.send("hii harsh here");
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use("/api/all",userRouter);
app.get("/api/all/authCheck",verifyToken,(req:Request,res:Response)=>{
  return res.status(200).json({
    message:"Authorized",
    user:(req as any).user
  })
})
const PORT=3000;
app.listen(PORT,()=>{
  console.log(`Server is listening to http://localhost:${PORT}`);
})
export default app;