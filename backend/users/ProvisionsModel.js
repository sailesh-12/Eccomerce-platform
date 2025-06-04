import mongoose from 'mongoose';

const ProvisionsSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true,
	},
	price:{
		type:String,		
		required:true,
	},
	quantity:{
		type:Number,
		required:true,
	},
	image:{
		type:String,
		required:true,
	},
	description:{
		type:String,
		required:true,
	}
},{timestamps:true});

const Provisions=mongoose.model('provisions',ProvisionsSchema);

export default Provisions;