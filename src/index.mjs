import { userRouter } from './api/user/routers/user.router.mjs';
import { feedRouter } from './api/feed/routes/feed.router.mjs';
import { cowRouter } from './api/cow/routers/cow.router.mjs';
import { mathRouter } from './api/math/routers/math.router.mjs';
import { reportRouter } from './api/report/routers/report.router.mjs';
import { analyticsRouter } from './api/analytics/routers/analytics.router.mjs';
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
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
app.use('/api', [userRouter, feedRouter, cowRouter, mathRouter, reportRouter, analyticsRouter]);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
