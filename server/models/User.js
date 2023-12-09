import bcrypt from  'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'

const {Schema} = mongoose

const userSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail , "Please Enter a valid email"]
    },

    username:{
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: function(value){
                return /^[A-z][A-Za-z0-9-_]{3,23}$/.test(value)
            },
            message: "username does not have to be special characters"
        },

        password:{
            type: true,
            required: true,
            select: false,
            validate: [
                {
                    validator: function(value){
                        validator.isStrongPassword(value),
                        message = "Password must Contain one or more alphanumeric characters and symbols";

                    }
                }
            ]
        }
    }
})