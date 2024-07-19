import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCatalog } from '../../components/ProductCatalog';
import { getProductsByCategory } from '../../services/Products';
import { Product } from '../../types/Product';
import '../../styles/utils/typography.scss';
import './CatalogPage.scss';
import { BreadCrumb } from '../../components/BreadCrumb';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../../components/Loader';

type TypeOfProduct = 'phones' | 'tablets' | 'accessories';

export const CatalogPage: React.FC = () => {
  const { typeOfProduct } = useParams<{ typeOfProduct?: string }>();
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

  const validProductTypes: TypeOfProduct[] = [
    'phones',
    'tablets',
    'accessories',
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="catalogPage">
      {validProductTypes.includes(typeOfProduct as TypeOfProduct) ? (
        <>
          <div className="catalogPage__bread-crumb">
            <BreadCrumb />
          </div>
          <div className="catalogPage__title">
            <h1 className="title">{getTitle()}</h1>
            <p>{productCount} models</p>
          </div>
          {productsList.length > 0 ? (
            <ProductCatalog products={productsList} />
          ) : (
            <div className="no-products-message">
              {`There are no ${typeOfProduct} yet`}
            </div>
          )}
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
