import { ProductDetails } from "../interfaces"

const baseURL = "https://mate-academy.github.io/react_phone-catalog/api"

export function getProducts(): Promise<[]> {
  return fetch(baseURL + '/products.json')
    .then(products => {
      return products.json()
    })
    .catch(() => {
      return false;
    })
}

export function getDetails(productId: string): Promise<ProductDetails> {
  return fetch(baseURL + `/products/${productId}.json`)
    .then(productDetails => {
      return productDetails.json()
    })
}


