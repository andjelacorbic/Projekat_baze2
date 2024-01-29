import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => { console.log('MongoDB je povezan');}).catch((err) => {
        console.log(err);
    });


const app = express();

app.listen(3000, () => {
    console.log('Server je aktivan na portu 3000!');
});