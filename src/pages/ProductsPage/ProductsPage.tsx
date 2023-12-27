import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Catalog } from '../../components/Catalog';
import { Loader } from '../../components/Loader';
import { getCategoy } from '../../helpers/productsServise';
import { Product } from '../../helpers/types';

type Props = {
  category: string,
  title: string,
};

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCounter, setProductsCounter] = useState(products.length);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategoy(category)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [location.pathname]);

  return (
    <div className="outlet">
      <Breadcrumbs />

      {isLoading
        ? <Loader />
        : (
          <section className="outlet__content">
            <h1 className="outlet__title">{title}</h1>
            <p className="outlet__subtitle">
              {`${productsCounter} ${productsCounter === 1 ? 'model' : 'models'}`}
            </p>
            <div className="outlet__catalog">
              <Catalog
                products={products}
                setProductsCounter={setProductsCounter}
              />
            </div>
          </section>
        )}
    </div>
  );
};
