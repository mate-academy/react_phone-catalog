import { ProductDetails } from "../interfaces"


export function getProducts (): Promise<[]>  {

  return fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
  .then(products => {
    return products.json()})
}

export function getDetails (productId: string):Promise<ProductDetails> {
  return fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`)
  .then(productDetails => {
    return productDetails.json()})
}


