const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const PORT=8000;
const app=express();

const authRoutes=require('./Routes/Auth');
const taskRoutes=require('./Routes/Task')
const analyticsRoutes=require('./Routes/MachineAnalytics')

require('dotenv').config();
require('./db');

app.use(bodyParser.json());
app.use(cookieParser());


const allowedOrigins=['http://localhost:5173',`${process.env.FRONTEND_URL}`] //this frontend can use our backend
app.use(cors({
    origin: function(origin,callback){
        if(!origin||allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
        },
    credentials: true,
}));


app.use('/auth',authRoutes);
app.use('/tasks',taskRoutes);
app.use('/issues',analyticsRoutes);


app.get('/',(req,res)=>{
    res.json({message:"The api is working"})
})


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})