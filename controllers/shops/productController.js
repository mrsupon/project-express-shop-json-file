import Product from "../../models/product.js"

class ProductController{

    static index(req, res){
        res.render('shops/products/index.ejs', {
            prods: Product.find() ,
            pageTitle: 'Products in shop',
            path: '/shops/products'
        });
    }

    static show(req, res){
        let id = req.params.id ; 
        res.render('shops/products/show.ejs', {
            prods: Product.findById(id) ,
            pageTitle: 'Product Details',
            path: ''
        });
    }

}

export default ProductController;