const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://mishra07aayush:Golu2001@cluster0.n23hrem.mongodb.net/rasoi?retryWrites=true&w=majority'

const mongoDB = async () => {
    try{
        await mongoose.connect(mongoURI,{ useNewUrlParser: true });
        console.log("Connected to mongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        global.food_items = await fetched_data.find({}).toArray()

        const foodCategory = await mongoose.connection.db.collection("food_categories");
        global.getFoodCategory = await foodCategory.find({}).toArray()

    } catch(err){
        console.log('Error : ',err);
    }
}

module.exports = mongoDB();