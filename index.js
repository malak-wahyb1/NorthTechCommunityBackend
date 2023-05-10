import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./conn/db.js"

dotenv.config();
const PORT =process.env.PORT || 5000;
connectDB()
const app = new express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json)

app.get('/',(res,req)=>{
res.send('API is Running');
});

app.listen(PORT,console.log(`server listening on port http://localhost:${PORT}`));