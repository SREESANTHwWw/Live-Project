const Productmodel = require("../Model/Productmodel");
const express = require("express");
const router = express.Router();
const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncErr = require("../Middlewares/CatchAsyncError");
const products = require("../Controllers/AdminControllers");
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const CartModel = require("../Model/CartModel");
const { default: mongoose } = require("mongoose");

router.get(
  "/get-products",
  CatchAsyncError(async (req, res, next) => {
    try {
      const product = await Productmodel.find();
      res.status(201).json({ product });
    } catch (error) {
      return new ErrorHandler("Product is Not Found ");
    }
  })
);

router.get(
  "/get-products/:id",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { id: Product_id } = req.params;

      const GetcategoryProuduct = await Productmodel.find({
        categoryProduct: Product_id,
      });
      res.status(201).json({ msg: "success", GetcategoryProuduct });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id); //pass file id means _id

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({
      filename: file.filename,
      fileUrl: file.fileUrl,
      uploadedAt: file.uploadedAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving file", error: err.message });
  }
});

router.post(
  "/addToCart",
  CatchAsyncError(async (req, res, next) => {
    try {
      const {
        userId,
        Product_id,
        minimum_order_quantity,
        productname,
        product_img,
        price,
        description,
        mRP
      } = req.body;

      // Check if the product exists in the database
      const Product = await Productmodel.findById(Product_id);
      if (!Product) {
        return res.status(404).json({ msg: "Product Not Found" });
      }

      // Find the user's cart
      let cart = await CartModel.findOne({ userId });

      // If cart doesn't exist, create a new cart
      if (!cart) {
        cart = new CartModel({
          userId,
          items: [
            {
              Product_id,
              minimum_order_quantity,
              productname,
              product_img,
              description,
              price,
              mRP
            },
          ],
        });
      } else {
        // Check if the product is already in the cart
        const productIndex = cart.items.findIndex(
          (item) => item.Product_id.toString() === Product_id
        );

        if (productIndex !== -1) {
          return res
            .status(400)
            .json({ msg: "Product is already in your cart" });
        }

        // Add new product to the cart
        cart.items.push({
          Product_id,
          minimum_order_quantity,
          productname,
          product_img,
          description,
          price,
          mRP
        });
      }

      // Save the updated cart
      await cart.save();
      return res.status(201).json({ cart });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


router.get(
  "/getAll-cart/:userId",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: "Invalid userId format" });
      }

      const getCart = await CartModel.findOne({ userId });

      if (!getCart) {
        return res.status(404).json({ msg: "Cart not found for this user" });
      }

      res.status(200).json({ msg: "Success", cart: getCart });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// router.delete('/removeFromcart/:userId/:Product_id',CatchAsyncError(async(req,res,next)=>{
//   try {
//     const {userId, Product_id} = req.params

//     const cart = await CartModel.findOne({userId})
//     if(!cart){
//       return res.status(404).json({msg:"Cart Not Available"})
//     } 
//     const cartLength = cart.items.length
//     cart.items = cart.items.filter((item)=> item.Product_id.toString() !==Product_id) 

//     if(cart.items.length === cartLength){
//       return res.status(404).json({ msg: "Product not found in cart" })

//     }

//  await cart.save()
//  return res.status(200).json({
//           msg: "Product removed from cart",
//           cart,
//         });
    
//   } catch (error) {
//     return next(new ErrorHandler(error.message,400))
    
//   }
// }))

router.delete(
  "/removeFromCart/:userId/:Product_id",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { userId, Product_id } = req.params;

      // Find the user's cart
      const cart = await CartModel.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ msg: "Cart not found" });
      }

      // Filter out the product to be removed
      const initialLength = cart.items.length;
      cart.items = cart.items.filter(
        (item) => item.Product_id.toString() !== Product_id
      );

      // Check if any product was actually removed
      if (cart.items.length === initialLength) {
        return res.status(404).json({ msg: "Product not found in cart" });
      }

      // Save the updated cart
      await cart.save();

      return res.status(200).json({
        msg: "Product removed from cart",
        cart,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);



module.exports = router;
