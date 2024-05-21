import { User } from '../models/user.model.mjs';

export class UserRepository {
	constructor() {
		this.user = User;
	}

	async createUser(data) {
		return await this.user.create(data);
	}

	async getUserByLogin(login) {
		return await this.user.findOne({ login });
	}

	async userUpdateByParams(params, update) {
		return await this.user.updateOne(params, update);
	}

	async userDeleteTokenByToken(token) {
		return await this.user.updateOne({ 'tokens.token': token }, { $pull: { tokens: { token } } });
	}

	async userDeleteTokensByToken(token) {
		return await this.user.updateOne({ 'tokens.token': token }, { $set: { tokens: [] } });
	}
}
