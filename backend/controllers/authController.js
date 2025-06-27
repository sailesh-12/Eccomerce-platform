import User from '../users/Usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Debug environment variables
console.log('Environment Variables Check:');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
console.log('.env file path:', path.join(__dirname, '../../.env'));

// Validate JWT_SECRET
if (!process.env.JWT_SECRET) {
	console.error('JWT_SECRET is not defined in environment variables');
	process.exit(1);
}

export const signup = async (req,res) => {
	try{
		const {username,email,password}=req.body;

		if(!username || !email || !password){
			return res.status(400).json({message:"All fields are required"});
		}
		//check if the user already exists
		const existingUser=await User.findOne({email});
		if(existingUser){
			return res.status(400).json({message:"User already exists"});
		}
		//hash the password
		const salt=await bcrypt.genSalt(10);
		const hashedPassword=await bcrypt.hash(password,salt);
		if(!hashedPassword){
			return res.status(500).json({message:"Failed to hash password"});
		}
		//create a new user
		const user=await User.create({username,email,password:hashedPassword});
		await user.save();																																																									
		res.status(201).json({message:"User created successfully",user});
	}catch(err){
		console.error('Signup error:', err);
		res.status(500).json({message: err.message});
	}
}

export const login = async (req, res) => {
	try{
		const {username,password}=req.body;
		console.log(username,password);
		if(!username || !password){
			return res.status(400).json({message:"All fields are required"});
		}
		const user=await User.findOne({username});
		console.log(user);
		
		
		if(!user){
			return res.status(401).json({message:"Invalid credentials"});
		}
		 
		const isPasswordValid=await bcrypt.compare(password,user.password);
		console.log(isPasswordValid);
		
		if(!isPasswordValid){
			return res.status(401).json({message:"Invalid credentials"});
		}

		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not configured');
		}

		//generate token for authentication
		const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"24h"});
		
		// Send response without password
		const userWithoutPassword = {
			_id: user._id,
			username: user.username,
			password:user.password
		};

		res.status(200).json({
			message:"Login successful",
			user: userWithoutPassword,
			token
		});
	}catch(err){
		console.error('Login error:', err);
		res.status(500).json({message: err.message});
	}
}

export const logout = async (req, res) => {
	try{
		res.clearCookie('token');
		res.status(200).json({message:"Logout successful"});
	}catch(err){
		console.error('Logout error:', err);
		res.status(500).json({message:err.message});
	}
}