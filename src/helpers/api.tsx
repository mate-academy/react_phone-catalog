

export function getProducts (): Promise<[]>  {

  return fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
  .then(products => {
    return products.json()})
}


