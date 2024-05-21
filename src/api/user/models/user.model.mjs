import mongoose from 'mongoose';

const UserShema = mongoose.Schema(
	{
		login: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 4,
			trim: true,
		},
		role: {
			type: String,
			required: true,
		},
		tokens: [
			{
				token: {
					type: String,
					require: false,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model('User', UserShema);
