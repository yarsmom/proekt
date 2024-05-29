import { UserRepository } from '../repositories/user.repository.mjs';
import { generatePasswordHash, comparePassword } from '../../../helpers/hash/password.mjs';
import { createToken } from '../../../helpers/jwt/jwt.mjs';

export class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async singup(data) {
		const { login, password, username } = data;
		if (
			typeof login !== 'string' ||
			typeof password !== 'string' ||
			typeof username !== 'string' ||
			!login ||
			!password ||
			!username
		) {
			return { status: 400, data: { message: 'Invalid login or password or username.' } };
		}
		if (password.length < 6) {
			return { status: 400, data: { message: 'The password must be longer than 6 characters.' } };
		}
		const potentialUser = await this.userRepository.getUserByLogin(login);
		if (potentialUser) {
			return { status: 400, data: { message: 'A user with this username is already registered.' } };
		}
		const hashPass = await generatePasswordHash(password);
		await this.userRepository.createUser({ login, password: hashPass, role: 'User', username });
		return { status: 201, data: { message: 'User created' } };
	}

	async login(data) {
		const { login, password } = data;
		if (typeof login !== 'string' || typeof password !== 'string' || !login || !password) {
			return { status: 400, data: { message: 'Invalid login or password.' } };
		}
		const user = await this.userRepository.getUserByLogin(login);
		if (!user) {
			return { status: 400, data: { message: 'A user with this username is not registered.' } };
		}
		const { password: userPassword } = user;
		const itIsvalidPass = await comparePassword(password, userPassword);
		if (!itIsvalidPass) {
			return { status: 400, data: { message: 'Invalid login or password.' } };
		}
		const jwt = createToken({ login: user.login, role: user.role });
		await this.userRepository.userUpdateByParams(
			{ _id: user._id.toString() },
			{ $push: { tokens: { token: jwt } } }
		);
		return { status: 201, data: { message: 'Successful login.', jwt, user: { login, username: user.username } } };
	}

	async logout(token) {
		await this.userRepository.userDeleteTokenByToken(token);
		return { status: 201, data: { message: 'Successful logout' } };
	}

	async logoutAll(token) {
		await this.userRepository.userDeleteTokensByToken(token);
		return { status: 201, data: { message: 'Successful logout all sessions' } };
	}
}
