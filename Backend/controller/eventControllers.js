const express = require('express');
const router = express.Router();
const fs = require("fs");
const {upload} = require('../multer.js');
const Shop = require("../model/Shop.js");
const Event = require("../model/Event.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const {isSeller,isAdmin,isAuthenticated} = require("../middleware/auth.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

router.post("/create-event", upload.array("images"), catchAsyncErrors(async (req,res,next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if(!shop) {
            return next(new ErrorHandler('Shop Not Found!', 400));
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);

            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;
            
            const saleProduct = await Event.create(eventData);

            res.status(201).json({
                success: true,
                saleProduct
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
    
}));

router.get("/get-all-events", async (req,res,next) => {
    try {
        const events = await Event.find();
        res.status(201).json({
            success: true,
            events
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

// get all events of a specific shop
router.get("/get-all-events/:id", async (req,res,next) => {
    const shopId = req.params.id;

    const shop = await Shop.findById(shopId);

    if(!shop) {
        return next(new ErrorHandler("Shop not found!", 400));
    }

    const shopEvents = await Event.find({shopId: shopId});

    res.status(201).json({
        success: true,
        shopEvents
    })
});

router.delete("/delete-shop-event/:id",catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id;

        const eventData = await Event.findById(productId);

        eventData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });

        const event = await Event.findByIdAndDelete(productId);

        if (!event) {
            return next(new ErrorHandler("Event not found with this id!", 500));
        }

        res.status(201).json({
            success: true,
            message: "Event Deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

router.get('/admin-all-events', isAuthenticated, isAdmin('Admin'), catchAsyncErrors(async (req,res,next) => {
    try {
        const events = await Event.find().sort({createdAt: -1});

        res.status(201).json({
            success: true,
            events
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router;