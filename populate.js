require('dotenv').config();
const db=require('./config/mongoose');
const Product=require('./models/product');
// const mongoose=require('mongoose')
const jsonProducts=require('./products.json');


const start= async()=>{
    try {
       await Product.deleteMany();
    //    let product = await Product.create({
    //     name: 'Adarsh',
    //     price: '10'
    // });
    await Product.create(jsonProducts);
        console.log("products added!!");

        process.exit(0); // after adding products we dont want nodemon calling this again n again
    } catch (error) {
        console.log(error,"err in populate");
        process.exit(1);
    }
}


start() //npm populate it will add products to db(!it 1st delete all old ones. if you dont want delte old one modify)