import mongoose from 'mongoose';

const VegetableSchema=new mongoose.Schema({
	id:{
		type:Number,
		required:true,
	},
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
	}	,
	description:{
		type:String,
		required:true,
	}
},{timestamps:true})

const Vegetable=mongoose.model('Vegetable',VegetableSchema);
export default Vegetable;
