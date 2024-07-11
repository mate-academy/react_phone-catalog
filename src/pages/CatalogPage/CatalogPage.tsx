import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCatalog } from '../../components/ProductCatalog';
import { getProductsByCategory } from '../../services/Products';
import { Product } from '../../types/Product';
import '../../styles/utils/typography.scss';
import './CatalogPage.scss';

type TypeOfProduct = 'phones' | 'tablets' | 'accessories' | '';

export const CatalogPage: React.FC = () => {
  const { typeOfProduct } = useParams<{ typeOfProduct?: TypeOfProduct }>();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);

  const getTitle = () => {
    switch (typeOfProduct) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Catalog';
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const fetchedCategoryProducts = await getProductsByCategory(
          typeOfProduct || '',
        );

        setProductCount(fetchedCategoryProducts.length);
        setProductsList(fetchedCategoryProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [typeOfProduct]);

  return (
    <div className="catalogPage">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="catalogPage__title">
            <h1 className="title">{getTitle()}</h1>
            <p>{productCount} models</p>
          </div>
          <ProductCatalog products={productsList} />
        </>
      )}
    </div>
  );
};
