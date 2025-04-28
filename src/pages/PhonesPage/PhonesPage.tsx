import React, { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsMain';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Link, useParams } from 'react-router-dom';
import { getPhones } from '../../utils/getData';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../components/ProductDescription';
import { Phone } from '../../types/Phone';
import cn from 'classnames';
import { getRecommendedPhones } from '../../utils/getRecommended';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedPhones, setRecommendedPhones] = useState<Product[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { phoneId } = useParams<{ phoneId: string }>();

  useEffect(() => {
    const loadProducts = async () => {
      const sortedProducts = await fetchProducts();

      setProducts(sortedProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then(loadedPhones => {
        const neededPhone = loadedPhones.find(phone => phone.id === phoneId);

        setSelectedPhone(neededPhone);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [phoneId]);

  useEffect(() => {
    const recommended = getRecommendedPhones(products);

    setRecommendedPhones(recommended);
  }, [products]);

  return (
    <>
      <div className="breadcrumbs">
        <Link to={'/'} className="breadcrumbs__home"></Link>
        <div className="breadcrumbs__arrow"></div>
        <Link
          to={'/phones'}
          className={cn('breadcrumbs__route', {
            'breadcrumbs__route--main': phoneId,
          })}
        >
          Phones
        </Link>
        {phoneId && (
          <>
            <div className="breadcrumbs__arrow"></div>
            <p className="breadcrumbs__route breadcrumbs__route--last">
              {selectedPhone?.name}
            </p>
          </>
        )}
      </div>
      {phoneId ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ProductDescription
              selectedProduct={selectedPhone}
              recommendedItems={recommendedPhones}
              productId={phoneId}
            />
          )}
        </>
      ) : (
        <ProductsList productsCategory={ProductsCategory.PHONES} />
      )}
    </>
  );
};
