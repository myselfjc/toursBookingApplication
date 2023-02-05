const { promisify } = require('util');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { json } = require('express');

const jwt_Token = (id) =>{
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn : process.env.JWT_EXPIRES_IN});
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = jwt_Token(newUser._id);
        res.status(201).json({
            status: "Success",
            token,
            data: {
                newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err
        })
    }
}

exports.login = async (req,res)=>{
    const {email,password} = req.body;
    //checking if user and passwords entered
    if(!email || !password){
        return res.status(400).json({
            status: "Failed",
            message: 'User or password is not entered'
        })
    }
    //checking if user and password exsits
    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.checkPassword(password,user.password))){
        return res.status(400).json({
            status: "Failed",
            message: 'User or password is wrong'
        })
    }
    //token...
    const token = jwt_Token(user._id);
    res.status(200).json({
        status:"Success",
        data:{
            token
        }
    })
}


exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
    }
    if(!token){
        res.status(401).json({
            status: 'Failed',
            message: 'User is not authorised!'
        })
    }
    try{const decoded = await promisify(jwt.verify)(token,process.env.JWT_TOKEN);
    
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        res.status(401).json({
            status: 'Failed',
            message : 'User doesnt exists'
        })
    }
    req.user = currentUser;
    console.log(currentUser)


    }catch(err){
        res.status(401).json({
            status: 'Failed',
            message : 'Something went error'
        })
    }
    next();
}

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                status: 'Failed',
                message : 'You are not authorised to perform this action'
            })
        }
        next();
    }
    
}


