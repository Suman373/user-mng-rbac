const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'role',
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // minimum password length
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('user', userSchema);