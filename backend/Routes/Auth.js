const express=require('express');
const router=express.Router();
const User=require('../Models/userSchema');
const errorHandler=require('../Middleware/errorMiddleware');
const authTokenHandler=require('../Middleware/checkAuthToken');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

function createResponse(ok,message,data){
    return {
        ok,
        message,
        data
    }
}


router.post('/register',async(req,res,next)=>{
    try{
        const {name,email,password,city}=req.body;
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(409).json(createResponse(false,'Email already exists'));
        }
        const newUser=new User({
            name,
            password,
            email,
        });


        const result=await newUser.save()
        .catch((err)=>{
            console.log(err);
            res.json({
                status:"FAILED",
                message:"An error Occurred while Saving User Account",
            })
        })//wait the save operation
        res.status(201).json(createResponse(true,'User registered successfully',result));
    }
    catch(err){
        next(err)
    }
})


router.post('/login',async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json(createResponse(false,'Invalid Credentials'));
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json(createResponse(false,'Invalid Credentials'));
    }
    const authToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'50m'});
    const refreshToken=jwt.sign({userId:user._id},process.env.JWT_REFRESH_SECRET_KEY,{expiresIn:'60m'})
    res.cookie('authToken',authToken,{
        httpOnly: true, 
        secure: true, 
        sameSite: 'None',
    });
    res.cookie('refreshToken',refreshToken,{
        httpOnly: true, 
        secure: true, 
        sameSite: 'None',
    });

    res.status(200).json(createResponse(true,'Login Successful',{
        authToken,
        refreshToken
    }));
})


router.get('/logout', authTokenHandler, async (req, res) => {
    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    res.json({
        ok: true,
        message: 'User logged out successfully'
    })
})
router.get('/getuser', authTokenHandler, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(400).json(createResponse(false, 'Invalid credentials'));
    }
    else{
        return res.status(200).json(createResponse(true, 'User found', user));
    }
})
 

router.get('/checklogin',authTokenHandler,async(req,res)=>{
    res.json({
        userId:req.userId,
        ok:true,
        message:'User authenticated successfully',
    })
})
  


router.use(errorHandler);

module.exports=router;