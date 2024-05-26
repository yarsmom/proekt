import { User } from '../api/user/models/user.model.mjs';
import { decodedJwt } from '../helpers/jwt/jwt.mjs';

export const auth = async (req, res, next) => {
	let token = req.header('Authorization');
	try {
		if (!token) {
			return res.status(401).send({ message: 'Authentication required' });
		}
		token = token.replace('Bearer ', '');
		const decoded = decodedJwt(token);
		const user = await User.findOne({ login: decoded.login, 'tokens.token': token });
		if (!user) {
			return res.status(401).send({ message: 'Authentication required' });
		}
		req.user = { login: decoded.login, token, role: user.role };
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			await User.updateOne({ 'tokens.token': token }, { $pull: { tokens: { token } } });
			return res.status(401).send({ message: 'JWT expired' });
		}
		console.log(error);
		res.status(500).send({ message: 'Internal server error' });
	}
};
