export const role = (requiredRole) => {
	return function (req, res, next) {
		try {
			const { role } = req.user;
			const validRole = requiredRole.includes(role);
			if (validRole) {
				next();
			} else {
				res.status(403).send({ message: 'Forbidden: Insufficient role' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: 'Internal server error' });
		}
	};
};
