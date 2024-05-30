import express from 'express';
import * as dotenv from 'dotenv';
//import { countryRouter } from "./src/routes/country.router.mjs";
import mongoose from 'mongoose';
import morgan from 'morgan';
import { userRouter } from './api/user/routers/user.router.mjs';
import { feedRouter } from './api/feed/routes/feed.router.mjs';
import { cowRouter } from './api/cow/routers/cow.router.mjs';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = process.env.DB_CONNECTION_STRING;

mongoose.set('strictQuery', false);

mongoose
	.connect(db)
	.then((res) => console.log('Connected to DB'))
	.catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use('/api', [userRouter, feedRouter, cowRouter]);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
