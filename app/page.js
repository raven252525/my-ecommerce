'use client'

import Product from "@/components/ProductC"
import { useEffect, useState } from "react"

export default function Home() {
  //state to load products, and sort them
  const [productsInfo, setProductInfo] = useState([])
  //state to search for products
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    fetch('/api/products')
    .then(response => response.json())
    .then(json => setProductInfo(json))
  }, []) // empty arr so run when page loads
  
  //loading categories into array, and usig set to avoid
  // duplicates, and using spread syntax to revert to array
  const categoriesNames = [... new Set(productsInfo.map(p => p.category))]
  //console.log(categoriesNames)

  let products;
  if (phrase) {
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase.toLocaleLowerCase()))
  } else {
    products = productsInfo
  }

  //NOTE- IF NOT DONE, TRY TO ENABLE SEARCH BY CATGEORY
  //didnt want to deal with relabeling category labtop to tabtops, so just did a conditional statement
  return (
    <div className="p-5">
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." 
      className="bg-gray-100 w-full py-2 px-4 rounded-xl "/>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            {products.find(p => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName !== 'labtop' ?categoryName : categoryName + 's' }</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hidden">{products.filter(p => p.category === categoryName).map(productInfo => (
                <div key={productInfo._id} className="px-5 snap-start" >
                  <Product {...productInfo}/>
                </div>
              ))}
            </div>                
          </div>
            )}
          </div>
        ))}
      </div>

        <footer className='' >navigation</footer>

    </div>
  )
}