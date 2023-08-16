import express from 'express';
import dotenv from 'dotenv';
import connection from './db/connection.js';
import cors from 'cors';
import router from './routes/api.js';
import cookieParser from 'cookie-parser';
import authentication from './middleware/authenticate.js';

dotenv.config();


const app = express();
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}))
app.options('*', cors({origin: true, credentials: true}))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',router)





const port = process.env.PORT || 3002;
const password = process.env.password

connection(password)
app.listen(port , (req,res)=> {
    console.log(`server listening on port ${port}`);
})