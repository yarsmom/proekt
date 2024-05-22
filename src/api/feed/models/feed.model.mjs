import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	DM: {
		type: Number,
		required: true,
	},
	ME: {
		type: Number,
		required: true,
	},
	NEm: {
		type: Number,
		required: true,
	},
	NEg: {
		type: Number,
		required: true,
	},
	NDF: {
		type: Number,
		required: true,
	},
	eNDF: {
		type: Number,
		required: true,
	},
	CP: {
		type: Number,
		required: true,
	},
	DIP: {
		type: Number,
		required: true,
	},
	K: {
		type: Number,
		required: true,
	},
	CA: {
		type: Number,
		required: true,
	},
	P: {
		type: Number,
		required: true,
	},
	CostCWT: {
		type: Number,
		required: true,
	},
	MG: {
		type: Number,
		required: true,
	},
	S: {
		type: Number,
		required: true,
	},
	CO: {
		type: Number,
		required: true,
	},
	CU: {
		type: Number,
		required: true,
	},
	FE: {
		type: Number,
		required: true,
	},
	MN: {
		type: Number,
		required: true,
	},
	SE: {
		type: Number,
		required: true,
	},
	TDN: {
		type: Number,
		required: true,
	},
});

export const Feed = mongoose.model('Feed', feedSchema);
