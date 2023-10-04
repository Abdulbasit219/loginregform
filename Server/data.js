const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cpassword: String,
    jwtokens: [
        {
            token: String, 
        }
    ]
})


// save password in hash form in database
userSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    if(this.isModified('cpassword')){
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

//generate JW Token
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY );
        this.jwtokens = this.jwtokens.concat({ token: token });
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}

const User = mongoose.model('Registerations', userSchema);
module.exports = User;








