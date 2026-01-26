import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';
const { addToDB } = useProducts();

export const useGetPhones = async () => {
  getProducts('phones').then(phones => {
    addToDB('phones', phones);
  });
};

export const useGetTablets = async () => {
  getProducts('tablets').then(tablets => {
    addToDB('tablets', tablets);
  });
};

export const useGetAccessories = async () => {
  getProducts('phones').then(phones => {
    addToDB('phones', phones);
  });
};

export const useGetAllProducts = async () => {
  getProducts('allProducts').then(productsAll => {
    addToDB('allProducts', productsAll);
  });
};
