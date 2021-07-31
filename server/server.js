import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import musixRoutes from './routes/musix.routes.js';

const app = express();

//below allows us to accept json on req.body under signup.routes.js
app.use(express.json());

//below is to get credentials from .env file
dotenv.config();

app.use(cors());


//endpoint starting with client
app.use('/playlist', musixRoutes);


app.listen( 4000, () => {
    console.log("App is running")
});