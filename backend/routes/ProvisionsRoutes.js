import express from 'express';
import Provisions from '../users/ProvisionsModel.js';
const router=express.Router();

router.get('/',async(req,res)=>{
	try{
		const provisions=await Provisions.find();
		if(provisions.length>0){
			res.status(200).json(provisions);
		}else{
			res.status(404).json({message:"No provisions found"});
		}
	}catch(error){
		res.status(500).json({message:error.message});
	}
})

export default router;