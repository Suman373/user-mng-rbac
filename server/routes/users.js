const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const {GeneratePass} = require('../services/index');
const bcrypt = require('bcrypt');

// get all users
router.get('/', async(req,res)=>{
    try {
        const users = await UserModel.find({}).populate('role');
        if(users?.length === 0 || !users) return res.status(404).json({message:'Users not found!'});
        res.status(200).json({message:"Users fetched succesfully", result: users});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

// create new user
router.post('/', async(req,res)=>{
    try {
        const {name, email, status, role} = req.body;
        console.log(name,email,status,role);
        if(!name || !email || !status || !role) return res.status(400).json({message:"Fill up all the details"});
        const userExist = await UserModel.findOne({email:email});
        if(userExist) return res.status(400).json({message:"User with email already exists"});
        const password =  GeneratePass();
        const salt = await bcrypt.genSalt(5);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await UserModel.create({name,email,status,role,password:hashedPass});
        if(!user) throw new Error("Failed to create user");
        res.status(201).json({message:"Created user", result: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});


// edit user
router.put('/:id',async(req,res)=>{
    try {
        const {id:_id} = req.params;
        const userExist = await UserModel.findById(_id);
        if(!userExist) return res.status(400).json({message:"User not found"});
        const updatedUser = await UserModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(!updatedUser) throw new Error("Failed to update user");
        res.status(200).json({message:"Updated user", result: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;