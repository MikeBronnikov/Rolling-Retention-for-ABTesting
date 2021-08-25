import express from 'express'
import cors from 'cors'
import dataRouter from './routes/dataRouter'


const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.status(200).send(process.env.DATABASE_URL))
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://task-for-abtest.herokuapp.com'); //!!!
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');


    next();
});

app.use('/data', dataRouter)

app.listen(port, ()=>{console.log('SERVER RUNNED')})