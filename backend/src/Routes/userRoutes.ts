import {Router} from 'express';
const userRouter=Router();

import verifyToken from '../middleware/verifyToken';
import {getSignUp,getAll,getSignIn,getGmail,getCheckOtp,getChangePassword} from '../Controllers/userControllers';

userRouter.get("/getAll",getAll);
userRouter.post("/signup",getSignUp);
userRouter.post("/signin",getSignIn);
userRouter.post("/gettingGmail",verifyToken,getGmail);
userRouter.post("/CheckOtp",verifyToken,getCheckOtp);
userRouter.post("/changePassword",verifyToken,getChangePassword);
export default userRouter;