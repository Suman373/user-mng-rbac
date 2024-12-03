const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type:String,
        trim:true
    },
    permissions:{
        read:{type:Boolean, required:true, default: true},
        write:{type:Boolean, required:true, default: false},
        delete:{type:Boolean,  required:true, default: false}
    }
},{
    toJSON: {
        transform(doc,ret){
            delete ret.__v;
        }
    }, timestamps: true
});

module.exports = mongoose.model('role', roleSchema);