const express = require("express");
const zod = require("zod");
const {User} =  require("../database/bd");
const jwt = require("jsonwebtoken")
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const {authMiddleware} = require("../middleware/auth");
//first route for the userlogin
const signupzod = zod.object({
    username:zod.string(),
    password:zod.string()
})
router.post("/signup" , async (req,res)=>{
      const x  = req.body;
      const response = signupzod.safeParse(x);

      if(!response.success){
         return res.json({
            msg:"invalid details"
         })
      }

      const a = await User.findOne({
        username:x.username,
      })

      if(a){
        return res.json({
            msg:"user already exist"
      })
      }
    
      const b = await User.create({
        username:x.username,
        password:x.password
      })
      
      const idd = b._id;

      const token = jwt.sign({idd:b._id},JWT_SECRET)

      return res.json({
        msg:"signedup successfully",
        token
      })
})

// second route for the usersignup
const signinzod = zod.object({
    username:zod.string(),
    password:zod.string()
})


router.post("/signin" , async(req,res)=>{
    const x = req.body;
    const response = signinzod.safeParse(x);
    if(!response.success){
        return res.json({
            msg:"invalid signin details"
        })
    }

    const a = await User.findOne({
        username : x.username,
        password:x.password
    })

    if(a){
        
        const token = jwt.sign({idd:a._id},JWT_SECRET);

       return res.json({
        msg:"signedin successfully",token
       })
    }

    return res.json({
        msg:"invalid userdetails"
    })
})

// third route is for user to gets its profile 

router.get("/profile",authMiddleware,async(req,res)=>{
    const userId = req.userId;

   const a=  await User.findOne({userId});

    if(!a){
        return res.json({
            msg:"user does not exist"
        })
    }

    return res.json({
        msg:"use profile fetched successfully",
        a
    })
})


module.exports=router;

