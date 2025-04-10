'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function thankyou() {
    const [checkoutData, setCheckoutData] = useState(null)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('api/checkout')
    //         console.log(response)
    //         if (!response.ok) {
    //             throw Error("Failedddd")
    //         }
    //         const data = await response.json()
    //         setCheckoutData(data)
    //         setLoading(false)
    //     }
    //     fetchData()
    // }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    const route = useRouter()
    if (!loading) {
        return (
            <div className="relative min-h-screen">
              <h1 className="font-bold">Thank You for Your Order!</h1>
              {checkoutData && (
                <div>
                  <p>Order Summary:</p>
                  <ul>
                    {checkoutData.products.map((product) => (
                      <li key={product._id}>
                        {product.name} - ${product.price}
                      </li>
                    ))}
                  </ul>
                  <p>Subtotal: ${checkoutData.subtotal}</p>
                  <p>Delivery Fee: ${checkoutData.deliveryFee}</p>
                  <p>Total: ${checkoutData.totalAmount}</p>
                </div>
              )}
              <div className="flex">
                <button onClick={() => route.push('/')} className="text-2xl text-white bg-emerald-500 rounded-lg 
                 px-4 py-2 shadow-xl shadow-green-100 absolute bottom-0 left-0.5"  >Return</button>
              </div>
            </div>
          )
    }

}
