import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const nutrientSchema = new Schema({
	value: Number,
	status: String,
});

const reportSchema = new Schema({
	name: String,
	cowId: { type: ObjectId, ref: 'Cow' },
	DMamt: Array,
	feedIds: Array,
	GAIN: Number,
	userLogin: String,
	NEmMegacalCWT_DRY: Number,
	MultipleOfNem: Number,
	MEMegcalCWT: Number,
	NEgMegacalCWT: Number,
	TDN: Number,
	calculatedMoistureOfASISmixture: Number,
	cost: Number,
	PROT: Number,
	CALC: Number,
	PHOS: Number,
	AFamt: Array,
	OfferVsAllov: Number,
	NDF: nutrientSchema,
	eNDS: nutrientSchema,
	crudeProtein: nutrientSchema,
	DIP: nutrientSchema,
	Potassium: nutrientSchema,
	Calcium: nutrientSchema,
	Phosphorus: nutrientSchema,
	Magnesium: nutrientSchema,
	Sulfur: nutrientSchema,
	Cobalt: nutrientSchema,
	Copper: nutrientSchema,
	Iron: nutrientSchema,
	Manganese: nutrientSchema,
	Selenium: nutrientSchema,
});

export const Report = mongoose.model('Report', reportSchema);
