import React, { useCallback, useEffect, useState } from 'react';

import { getProductsByCategory, getDisplayProducts } from '../utils/fetchApi';
import { Item, Product } from '../types/itemTypes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type ProductCtx = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
  displayProduct: Item | null;
  setDisplayProduct: React.Dispatch<React.SetStateAction<Item | null>>;
  displayImage: string;
  setDisplayImage: React.Dispatch<React.SetStateAction<string>>;
  handleGetItemByCategory: (category: string, id: string) => void;
  handleDisplayImage: (image: string) => void;
  handleGetItemByFeature: (
    category: string,
    spaceId: string,
    color: string,
    capacity: string,
  ) => void;
};

export const ProductContext = React.createContext<ProductCtx>({
  products: [],
  setProducts: () => {},
  favourites: [],
  setFavourites: () => {},
  displayProduct: null,
  setDisplayProduct: () => {},
  displayImage: '',
  setDisplayImage: () => {},
  handleGetItemByCategory: () => {},
  handleDisplayImage: () => {},
  handleGetItemByFeature: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [displayImage, setDisplayImage] = useState<string>('');

  const { pathname } = useLocation();

  const { category: urlCategory, id: urlId } = useParams();

  const navigate = useNavigate();

  const [displayProduct, setDisplayProduct] = useState<Item | null>(null);

  const [favourites, setFavourites] = useState<Product[]>(() => {
    const storedFavourites = localStorage.getItem('favourites');

    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const handleGetItemByCategory = useCallback(
    async (category: string, id: string) => {
      const data = await getProductsByCategory(category);
      const product = data.find((item: Item) => item.id === id);

      setDisplayProduct(product);
    },
    [],
  );

  const handleGetItemByFeature = async (
    category: string,
    spaceId: string,
    color: string,
    capacity: string,
  ) => {
    const data = await getProductsByCategory(category);
    const product = data.find(
      (item: Item) =>
        item.namespaceId === spaceId &&
        item.color === color &&
        item.capacity === capacity,
    );

    if (product) {
      navigate(`/${category}/${product.id}`, {
        state: { id: urlId, category: urlCategory },
      });
      setDisplayProduct(product);
    } else {
      // a product with both features was not found
      // now we try to find a product with at least one of the features
      const dataProduct = data.find(
        (item: Item) =>
          (item.namespaceId === spaceId && item.color === color) ||
          (item.namespaceId === spaceId && item.capacity === capacity),
      );

      navigate(`/${category}/${dataProduct?.id}`, {
        state: { id: urlId, category: urlCategory },
      });
      setDisplayProduct(dataProduct);
    }
  };

  const handleDisplayImage = (image: string) => {
    setDisplayImage(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getDisplayProducts().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const ctxValue = {
    products,
    setProducts,
    favourites,
    setFavourites,
    displayProduct,
    setDisplayProduct,
    displayImage,
    setDisplayImage,
    handleDisplayImage,
    handleGetItemByCategory,
    handleGetItemByFeature,
  };

  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
};
