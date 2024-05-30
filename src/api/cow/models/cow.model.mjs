import mongoose from 'mongoose';

const cowSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	a: {
		type: Number,
		required: true,
	},
	b: {
		type: Number,
		required: true,
	},
	c: {
		type: Number,
		required: true,
	},
	a1: {
		type: Number,
		required: true,
	},
	a2: {
		type: Number,
		required: true,
	},
	c2: {
		type: Number,
		required: true,
	},
	a3: {
		type: Number,
		required: true,
	},
	b3: {
		type: Number,
		required: true,
	},
});

export const Cow = mongoose.model('Cow', cowSchema);
