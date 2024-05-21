import jwt from 'jsonwebtoken';

function createToken(data) {
	return jwt.sign(data, process.env.SECRET_KEY_JWT, {
		expiresIn: '24h',
	});
}

function decodedJwt(token) {
	return jwt.verify(token, process.env.SECRET_KEY_JWT);
}

export { createToken, decodedJwt };
