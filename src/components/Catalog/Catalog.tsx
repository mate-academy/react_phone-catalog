import { FC } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType, ProductType } from '../../types/Product';
import { NameProducts } from '../../types/NameProducts';

type nameCategory = Exclude<NameProducts, 'allProducts'>;

type Props = {
  products: ProductAllType[];
  dropdown?: boolean;
  pagination?: boolean;
  nameCategory: nameCategory;
};

export const Catalog: FC<Props> = ({
  products,
  dropdown = true,
  pagination = true,
  nameCategory,
}) => {
  function infoObject(nameCategory: nameCategory): {
    name: nameCategory;
    quantity: number;
  } {
    let name = '';

    switch (nameCategory) {
      case 'phones':
        name = 'Mobile phones';
        break;
      case 'tablets':
        name = 'Tablets';
        break;
      case 'accessories':
        name = 'Accessories';
        break;
      default:
        break;
    }

    return {
      name: name as nameCategory,
      quantity: products.length | 0,
    };
  }

  const { name, quantity } = infoObject(nameCategory);

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">{name}</h1>
        <div className="catalog__counter">
          {quantity} model{quantity !== 1 ? 's' : ''}
        </div>

        {dropdown && <Dropdowns />}

        <div className="catalog__wrapper">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {pagination && <Pagination />}
      </div>
    </section>
  );
};
