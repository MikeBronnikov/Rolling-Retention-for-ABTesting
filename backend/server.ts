import express from 'express'
import cors from 'cors'
import dataRouter from './routes/dataRouter'


const app = express()
const PORT = process.env.PORT || 8001

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //!!!
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');


    next();
});

app.use('/data', dataRouter)

app.listen(PORT, ()=>{console.log('SERVER RUNNED')})