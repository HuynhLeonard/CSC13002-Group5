const express = require('express');
const {isSeller} = require('../middleware/auth.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product.js");
const Shop = require("../model/Shop.js");
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
        const products = await Product.find();

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

module.exports = router;