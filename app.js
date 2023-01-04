console.log('Store API');

require('dotenv').config();


const express=require('express');
const app=express();
const port=process.env.PORT || 8000;


// connect to db
const db=require('./config/mongoose');




const notFoundMiddelware=require('./config/not-found');
const errorHandler=require('./config/error-handler');

app.use(express.json());

//routes
app.use('/', require('./routes'));
// app.get('/', (req,res)=>{
//     res.send('<h1>storeApi</h1> <a href="/api/v1/products"></a>')
// });
// app.use('/api', require('./v1/products'));


app.use(notFoundMiddelware);
app.use(errorHandler);


const start= async ()=>{
   
    try {
        
        //await connectDB(process.env.MONGO_URI);
       app.listen(port,console.log(`server listening on port ${port}`)) 
    } catch (error) {
        console.log(error);
    }
}
start()