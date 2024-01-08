const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const Shop = require("../model/Shop.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const {isSeller} = require("../middleware/auth.js");
const CoupounCode = require("../model/coupounCode.js");
const router = express.Router();

router.post("/create-coupoun-code", isSeller, catchAsyncErrors(async (req,res,next) => {
    try {
        const isCoupounCodeExists = await CoupounCode.find({
            name: req.body.name
        });

        if(isCoupounCodeExists.length !== 0) {
            return next(new ErrorHandler("Coupoun code already exists!", 400));
        }

        console.log(req.body);

        const coupounCode = await CoupounCode.create(req.body);

        res.status(201).json({
            success: true,
            coupounCode
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// get all coupouns code of a shop
router.get("/get-coupoun/:id", isSeller, catchAsyncErrors(async (req,res,next) => {
    try {
        const coupounCodes = await CoupounCode.find({shopId: req.seller.id});
        res.status(201).json({
            success: true,
            coupounCodes
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

router.delete("/delete-coupoun/:id", isSeller, catchAsyncErrors(async (req,res,next) => {
    try {
        const coupounCode = await CoupounCode.findByIdAndDelete(req.params.id);

        if(!coupounCode) {
            return next(new ErrorHandler("Coupoun code doesn't exists!",400));
        }

        res.status(201).json({
            success:true,
            message: "Coupoun code deleted successfully",
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// get coupoun by name
router.get("/get-coupoun-value/:names", catchAsyncErrors(async (req,res,next) => {
    try {
        const coupounCode = await CoupounCode.findOne({name: req.params.names});

        res.status(200).json({
            success: true,
            coupounCode
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))

module.exports = router;