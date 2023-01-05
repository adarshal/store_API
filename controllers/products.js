const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing asysnc error,use of middleware err-handler');
  const products = await Product.find({ price: { $gt: 30 } }).sort('-price').select('name price').skip(1).limit(10);
  res.status(200).json({ products, Number_of_productHits: products.length });
}

const getAllProducts = async (req, res) => {

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
  console.log('all prod', req.query);
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

   
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filterFields = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // eg. numericFilters: price>30, then after above replce it will be price-$gt-30
    const options = ['price', 'rating'];
    filterFields = filterFields.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-'); //eg [price $gt 30]
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    // console.log(filterFields)

  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortListBy = sort.split(',').join(' '); //user may want to sort by many values those value will comma sep , to sort using mongo we need space
    result = result.sort(sortListBy);
  } else {
    result = result.sort({ createdAt: 'desc' });
  }

  if (fields) {
    const selectFiledsToShow = fields.split(',').join(' '); //user may want only some key(like name & price only) not entire object
    result = result.select(selectFiledsToShow);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10 //per page limit, by default value is 10;
  const offset = (page - 1) * limit;
  result = result.skip(offset).limit(limit);
  // if there are 100 products , and if page given is 2 and limit is 10, it will crete per page 10 products. 
  //and as page is 2 & limit 10 ,it will show 10 products of page 2.Other eg if products are 23, page is 2 nad limit is 13 ,then there will be 13 prod on 1st and 10 on 2nd pg.This will show 10 products from 2nd page

 


  const products = await result;// it wll wait till mongo find and sort it

  // res.status(200).json({msg:'products  route'})
  res.status(200).json({ products, Number_of_productHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}