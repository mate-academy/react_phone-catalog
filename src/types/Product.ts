export type Product = {
  age: number,
  id: string,
  type: 'tablet' | 'phone' | 'accessory',
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
  description: string,
  display: {
    screenResolution: string,
  },
  hardware: {
    cpu: string,
  },
  connectivity: {
    cell: string,
  },
  camera: {
    primary: string,
  }
  images: string[],
  quantity?: number,
};
