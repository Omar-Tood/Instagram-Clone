import User from '../models/User.js'

export const registerUser = async(req,res, next) =>{
    try{
      
        const {username , password , email} = req.body

        const isUserExists  = await User.findOne({
          $or:[
            {email: email.toLowerCase()},
            {password: password.toLowerCase()},
          ]
        });

        if(isUserExists){
          if(isUserExists.email === email.toLowerCase()){
          return res.status(400).send("Email already exist")
          }
          if(isUserExists.username === username.toLowerCase()){
            return res.status(400).send("username already exists")
          }
        }

        const userInfo  = new User({
          username,
          email,
          password
        })

        await userInfo.save()

        res.status(201).send(userInfo)


    }catch(err){
      console.log("Error at User RegisterUser", err)
      res.status(400).send("Error at user registerUser")
    }
}