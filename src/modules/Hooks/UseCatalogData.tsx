import { Phone } from "../../Types/type";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export const UseCatalogData = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [itemsOnPage, setItemsOnPage] = useState<Phone[]>([]);
  const location = useLocation();

  const loadData = () => {
    setLoading(true)
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
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then(data => {
          setProducts(data);
          setError(false);
          setLoading(false);
        })
        .catch(error => {
          setError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

  }

  useEffect(() => {
    loadData();
  }, [location.pathname]);

  useEffect(() => {
    if (products.length > 0) {
      setItemsOnPage(products.slice(0, 16));
    }
  }, [products]);

  return { itemsOnPage, setItemsOnPage, products, setProducts, loading, setLoading,  error, reload: loadData, setError };
};

export default UseCatalogData;