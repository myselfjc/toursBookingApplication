const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ' A User must have a name'],
        maxlength: [40, 'A user name must have less or equal then 40 characters'],
        minlength: [10, 'A user name must have more or equal then 10 characters']
    },
    email: {
        type: String,
        required: [true, ' A User must have a name'],
        unique: true,
        validate: [validator.isEmail],
        lowercase: true
    },
    role:{
        type: String,
        enum: ['User','guide','admin'],
        default: 'User'        
    },
    password:{
        type: String,
        required: [true, 'Password is required here!'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            validator: function (el){
                return el === this.password
            },
            message: 'Password is not matching'
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
})

userSchema.methods.checkPassword = (async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
})



const User = mongoose.model('User',userSchema);

module.exports = User;