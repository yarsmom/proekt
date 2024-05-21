import { UserService } from '../services/user.service.mjs';

export class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async singup(req, res) {
		try {
			const data = req.body;
			const result = await this.userService.singup(data);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async login(req, res) {
		try {
			const data = req.body;
			const result = await this.userService.login(data);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async logout(req, res) {
		try {
			const { token } = req.user;
			const result = await this.userService.logout(token);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}

	async logoutAll(req, res) {
		try {
			const { token } = req.user;
			const result = await this.userService.logoutAll(token);
			res.status(result.status).send(result.data);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	}
}
