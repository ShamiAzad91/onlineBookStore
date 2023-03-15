import express from "express";

const router = express.Router();

//controllers
import { register, login, secret,updateProfile,getOrders,getAllOrders } from "../controllers/auth.js";

//middlewares
import { requireSignin, isAdmin } from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin,(req,res)=>{
    res.json({ok:'true'})
});

router.get("/admin-check", requireSignin,isAdmin,(req,res)=>{
    res.json({ok:'true'})
});

//testing
router.get("/secret", requireSignin, isAdmin, secret);
router.put("/profile", requireSignin, updateProfile);
router.get("/all-orders", requireSignin, isAdmin,getAllOrders);



router.get("/orders",requireSignin,getOrders)


export default router;
