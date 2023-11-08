const express = require('express');
const app = express();

const mongoose = require('mongoose');
// const userRouter = require('./routes/user')
app.use(express.json());

// app.use('/user',userRouter);

app.get('/', (req, res) => {
    // return res.status(200).type('html').send('<marquee><h1>Organization server working</h1></marquee>');
    try {
        return res.status(200).type('html').send('<marquee><h1>Employee Booking server working</h1></marquee>');
        // return res.send(200).send({data : 'ok'})
    } catch (error) {
        console.log('init server error', error);
        return res.status(500).send('something went wrong please try after time');
    }
});

mongoose.connect('mongodb://localhost:27017/Booking', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected with organization database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

const port = 4000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

