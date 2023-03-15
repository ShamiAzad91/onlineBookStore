import express from "express";
import formidable from "express-formidable";

const router = express.Router();
//middlewares
import { requireSignin, isAdmin } from "../middleware/auth.js";

//controllers
router.get('/product/photo/:productId',photo);
import { create, list, read,photo ,remove, update,filteredProducts
    ,productsCount,listProducts,productSearch,relateProducts,getToken,
    processPayment,
    OrderStatus

 } from "../controllers/product.js";

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get('/products',list)
router.get('/product/:slug',read);
router.get('/product/photo/:productId',photo);
router.delete('/product/:productId',requireSignin, isAdmin, remove);
router.put('/product/:productId',requireSignin, isAdmin,formidable(), update);
router.put('/product/:productId',requireSignin, isAdmin,formidable(), update);
router.post('/filtered-products',filteredProducts);
router.get("/products-count",productsCount)
router.get("/list-products/:page",listProducts)
router.get("/products/search/:keyword",productSearch);
router.get("/related-products/:productId/:categoryId",relateProducts);

router.get("/braintree/token",getToken);
router.post("/braintree/payment",requireSignin,processPayment);
router.put('/order-status/:orderId',requireSignin,isAdmin,OrderStatus)








export default router;
