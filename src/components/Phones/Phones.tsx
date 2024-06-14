import { Path } from '../Path';
import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';
import React, { Fragment, useMemo } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductsTypes } from '../../types/ProductsTypes';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortTypes } from '../../types/SortTypes';
import { Dropdown } from '../Dropdown';
import productsFromServer from '../../api/products.json';
import { Pagination } from '../Pagination';
import { ProductDetails } from '../ProductDetails';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  productsType: ProductsTypes;
};

const sortParams = [
  {
    id: 1,
    title: 'Newest',
    searchParam: SortTypes.Year,
  },
  {
    id: 2,
    title: 'Alphabetically',
    searchParam: SortTypes.Name,
  },
  {
    id: 3,
    title: 'Cheapest',
    searchParam: SortTypes.Price,
  },
];

const paginationParams = [
  {
    id: 1,
    title: 'All',
    searchParam: null,
  },
  {
    id: 2,
    title: '4',
    searchParam: '4',
  },
  {
    id: 3,
    title: '8',
    searchParam: '8',
  },
  {
    id: 4,
    title: '16',
    searchParam: '16',
  },
];

export const Phones: React.FC<Props> = ({ products, productsType }) => {
  const [searchParams] = useSearchParams();
  const visibleProducts = useMemo(() => {
    let currentProducts = [...products];

    switch (searchParams.get('sort')) {
      case SortTypes.Price:
        currentProducts.sort((a, b) => a.priceRegular - b.priceRegular);
        break;

      case SortTypes.Name:
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortTypes.Year:
        currentProducts.sort((a, b) => {
          const productA = productsFromServer.find(
            product => product.itemId === a.id,
          ) ?? { year: 0 };
          const productB = productsFromServer.find(
            product => product.itemId === b.id,
          ) ?? { year: 0 };

          return productB.year - productA.year;
        });
        break;

      default:
        break;
    }

    const page =
      isNaN(Number(searchParams.get('page'))) || !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const perPage =
      isNaN(Number(searchParams.get('perPage'))) || !searchParams.get('perPage')
        ? products.length
        : Number(searchParams.get('perPage'));

    currentProducts = currentProducts.slice(
      (page - 1) * perPage,
      Math.min((page - 1) * perPage + perPage, currentProducts.length),
    );

    return currentProducts;
  }, [products, searchParams]);

  const { phoneId, tabletId, accessoryId } = useParams();
  const Ids = [phoneId, tabletId, accessoryId];

  const canShow = useMemo(() => {
    const page = searchParams.get('page');

    return (
      !(phoneId || tabletId || accessoryId) &&
      !isNaN(Number(page)) &&
      Number(page) >= 0 &&
      Number(page) < products.length
    );
  }, [phoneId, tabletId, accessoryId, searchParams, products.length]);

  const handleGetProduct = () => {
    const currentProduct = productsFromServer.find(prod =>
      Ids.includes(prod.itemId),
    );

    const getProduct = () => {
      switch (currentProduct?.category) {
        case 'phones':
          return phonesFromServer.find(
            phone => currentProduct.itemId === phone.id,
          );

        case 'tablets':
          return tabletsFromServer.find(
            tablet => currentProduct.itemId === tablet.id,
          );

        case 'accessories':
          return accessoriesFromServer.find(
            accessory => currentProduct.itemId === accessory.id,
          );

        default:
          return null;
      }
    };

    const formattedProduct = getProduct();

    if (formattedProduct && currentProduct) {
      return (
        <ProductDetails
          products={products}
          product={formattedProduct}
          category={currentProduct.category}
        />
      );
    }

    return null;
  };

  return (
    <main className="products flex">
      <Path parentClassName="products" />
      {canShow && (
        <Fragment>
          <h1 className="products__title">Mobile phones</h1>
          <p className="products__count body-text">
            {phonesFromServer.length} models
          </p>
          <section className="products__dropdowns">
            <Dropdown
              parentClassName="products"
              params={sortParams}
              srcParam={'sort'}
              textTitle="Sort by"
              coClass="products__dropdown-first"
            />
            <Dropdown
              parentClassName="products"
              params={paginationParams}
              srcParam={'perPage'}
              noParams="All"
              textTitle="Items on page"
              coClass="products__dropdown-second"
            />
          </section>
          <section className="products__cards">
            {visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                productType={productsType}
              />
            ))}
          </section>
          <Pagination
            productsLength={products.length}
            parentClassName="products"
          />
        </Fragment>
      )}
      {(phoneId || tabletId || accessoryId) && handleGetProduct()}
    </main>
  );
};
