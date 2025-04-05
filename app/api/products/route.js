// handles fetching product objects from MongoDB
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request) {

    await initMongoose();

    const { searchParams } = new URL(request.url)
    const idsParam = searchParams.get("ids")

    let products
    if (idsParam) {

        products = await Product.find({_id:{$in:idsParam.split(',')}})
    } else {
        products = await Product.find()
    }


    return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" },
        status: 200
    })
}

