import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

export async function POST(request) {
  await initMongoose();

  // Parse the URL-encoded form data
  const formData = await request.text(); // Read the raw text
  const parsedData = Object.fromEntries(new URLSearchParams(formData)); // Convert to an object

  console.log("Parsed Data:", parsedData);

  const { address, city, name, email, products } = parsedData;

  if (!address || !city || !name || !email || !products) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Calculate the total (example logic)
  const productIds = products.split(",");
  const deliveryFee = 5;
  let subtotal = 0;

  try {
    const productDetails = await Promise.all(
      productIds.map(async (id) => {
        const product = await Product.findById(id);
        if (product) subtotal += product.price;
        return product;
      })
    );

    const totalAmount = subtotal + deliveryFee;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    return new Response(
      JSON.stringify({
        message: "Checkout processed successfully",
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        products: productDetails,
        subtotal,
        deliveryFee,
        totalAmount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing checkout:", error);

    return new Response(
      JSON.stringify({ error: "Failed to process checkout" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}