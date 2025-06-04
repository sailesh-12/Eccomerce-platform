import express from 'express';
import Fruit from '../users/FruitsModel.js';
const router=express.Router();

router.get('/',async(req,res)=>{
	try{
		const fruits=await Fruit.find();
		console.log(fruits);
		
		if(fruits.length>0){
			res.status(200).json(fruits);
		}else{
			res.status(404).json({message:"No fruits found"});
		}
	}catch(error){
		res.status(500).json({message:error.message});
	}
})

export default router;