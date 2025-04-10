'use client'
import { useRouter } from "next/navigation";

export default function Thanks() {
    
    const route = useRouter()
    return (
        <div className="relative min-h-screen">
            <h1 className="font-bold">Thank You for Your Order!</h1>
                <div className="justify-center text-3xl font-bold bg-emerald-200 text-black">
                <p>Order Summary:</p>
                </div>
            <div className="flex">
                <button onClick={() => route.push('/')} className="text-2xl text-white bg-emerald-500 rounded-lg 
                px-4 py-2 shadow-xl shadow-green-100 absolute bottom-0 left-0.5"  >Return</button>
            </div>
        </div>
    )
}