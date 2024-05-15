import { useEffect, useState } from 'react';
import { ProductsList } from '../ProductsList';
import { Product } from '../../../types/ProductCard';
import { ProductCategories } from '../../../types/ProductCategories';
import { getProducts } from '../../../helpers/getProducts';
import { getPageTitle } from '../../../helpers/getPageTitle';
import { Pagination } from '../Pagination';
import { Sort } from '../../../types/Sort';
import { Filter } from '../Filter/Filter';
import './ProductPage.scss';

type Props = {
  category: ProductCategories;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.Newest);
  const [itemsOnPage, setItemsOnPage] = useState<'all' | 4 | 8 | 16>('all');

  const pageTitle = getPageTitle(category);

  useEffect(() => {
    getProducts(category).then(setProducts);
  }, [category]);

  useEffect(() => {
    if (sort) {
      setProducts((currentProducts: Product[]) => {
        const sortedProducts = [...currentProducts];

        // Sort according to the method
        switch (sort) {
          case Sort.Alphabetically:
            sortedProducts.sort((a: Product, b: Product) =>
              a.name.localeCompare(b.name),
            );
            break;
          case Sort.Cheapest:
            sortedProducts.sort(
              (a: Product, b: Product) => a.fullPrice - b.fullPrice,
            );
            break;
          case Sort.Newest:
            sortedProducts.sort((a: Product, b: Product) => b.year - a.year);
            break;
        }

        return sortedProducts;
      });
    }
  }, [sort]);

  // Depending on the URL, get and set in state proper products

  return (
    <section className="product-page">
      <nav className="product-page-nav">
        <img
          className="product-page-nav__home"
          src="./icons/home.svg"
          alt="home icon"
        />
        <img
          className="product-page-nav__next"
          src="./icons/arrow-right-disabled.svg"
          alt="right arrow image"
        />
        <p className="product-page-nav__category">{category}</p>
      </nav>

      <div className="product-page__main-info">
        <h1 className="product-page__title">{pageTitle}</h1>
        <p className="product-page__models-count">95 models</p>
      </div>

      <div className="filters product-page__filters">
        <div className="filters__item">
          <Filter sort={sort} setSort={setSort} />
        </div>

        <div className="filters__item">
          <p className="filters__name">Items on page</p>
          <button className="filters__filter"></button>
          <div className="dropdown">
            <button
              className="dropdown__option"
              onClick={() => setItemsOnPage('all')}
              value={'all'}
            >
              all
            </button>
            <button
              className="dropdown__option"
              onClick={() => setItemsOnPage(4)}
              value={4}
            >
              4
            </button>
            <button
              className="dropdown__option"
              onClick={() => setItemsOnPage(8)}
              value={8}
            >
              8
            </button>
            <button
              className="dropdown__option"
              onClick={() => setItemsOnPage(16)}
              value={16}
            >
              16
            </button>
          </div>
        </div>
      </div>

      <div className="product-page__products-wrapper">
        <ProductsList products={products} />
      </div>

      <Pagination pages={2} />

      {itemsOnPage}
    </section>
  );
};
