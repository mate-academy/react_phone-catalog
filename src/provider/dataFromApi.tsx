import { API_URL } from "../env";

export interface IGood {
  age: number;
  id: string;
  type: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const getGoods = async () => (
  await fetch(`${API_URL}/products.json`))
  .json();

export const getGood = async (id: string) => (
  await fetch(`${API_URL}/products/${id}.json`))
  .json();

  export const getGoodsByCategory = async (category: string): Promise<IGood[]> =>
    new Promise(async (resolve, reject) => {
      await getGoods()
        .then((data: IGood[]) => {
          resolve(data.filter((good: IGood) => good.type === category));
        })
        .catch(error => reject(error))
    });


