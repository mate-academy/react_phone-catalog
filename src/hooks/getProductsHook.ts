import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';
const { addToDB } = useProducts();

export const useGetPhones = async () => {
  setTimeout(() => {
    getProducts('phones').then(phones => {
      addToDB('phones', phones);
    });
  }, 2000);
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
  setTimeout(() => {
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, 2000);
};
