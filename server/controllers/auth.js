import User from "../models/user.js";
import { hashPassword, comparePasssword } from "../helper/auth.js";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import Order from "../models/order.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim()) {
      return res.json({ error: "name is required" });
    }

    if (!email) {
      return res.json({ error: "email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "password have atleast 6 char" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "email is taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      error: "Something went wrong",
      status: "failed",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ error: "email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "password have atleast 6 char" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "user not found " });
    }

    const match = await comparePasssword(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      error: "Something went wrong",
      status: "failed",
    });
  }
};

export const secret = (req, res) => {
  res.json({ cureentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);

    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }
    //hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );
    updated.password = undefined;

    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async(req,res)=>{
  try {
    const orders = await Order.find({buyer:req.user._id}).populate('products','-photo').populate('buyer','name')
    res.json(orders)
    
  } catch (err) {
    console.log(err)
    
  }
}
export const getAllOrders = async(req,res)=>{
  try {
    const orders = await Order.find({}).populate('products','-photo').populate('buyer','name');
    res.json(orders)
    
  } catch (err) {
    console.log(err)
    
  }
}