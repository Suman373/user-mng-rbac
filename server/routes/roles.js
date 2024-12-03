const express = require('express');
const router = express.Router();
const RoleModel = require('../models/role');

// get all roles
router.get('/', async(req,res)=>{
    try {
        const roles = await RoleModel.find();
        if(roles?.length === 0 || !roles) return res.status(404).json({message:'Roles not found!'});
        res.status(200).json({message:"Roles fetched succesfully", result: roles});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

// create new role
router.post('/', async(req,res)=>{
    try {
        const {name, permissions} = req.body;
        console.log(req.body);
        if(!name || !permissions) return res.status(400).json({message:"Fill up all the details"});
        const roleExist = await RoleModel.findOne({name:name});
        if(roleExist) return res.status(400).json({message:"Role with name already exists"});
        const role = await RoleModel.create(req.body);
        if(!role) throw new Error("Failed to create role");
        res.status(200).json({message:"Created role", result: role});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});


// edit role
router.put('/:id',async(req,res)=>{
    try {
        const {id:_id} = req.params;
        const roleExist = await RoleModel.findById(_id);
        if(!roleExist) return res.status(400).json({message:"Role not found"});
        const updatedRole = await RoleModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(!updatedRole) throw new Error("Failed to update role");
        res.status(200).json({message:"Updated role", result: updatedRole});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;