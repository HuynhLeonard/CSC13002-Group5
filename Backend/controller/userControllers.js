const express = require('express');
const path = require('path');
const User = require('../model/User.js');
const router = express.Router();
const {upload} = require('../multer.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js")
const ErrorHandler = require("../utils/ErrorHandler.js");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const {isAuthenticated, isAdmin} = require("../middleware/auth.js");
// register a new user
router.post("/create-user", upload.single('file'), async (req,res,next) => {
    try {
        const {name, email, password} = req.body;

        const userMail = await User.findOne({email});

        if(userMail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: "Error deleting file"});
                } else {
                    res.json({message: "File deleted successfully"});
                }
            })
            return next(new ErrorHandler("User already existed!"));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        console.log(fileUrl);

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl,
        };

        const activationToken = createActivationToken(user);

        const activationUrl = `http://localhost:3000/activation/${activationToken}`;
        
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, please click on the link to activate your account ${activationUrl}`
            });

            res.status(201).json({
                success: true,
                message: `Please check your Email to activate your account`
            });
        } catch (err) {
            return next(new ErrorHandler(err.message, 500));
            // return next(new Error("Error"));
        }

        // const newUser = await User.create(user);
        // res.status(201).json({success: true, newUser});
    } catch (err) {
        return next(new ErrorHandler(err.message,400));
    }
});

// create activationToken
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    });
}

// activate user
router.post("/activation", catchAsyncErrors(async(req,res,next) => {
    try {
        const {activation_token} = req.body;

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if(!newUser) {
            return next(new ErrorHandler("Invalid Token", 400)); 
        }

        const {name, email, password, avatar} = newUser;

        let user = await User.findOne({email});

        if(user) {
            return next(new ErrorHandler("User already Exists", 400));
        }

        user = await User.create({
            name,
            email,
            avatar,
            password
        });

        sendToken(user,201,res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}));

router.post("/login-user", catchAsyncErrors(async (req,res,next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return next(new ErrorHandler("Please provide the all fields", 400));
        }

        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorHandler("No account found!", 500));
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) {
            return next(new ErrorHandler("Please provide correct Information", 400));
        }

        sendToken(user, 201, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}));

router.get("/getuser", isAuthenticated ,catchAsyncErrors(async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) {
            return next(new ErrorHandler("User doesn't exists", 400));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}));

// logout
router.get("/logout", catchAsyncErrors(async (req,res,next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(201).json({
            success: true,
            message: "Log out succssful",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// update user info
router.put("/update-user-info", isAuthenticated, catchAsyncErrors(async (req,res,next) => {
    try {
        const {email, password, phoneNumber, name} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) {
            return next(new ErrorHandler("Please provide the correct information", 400));
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

module.exports = router;