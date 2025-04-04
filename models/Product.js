import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema( {
    name: String,
    description: String,
    price: Number,
    category: String,
    picture: String,
}, { collection: "Products"})

const Product = models?.Product || model('Product', ProductSchema)

export default Product

//defines the object, with the schema(fields)