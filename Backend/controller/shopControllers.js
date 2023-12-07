const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const {isAuthenticated,isSeller} = require("../middleware/auth.js");
const {upload} = require("../multer.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const sendShopToken = require("../utils/shopToken.js");

const Shop = require("../model/Shop.js");
const Product = require("../model/Product.js");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
    try {
        const { email } = req.body;
        const sellerEmail = await Shop.findOne({ email });
        if (sellerEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
            }
        });
            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: fileUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
        };

        const activationToken = createActivationToken(seller);

        const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

        try {
            await sendMail({
                email: seller.email,
                subject: "Activate your Shop",
                message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `please check your email:- ${seller.email} to activate your shop!`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

  // create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

router.post("/activation", catchAsyncErrors(async (req,res,next) => {
    try {
        const {activationToken} = req.body;
        const newSeller = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
        if(!newSeller) {
            return next(new ErrorHandler("Invalid Token", 400));
        }
        const {name, email, password, avatar, zipCode, address, phoneNumber} = newSeller;
    
        const seller = await Shop.findOne({email});

        if(seller) {
            return next(new ErrorHandler("User already exists", 400));
        }

        seller = await Shop.create({name, email, avatar, password, zipCode, address,phoneNumber});
        
        sendShopToken(seller, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

router.post("/login-shop", catchAsyncErrors(async (req,res,next) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return next(new ErrorHandler("PLease provide all the fields", 400))
        }

        const user = await Shop.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorHandler("User doesn't exits!", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) {
            return next(new ErrorHandler("Please provide the correct information",400));
        }

        sendShopToken(user, 201,res);
    } catch (error) {
        return next(new ErrorHandler(error.message,400));
    }
}));

// getSeller
router.get("/getSeller", isSeller, catchAsyncErrors(async (req,res, next) => {
    try {
        const seller = await Shop.findById(req.seller._id);

        if(!seller) {
            return next(new ErrorHandler("User doesn't exists", 400));
        }

        res.status(200).json({
            success: true,
            seller,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// shop logout
router.get("/logout", catchAsyncErrors(async (req,res,next) => {
    try {
        // reset the cookie to log out
        res.cookie("seller_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        
        res.status(201).json({
            success: true,
            message: "Log out successful!"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// get shop id
router.get("/get-shop-info/:id", catchAsyncErrors(async (req,res,next) => {
    try {
        const shop = await Shop.findById(req.params.id);
        
        if(!shop) {
            res.status(201).json({
                success: false,
                shop
            });
        }

        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,400));
    }
}));

router.delete("/delete-shop/:id", catchAsyncErrors(async (req,res,next) => {
    const shopId = req.params.id;

    await Product.deleteMany({shopId: shopId});

    await Shop.findByIdAndDelete(shopId);

    res.status(200).json({
        success: true,
        message: "Shop has been delete with its prorducts"
    })
}))

module.exports = router;