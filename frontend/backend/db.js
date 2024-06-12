const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Foodie:19may2002@cluster0.d5aogrz.mongodb.net/Foodie?retryWrites=true&w=majority";

const mongodb= async ()=>{
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('db Connected');

        let fetched_data = mongoose.connection.db.collection("food_items");
        let data = await fetched_data.find({}).toArray(); // Use await here to wait for the data

        let foodCategory = mongoose.connection.db.collection("food_Category");
        let Categorydata = await foodCategory.find({}).toArray(); // Use await here to wait for the data

        global.food_items = data;
        global.foodCategory = Categorydata;

        // console.log(global.foodCategory);
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};

module.exports = mongodb;