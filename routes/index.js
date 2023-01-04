const express =require('express');
const router = express.Router()
console.log('Router loaded');

router.get('/', (req,res)=>{
    res.send('<h1>storeApi</h1> <a href="/api/v1/products"></a>')
});
router.use('/api', require('./api') );
module.exports = router;