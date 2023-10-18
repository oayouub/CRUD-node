require('dotenv').config();
//init server express
const express = require('express');
const app = express();
const port = 3000;
// console.log('url', process.env.MONGODB_URI)
const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`, {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pkmRouter = require('./router/pkmRouter.js');
app.use('/pkm', pkmRouter);

const userRouter = require('./router/userRouter.js');
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});





