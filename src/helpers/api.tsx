

export function getProducts (): Promise<[]>  {

  return fetch('/api/products.json')
  .then(products => {
    return products.json()})
}
