import express from 'express'
import * as dotenv from 'dotenv'
//import { countryRouter } from "./src/routes/country.router.mjs";
import mongoose from 'mongoose'
import morgan from 'morgan'

dotenv.config()

const app = express()
const port = process.env.PORT

{
}
// const db =
//   "mongodb+srv://mazay:dX2T4zcJMFW7YMvv@cluster0.qwhvqn1.mongodb.net/?retryWrites=true&w=majority";

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(db)
//   .then((res) => console.log("Connected to DB"))
//   .catch((error) => console.log(error));

app.use(express.json())
app.use(morgan('common'))
app.use('/test', () => {
	console.log('roma lox')
})
app.use('/test1', (req, res) => {
	const { pidor } = req.query
	console.log(req)
	res.status(200).send('roma lox')
})
//app.use("/api", countryRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
