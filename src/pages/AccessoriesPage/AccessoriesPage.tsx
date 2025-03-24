import React, { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsMain';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Link, useParams } from 'react-router-dom';
import { getAccessories } from '../../utils/getData';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../components/ProductDescription';
import cn from 'classnames';
import { getRecommendedAccessories } from '../../utils/getRecommended';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';
import { Accessory } from '../../types/Accessory';

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedAccessory, setRecommendedAccessory] = useState<Product[]>(
    [],
  );

  {
    /* eslint-disable */
  }
  const [selectedAccessory, setSelectedAccessory] = useState<
    Accessory | undefined
  >(undefined);
  {
    /* eslint-enable */
  }

  const [isLoading, setIsLoading] = useState(false);
  const { accessoryId } = useParams<{ accessoryId: string }>();

  useEffect(() => {
    const loadProducts = async () => {
      const sortedProducts = await fetchProducts();

      setProducts(sortedProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getAccessories()
      .then(loadedAccessory => {
        const neededAccessory = loadedAccessory.find(
          accessory => accessory.id === accessoryId,
        );

        setSelectedAccessory(neededAccessory);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [accessoryId]);

  useEffect(() => {
    const recommended = getRecommendedAccessories(products);

    setRecommendedAccessory(recommended);
  }, [products]);

  return (
    <>
      <div className="breadcrumbs">
        <Link to={'/'} className="breadcrumbs__home"></Link>
        <div className="breadcrumbs__arrow"></div>
        <Link
          to={'/tablets'}
          className={cn('breadcrumbs__route', {
            'breadcrumbs__route--main': accessoryId,
          })}
        >
          Accessories
        </Link>
        {accessoryId && (
          <>
            <div className="breadcrumbs__arrow"></div>
            <p className="breadcrumbs__route breadcrumbs__route--last">
              {selectedAccessory?.name}
            </p>
          </>
        )}
      </div>
      {accessoryId ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ProductDescription
              selectedProduct={selectedAccessory}
              recommendedItems={recommendedAccessory}
              productId={accessoryId}
            />
          )}
        </>
      ) : (
        <ProductsList productsCategory={ProductsCategory.ACCESSORIES} />
      )}
    </>
  );
};
