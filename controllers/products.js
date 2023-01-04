const Product=require('../models/product');


const getAllProductsStatic= async (req,res) =>{
    // throw new Error('testing asysnc error,use of middleware err-handler');
    const products = await Product.find({}).select('name price');
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts= async (req,res) =>{

    const { available, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
  
    if (available) {
      queryObject.available = available === 'true' ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }; //regex will show similar named products like name. option i means ignor case
    }
    console.log('all prod',req.query);
    let result =   Product.find(queryObject);
    if(sort){
        const sortListBy= sort.split(',').join(' '); //user may want to sort by many values those value will comma sep , to sort using mongo we need space
        result=result.sort(sortListBy);
    }else{
        result=result.sort({ createdAt: 'desc'});
    }

    if(fields){
        const selectFiledsToShow= fields.split(',').join(' '); //user may want only some key(like name & price only) not entire object
        result=result.select(selectFiledsToShow);
    }

    const products=await result;// it wll wait till mongo find and sort it

    // res.status(200).json({msg:'products  route'})
    res.status(200).json({products, nbHits: products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}