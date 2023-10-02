import Product from "../../models/product.js"

class ProductController{

    static index(req, res){
        Product.find()
        .then( ([rows, schema]) => {
            res.render('shops/products/index.ejs', {
            prods: rows ,
            pageTitle: 'Products in shop',
            path: '/shops/products'
        });
        })
        .catch( err=>console.log(err) );
    }

    static show(req, res){
        let id = req.params.id ; 
        Product.findById(id)
        .then(([rows, schema])=>{ 
            res.render('shops/products/show.ejs', {
                prods: rows[0] ,
                pageTitle: 'Product Details',
                path: ''
            });
        })
        .catch( err=>console.log(err) );
    }

}

export default ProductController;