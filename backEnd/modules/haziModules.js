const db = require('../connections/heroku-pg')

const getAllProductsHazi=()=>{
    return db('hazi')
    .select('*')

}



const insertProductsHazi=(products)=>{
    return db('hazi')
    .insert(products)
}





const delAllHazi=()=>{
    return db('hazi')
    .del()
    

}





module.exports={
    getAllProductsHazi,
    insertProductsHazi,
    delAllHazi

}