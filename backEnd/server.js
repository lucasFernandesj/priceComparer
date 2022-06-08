const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
// const cron = require("node-cron");
// const {scrapeHazi} = require('./scrapeProducts/scrapeHazi')
// const {scrapeRami} = require('./scrapeProducts/scrapeRami')
// const {scrapeYBitan} = require('./scrapeProducts/scrapeYbitan')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(process.env.PORT|| 5000 , ()=>{
    console.log(`listening`)
})

const {getAllProductsRami, insertProductRami , delAllRami} = require('./modules/ramiModules');
const {getAllProductsHazi, insertProductsHazi, delAllHazi } = require('./modules/haziModules');
const {getAllProductsYbitan, insertProductsYbitan, delAllYbitan} = require('./modules/yBitanModules');

//************* GENERIC ****************
//works
app.get('/test' , (req , res)=>{
    res.send('works')
})
//works
app.get('/:id' , (req , res)=>{
    res.json(req.params)
})

//works
app.post('/test' , (req,res)=>{
    res.json({"msg":"works"})
})

//**********RAMI LEWY*************

//get all products ramiLewy
//works
app.get('/api/productsRami' , (req  ,res)=>{
    getAllProductsRami()
    .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));

})

//delete all rami_lewy

app.delete('/api/productsRami' , (req , res)=>{
    delAllRami()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({msg:err.message})
    })
})



app.post('/insertRami/:name/:price' , (req , res)=>{
    insertProductRami(req.params)
    .insert({
        name: req.body.name,
        price: req.body.price
    })
    .catch((err) => console.log(err));
})




//***********HAZI HINAM **************** */

app.get('/api/productsHazi' , (req  ,res)=>{
    getAllProductsHazi()
    .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));

})

app.post('/insertRami' , (req , res)=>{
    insertProductRami(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json({msg:err.message})
    })
})


//**************************Ybitan*********************** */

app.get('/api/productsYbitan' , (req , res)=>{
    getAllProductsYbitan()
    .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
})


/////////////SCRAPE PRODUCTS ONCE A DAY
// cron.schedule('* * 4 * *', () => {
//     scrapeHazi()
//     scrapeRami()
//     scrapeYBitan()
   
//   });

