export interface Product {
  quantity: number;
  id: number,
  category: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  capacityAvailable: string[],
  description: [{ title: string, text: string[] }],
  phoneId: string,
  itemId: string,
  images: string[],
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string
}
