import bcrypt from 'bcrypt';

async function generatePasswordHash(password) {
	const hashPassword = await bcrypt.hash(password, parseInt(process.env.PS_SALD || 10));
	return hashPassword;
}

async function comparePassword(password, hashPassword) {
	return await bcrypt.compare(password, hashPassword);
}

export { generatePasswordHash, comparePassword };
