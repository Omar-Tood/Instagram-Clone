import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please Enter a valid email"],
    },

    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [
        {
          validator: function (value) {
            return /^[A-z][A-Za-z0-9-_]{3,23}$/.test(value);
          },
          message: "username does not have to be special characters",
        },
      ],

      password: {
        type: true,
        required: true,
        select: false,
        validate: [
          {
            validator: function (value) {
               return validator.isStrongPassword(value)
               
            },
            message:"Password must contain one or more alphanumeric characters and symbols"
          },
        ],
      },

      isEmailConfirmed: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
});

userSchema.methods.comparePassword = async function(givePassword){
  return await bcrypt.compare(givePassword , this.password)
}

const User  = mongoose.model("User" , userSchema)

export default User