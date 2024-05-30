import { Cow } from '../models/cow.model.mjs';

export class CowRepository {
	constructor() {
		this.cow = Cow;
	}

	async createCow(data) {
		return await this.cow.create(data);
	}

	async getCowByName(name) {
		return await this.cow.findOne({ name });
	}

	async getAllCow() {
		return await this.cow.find();
	}

	async updateCowByName(name, data) {
		return await this.cow.updateOne({ name }, data);
	}

	async deleteCowByName(name) {
		return await this.cow.deleteOne({ name });
	}
}
