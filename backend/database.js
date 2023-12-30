const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI

const mongoDB = async () => {
    try{
        await mongoose.connect(mongoURI,{ useNewUrlParser: true });
        console.log("Connected to mongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        //console.log(fetched_data)
        global.food_items = await fetched_data.find({}).toArray()

        const foodCategory = await mongoose.connection.db.collection("food_categories");
        global.getFoodCategory = await foodCategory.find({}).toArray()

    } catch(err){
        console.log('Error : ',err);
    }
}

module.exports = mongoDB();