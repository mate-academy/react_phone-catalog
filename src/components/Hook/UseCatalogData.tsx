import { Phone } from "../../Types/type";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";


export const UseCatalogData = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const location = useLocation();

  useEffect(() => {
    let url = '';

    if (location.pathname === '/phones') {
      url = './api/phones.json';
    } else if (location.pathname === '/tablets') {
      url = './api/tablets.json';
    } else if (location.pathname === '/accessories') {
      url = './api/accessories.json';
    }

    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          setProducts(response);
        })
    }
  }, [location.pathname]);


  useEffect(() => {
    if (products.length > 0) {
      setItemsOnPage(products.slice(0, 16));
    }
  }, [products]);

  const [itemsOnPage, setItemsOnPage] = useState<Phone[]>([]);
  useEffect(() => {
    setItemsOnPage(products?.slice(0, 16))
  }, [products])
  return { itemsOnPage, setItemsOnPage, products, setProducts };
};

export default UseCatalogData;