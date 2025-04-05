"use client"
import Layout from "@/components/Layout"
import { ProductsContext } from "@/components/ProductsContext"
import { useContext, useEffect, useState } from "react"

export default function CheckOutPage() {
    const {selectedProducts} = useContext(ProductsContext)
    const [productInfo, setProductInfo] = useState([])
    useEffect(() => {
        const uniqueIds = [...new Set(selectedProducts)]
        fetch('/api/products?ids='+uniqueIds.join(','))
        .then(response => response.json())
        .then(json => setProductInfo(json))
    }, [selectedProducts])
    return (
        <Layout>
            {selectedProducts.join(',')}
        </Layout>
    )
}