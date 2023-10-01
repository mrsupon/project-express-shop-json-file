import Product from "../../models/product.js";

class OrderController{

    static index(req, res){  
        res.render('shops/orders/index.ejs', {
        prods: Product.find() ,
        pageTitle: 'Order',
        path: '/shops/orders'
        })
    }

    static store(req, res){
        
    }
}

export default OrderController;