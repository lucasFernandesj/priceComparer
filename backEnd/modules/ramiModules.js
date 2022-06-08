const db = require('../connections/heroku-pg')

const getAllProductsRami=()=>{
    return db('rami_lewy')
    .select('*')

}

const insertProductRami=(products)=>{
    return db('rami_lewy')
    .insert(products)
}

const delAllRami=()=>{
    return db('rami_lewy')
    .del()
   

}


module.exports={
    getAllProductsRami,
    insertProductRami,
    delAllRami

}