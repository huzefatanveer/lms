const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/userRoutes.js');


const {verifyTokenExiry}= require('./middleware/authentication.js')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

dotenv.config();

connectDB();

const logger = (req, res, next) => {
    console.log(req.method, req.path);
    next();
};

app.use(logger);
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

app.use('/user', userRouter);



app.get("/verify" , verifyTokenExiry)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
