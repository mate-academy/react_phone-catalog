import { useEffect, useState } from 'react';
import { getPhones } from '../../api/api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { ProductType } from '../../types/ProductType';
import './Catalog.scss';

export const Catalog = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    setProducts(await getPhones());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="catalog">
      <Breadcrumbs paths={['Phones']} />

      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__count body-text">95 models</p>

      <div className="catalog__filters">
        <div className="catalog__filters-filter">
          <p className="catalog__filters-filter-text small-text">Sort by</p>
          <Dropdown options={['Newest']} />
        </div>

        <div className="catalog__filters-filter catalog__filters-filter--small">
          <p className="catalog__filters-filter-text small-text">
            Items on page
          </p>
          <Dropdown options={['16', '32', '64']} />
        </div>
      </div>

      <div className="catalog__container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} wideButton={true} />
        ))}
      </div>
    </div>
  );
};
