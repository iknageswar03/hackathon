const express=require('express');
const errorHandler=require('../Middleware/errorMiddleware');

const router = express.Router();



router.use(errorHandler);

module.exports=router;