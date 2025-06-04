import express from 'express';
import Vegetable from '../users/Vegetablesmodel.js';
const router = express.Router();

// Get all vegetables
//I want to store the vegetables data to the database

router.get('/', async(req, res) => {
	try{
		const vegetables=await Vegetable.find();
		res.status(200).json(vegetables);
	}catch(error){
		res.status(500).json({message:error.message});
	}
});

export default router; 