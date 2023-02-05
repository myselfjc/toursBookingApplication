const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' }); 



mongoose.connect(process.env.DATABASE_LOCAL).then(()=> console.log('Databse Connected Successfully!!!...'));





// console.log(process.env);   process.env.DATABASE_LOCAL

// newTour.save().then(doc=>console.log(doc)).catch(err=>console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('server is running...');
});


