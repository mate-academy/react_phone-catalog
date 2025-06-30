import { useContext } from 'react';
import { ProductContext } from '../../../store/ProductContext';

export const useCategories = () => {
  const { products } = useContext(ProductContext);

  const categoryCounts = {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };

  return [
    {
      url: '/phones',
      type: 'phones',
      title: 'Mobile phones',
      image: './img/category/phones.png',
      quantity: categoryCounts.phones,
      background: '#6D6474',
    },
    {
      url: '/tablets',
      type: 'tablets',
      title: 'Tablets',
      image: './img/category/tablets.png',
      quantity: categoryCounts.tablets,
      background: '#8D8D92',
    },
    {
      url: '/accessories',
      type: 'accessories',
      title: 'Accessories',
      image: './img/category/accessories.png',
      quantity: categoryCounts.accessories,
      background: '#973D5F',
    },
  ];
};
