/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../../../api/products';
import { Category, Product } from '../../../../types/Product';
import { Loader } from '../../../shared/components/Loader';
import { ErrorNotice } from '../../../shared/components/ErrorNotice';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';

interface Props {
  category: Category;
}

const NUMBER_SUGGESTED = 12;

export const SuggestedProducts: FC<Props> = ({ category }) => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //const products = getSuggestedProducts(10, category);

  useEffect(() => {
    const fetchSuggested = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const products = await getSuggestedProducts(NUMBER_SUGGESTED, category);

        setSuggestedProducts(products);
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggested();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <ErrorNotice
        message={errorMessage}
        onReload={() => window.location.reload()}
      />
    );
  }

  return (
    <ProductsSlider products={suggestedProducts} title="You may also like:" />
  );
};
