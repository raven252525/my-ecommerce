// handles fetching product objects from MongoDB
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request) {

    await initMongoose();
    //console.log("HIIIII") DEBUG
    const products = await Product.find();
    //console.log(products) DEBUG
    //console.log(dummyProduct) DEBUG
    return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" },
        status: 200
    });
}

