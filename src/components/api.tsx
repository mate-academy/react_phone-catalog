import { Card } from '../interfaces/Card'

const BASE_URL: string = 'https://mate-academy.github.io/react_phone-catalog/api/';

export const getProductsById = async (idArr: string[]) => {
  let allProducts: Card[] = [];

  await getProducts().then((response) => allProducts = response)

  return allProducts.filter((product) => idArr.some((id) => product.id === id))
}

export const getProductById = async (id: string) => {
  let allProducts: Card[] = [];

  await getProducts().then((response) => allProducts = response);

  return allProducts.find((product) => id === product.id) as Card
}

export const getProducts = () => fetch(`${BASE_URL}/products.json`)
    .then((response) => response.json())

export const getPhones = () => fetch(`${BASE_URL}/products.json`)
  .then((response) => response.json())
  .then((response) => response.filter((product: Card) => product.type === 'phone'))

export const getTablets = () => fetch(`${BASE_URL}/products.json`)
  .then((response) => response.json())
  .then((response) => response.filter((product: Card) => product.type === 'tablet'))

export const getAccessories = () => fetch(`${BASE_URL}/products.json`)
  .then((response) => response.json())
  .then((response) => response.filter((product: Card) => product.type === 'accessories'))

export const getHotPriceProducts = () => fetch(`${BASE_URL}/products.json`)
  .then((response) => response.json())
  .then((response) => response.filter(
    (product: Card) => product.discount > 0
  ).sort((a: Card, b: Card): number => b.discount - a.discount))

export const getNewModels = () => fetch(`${BASE_URL}/products.json`)
  .then((response) => response.json())
  .then((response) => response.filter(
    (product: Card) => product.discount === 0
  ).sort((a: Card, b: Card): number => b.price - a.price))

export const getProductDetails = (id: string) => fetch(`${BASE_URL}/products/${id}.json`)
  .then((response) => response.json())
