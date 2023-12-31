const express = require('express');
const {isSeller, isAuthenticated, isAdmin} = require('../middleware/auth.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/Product.js");
const Shop = require("../model/Shop.js");
const Order = require('../model/Order.js')
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

router.post('/create-product', upload.array("images"), catchAsyncErrors(async (req,res,next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if(!shop) {
            return next(new ErrorHandler('Shop Id is invalid!', 400))
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;

            const product = await Product.create(productData);

            res.status(201).json({
                success: true,
                product,
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}));

// get product of a shop
router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req,res,next) => {
    try {

        const id = req.params.id;
        // check validation
        const shop = await Shop.findById(id);
        if(!shop) {
            return next(new ErrorHandler("Shop not existed!", 400));
        }

        const products = await Product.find({shopId: req.params.id});

        res.status(201).json({
            success: true,
            total: `${Object.keys(products).length} products`,
            products,
        });
    } catch(error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// get all products 
router.get("/get-all-products", catchAsyncErrors(async (req,res,next) => {
    try {
        const products = await Product.find().sort({createdAt: -1});

        res.status(200).json({
            success: true,
            total: `${Object.keys(products).length} products`,
            products
        })
    } catch (error) {
        return next(new ErrorHandler(error,404));
    }
}))

router.delete("/delete-shop-product/:id", isSeller, catchAsyncErrors(async (req,res,next) => {
    try {
        const productId = req.params.id;
        
        const productData = await Product.findById(productId);

        // unlink all images
        productData.images.forEach((image) => {
            const filename = image;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (error) => {
                if(error) {
                    console.log(error);
                }
            })
        });

        const product = await Product.findByIdAndDelete(productId);

        if(!product) {
            return next(new ErrorHandler("Product not found with this Id!", 500));
        }

        res.status(201).json({
            success: true,
            message: 'Product deleted Successfully'
        })
    } catch (error) {
        return next(new ErrorHandler(error,400));
    }
}));

router.put('/create-new-review', isAuthenticated, catchAsyncErrors(async (req,res,next) => {
    try {
        const {user, rating, comment, productId, orderId} = req.body;

        const product = await Product.findById(productId);

        const review = {
            user,
            rating,
            comment,
            productId
        };

        // check whether a user haved review or not, then we can push more review to their account
        const isReviewed = product.reviews.find((rev) => rev.user._id === rev.user._id);

        if(isReviewed) {
            product.reviews.forEach((rev) => {
                if(rev.user._id === req.user._id) {
                    (rev.rating = rating),
                    (rev.comment = comment),
                    (rev.user = user)
                }
            });
        } else {
            product.reviews.push(review);
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters: [{ "elem._id": productId }], new: true }
        );      

        res.status(200).json({
            success: true,
            message: "Reviwed succesfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

router.get("/admin-all-products",isAuthenticated,isAdmin("Admin"),catchAsyncErrors(async (req, res, next) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            products,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router;