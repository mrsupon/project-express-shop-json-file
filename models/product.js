import fs from "fs";
import Utility from "../utils/utility.js";

class Product{
    static data = this.find();
    constructor(title, imageUrl, description, price) {
        this.id = Utility.getUID();
        this.title = title ;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){ 
        Product.data.push(this); 
        fs.writeFile((new URL('../database/products.json', import.meta.url)) , JSON.stringify(Product.data), (error)=>{
        if(!error)
                console.log("Save products.json Sucessfully.");
            else
                console.log(error);
        });
    }
    static find(){
        fs.readFile(new URL('../database/products.json', import.meta.url),(error, foundData)=>{
            if(!error){ 
               Product.data = JSON.parse(foundData);               
            }
            else{   
                console.log("Products is empty.")
                Product.data = [];
                fs.writeFile((new URL('../database/products.json', import.meta.url)) , JSON.stringify(Product.data), (error)=>{
                    if(!error)
                    console.log("Save products.json Sucessfully."); 
                else
                    console.log(error);
                });
            }
        });
        return Product.data ; 
    }

    static findById(id){
        return Product.data.find(product =>(product.id === id));
    }

    static findByIdex(id){
        return Product.data.findIndex(product =>(product.id === id))  ;
    }

    static update(){
        fs.writeFile((new URL('../database/products.json', import.meta.url)) , JSON.stringify(Product.data), (error)=>{
            if(!error)
                console.log("Save File Sucessfully.");
            else
                console.log(error);
        });
    }

    static deleteById(id){
        const index = Product.findByIdex(id); 
        Product.data.splice(index,1);
    }
    
}

export default Product;