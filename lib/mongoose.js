import mongoose from "mongoose";

export async function initMongoose() {
    //console.log(mongoose.connection.readyState) DEBUG
    if (mongoose.connection.readyState === 1) {
         return mongoose.connection.asPromise()
    }// guard clause
    //uses mongodb URL
    return await mongoose.connect("mongodb+srv://raven252525:My5009006fms@cluster0.cusj9ii.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0")
}

//directly connects to MongoDB, secret db key in .env