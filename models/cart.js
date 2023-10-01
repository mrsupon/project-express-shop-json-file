import fs from "fs";
import Product from "./product.js";

class Cart{
    static data = Cart.find() ;
    constructor(products, totalPrice) {
        this.products = products ;
        this.totalPrice = parseFloat(totalPrice);
    }

    static save(){   
        fs.writeFile((new URL('../database/cart.json', import.meta.url)) , JSON.stringify(Cart.data), (error)=>{
            if(!error)
                console.log("Save File Sucessfully.");
            else
                console.log(error); 
        });
    }

    static find(){
        fs.readFile(new URL('../database/cart.json', import.meta.url),(error, foundData)=>{
            if(!error){ 
               Cart.data = JSON.parse(foundData);               
            }
            else{   
                console.log("Data is empty.")
                Cart.data = {products:[], totalPrice:0};
                fs.writeFile((new URL('../database/cart.json', import.meta.url)) , JSON.stringify(Cart.data), (error)=>{
                    if(!error)
                    console.log("Save File Sucessfully.");
                else
                    console.log(error);
                });
            }
        });
        return Cart.data ; 
    }

    static findProductById(id){ 
        return Cart.data.products.find(product =>(product.id === id));
    }

    static findProductIndex(id){
        return Cart.data.products.findIndex(product =>(product.id === id))  ;
    }

    static deleteProductById(id){
        const index = Cart.findProductIndex(id);
        Cart.data.products.splice(index, 1) ;
    }

    static joinWithProduct( ){ 
        const joinedCart = Cart.data ; 
        let sum = 0.0;
        joinedCart.products = Cart.data.products.map((product, index)=>{
            const foundProduct = Product.findById(product.id) ;
            if(foundProduct){
                let total = product.qty*foundProduct.price;
                sum += total;
                return {...product, title:foundProduct.title, price:foundProduct.price, total:total};                 
            }
            else{
                return  {id:product.id, qty:0, title:'out of stock', price:0.0, total:0.0}                  
            }
        });
        joinedCart.totalPrice = sum; console.log(joinedCart);
        return joinedCart;
    }


}

export default Cart ;