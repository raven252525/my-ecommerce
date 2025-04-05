import mongoose from "mongoose";


export async function initMongoose() {
    //console.log(mongoose.connection.readyState) DEBUG
    if (mongoose.connection.readyState === 1) {
         return mongoose.connection.asPromise()
    }// guard clause
    //uses mongodb URL
    return await mongoose.connect(env.process.MONGODB_URL)
}

//directly connects to MongoDB, secret db key in .env