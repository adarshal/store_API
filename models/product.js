const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provide']
        //unique: true
    },
    available: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'product price must be provide']
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    company: {
        type: String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message: '{VALUE} is not supported' //only one of above array val is supported else give error
        }
    },
  },{
    timestamps: true // to know when user was created when was updated
  });




  const Product=mongoose.model('Product',ProductSchema);
//This is coolection, collection contain docs,docs contains fields like name,date. collectn name start capital
module.exports =Product;