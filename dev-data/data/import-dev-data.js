const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
dotenv.config({ path: './../../config.env' });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => console.log('Databse Connected Successfully!!!...'));

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log(tours);
        console.log('data added successfully.');
    } catch (err) {
        return err;
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted successfully.')
        process.exit()
    }
    catch(err){
        return err;
    }
    
}

if(process.argv[2] === '--import'){
    importData();
}
if(process.argv[2] === '--delete'){
    deleteData();
}






