import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log('Server je aktivan na portu 3000!');
});