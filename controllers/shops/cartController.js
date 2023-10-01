import Product from "../../models/product.js";
import Cart from "../../models/cart.js";
import Utility from "../../utils/utility.js";

class CartController{

    static index(req, res){
        const joinedCart = Cart.joinWithProduct();
        res.render('shops/carts/index.ejs', { 
        cart: joinedCart ,
        pageTitle: 'Cart',
        path: '/shops/carts'
        })
    }

    static store(req, res){
        const productId = req.body.productId;  
        const productPrice = (Product.findById(productId)).price; 
        const newProduct = {id:productId, qty:1};
    
        const foundProduct = Cart.findProductById(productId);   
        if(foundProduct){
            const index = Cart.findProductIndex(productId); 
            Cart.data.products[index].qty += 1 ;
        }
        else{
            Cart.data.products = [...Cart.data.products, newProduct];
        }
        Cart.data.totalPrice += parseFloat(productPrice);
        +(parseFloat(Cart.data.totalPrice).toFixed(2));
        Cart.save();

        res.redirect('/shops/carts');
    } 

    static destroy(req, res){ 
        Cart.deleteProductById(req.params.id);
        Cart.save();
        res.redirect("/shops/carts");
    } 
}

export default CartController;