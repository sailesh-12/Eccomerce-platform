import mongoose from 'mongoose';

const FruitSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	}
}, { timestamps: true })

const Fruit = mongoose.model('fruit', FruitSchema);
export default Fruit;
