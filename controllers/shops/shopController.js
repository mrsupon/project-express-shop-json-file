import Product from "../../models/product.js"

class ShopController{

    static index(req, res){
        res.render('shops/index.ejs', {
            prods: Product.find() ,
            pageTitle: 'Shop',
            path: '/'
        });
}

}

export default ShopController;