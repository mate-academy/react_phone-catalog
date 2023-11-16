/* eslint-disable no-console */
import { getProductDetails } from '../../comonents/api/productDetails';
import { Product } from '../../type/Product';
import { ProductDeatails } from '../../type/ProductDetails';

export const fetchProducts = async (
  getData: () => Promise<Product[]>,
  setData: (data: Product[]) => void,
  setIsError: (isError: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  name: string,
) => {
  setIsLoading(true);
  setIsError('');
  try {
    const data = await getData();

    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    setIsError(`Error fetching ${name}`);
  } finally {
    setIsLoading(false);
  }
};

export const fetchDetails = async (
  selectedProductId: string,
  setProductDetails: (details: ProductDeatails) => void,
  setSelectedProduct: (product: Product) => void,
  setIsProductNotFound: (isProductNotFound: boolean) => void,
  setIsError: (isError: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  products: Product[],
  name: string,
) => {
  if (selectedProductId) {
    setIsLoading(true);
    setIsError('');

    try {
      const data = await getProductDetails(selectedProductId);

      setProductDetails(data);
      const foundProduct = products.find((p) => p.id === selectedProductId);

      if (foundProduct) {
        setIsProductNotFound(false);
        setSelectedProduct(foundProduct);
      } else {
        setIsProductNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsError(`Error fetching ${name}`);
    } finally {
      setIsLoading(false);
    }
  }
};
