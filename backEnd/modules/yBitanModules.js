const db = require('../connections/heroku-pg')

const getAllProductsYbitan=()=>{
    return db('ybitan')
    .select('*')

}




const insertProductsYbitan=(products)=>{
    return db('ybitan')
    .insert(products)
}

const delAllYbitan=()=>{
    return db('ybitan')
    .del()
    

}


module.exports={
    getAllProductsYbitan,
    insertProductsYbitan,
    delAllYbitan
}