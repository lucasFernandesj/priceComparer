// const knex = require('knex')
const dotenv = require('dotenv')

dotenv.config();

// const db = knex({
//     client:'pg',
//     connection:{
//         host:process.env.DB_HOST,
//         port:process.env.DB_PORT,
//         user:process.env.DB_USER,
//         password:process.env.DB_PASSWORD,
//         database:process.env.DB_NAME,
//         ssl:{rejectUnauthorized:false}
//     }
// })


//Trying locally if heroku doesnt work...
const db = require("knex")({
    client: 'pg',
    
    connection: {
        port:'5432',
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Victorjobe10',
      database: 'hackathon2',
    },
  });




module.exports = db