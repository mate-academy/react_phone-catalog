import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../helpers/Types';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';

export type ProductListProps = {
  products: Product[]
};

export enum SortEnum {
  Newest = 'age',
  Alphabetically = 'name',
  Cheapest = 'price',
}

export enum ItemsOnPage {
  Default = '4',
  I8 = '8',
  I16 = '16',
  IAll = 'all',
}

export const ProductList = ({ products }: ProductListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortSelect, setSortSelect]
  = useState<string>(searchParams.get('sort') || SortEnum.Newest);
  const [itemsPerPage, setItemsPerPage]
  = useState<string>(searchParams.get('perPage')
  || ItemsOnPage.Default);
  const [curentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')
  || 1),
  );

  const [productsPerPage, setproductsPerPage] = useState<Product[]>([]);
  const [maxPages, setMaxPages] = useState<number>(0);

  useEffect(() => {

  }, [products, itemsPerPage]);

  const handleChanePage = (pageNum: number) => {
    setCurrentPage(() => pageNum);
    searchParams.set('page', pageNum.toString());
    setSearchParams(searchParams);
  };

  const handleSortSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectBy = event.target.value;

    if (selectBy) {
      setSortSelect(() => selectBy);
      setCurrentPage(() => 1);
      searchParams.set('sort', selectBy);
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  };

  const handleItemsSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const itemsOnPage = event.target.value;

    if (itemsOnPage) {
      setItemsPerPage(() => itemsOnPage);
      setCurrentPage(() => 1);
      searchParams.set('perPage', itemsOnPage);
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    let sortedProducts = [...products];

    switch (sortSelect) {
      case SortEnum.Alphabetically:
        sortedProducts = sortedProducts.sort((item, item2) => (
          item.name.localeCompare(item2.name)
        ));
        break;
      case SortEnum.Cheapest:
        sortedProducts = sortedProducts.sort((item, item2) => (
          item.price - item2.price
        ));
        break;
      default:
        sortedProducts = sortedProducts.sort((item, item2) => (
          item.age - item2.age
        ));
        break;
    }

    if (itemsPerPage === 'all') {
      setproductsPerPage(() => sortedProducts);
      setMaxPages(() => 0);
    } else {
      const tmp = Number(itemsPerPage);

      setproductsPerPage(() => sortedProducts.slice(
        (curentPage - 1) * tmp, curentPage * tmp,
      ));
      setMaxPages(() => Math.ceil(products.length / tmp));
    }
  }, [products, searchParams]);

  return (
    <div className="product">
      <p className="product__description BodyText">
        {`${products?.length} models`}
      </p>

      <div className="product__pagination">
        <label className="product__pagination--sort-by
          product__pagination--label SmallText"
        >
          Sort by
          <select
            className="product__pagination--sort-select ButtonsText selects"
            onChange={handleSortSelect}
            value={sortSelect}
          >
            <option
              className="selects--option BodyText"
              value={SortEnum.Newest}
            >
              Newest
            </option>
            <option
              className="selects--option BodyText"
              value={SortEnum.Alphabetically}
            >
              Alphabetically
            </option>
            <option
              className="selects--option BodyText"
              value={SortEnum.Cheapest}
            >
              Cheapest
            </option>
          </select>
        </label>

        <label className="product__pagination--sort-items
          product__pagination--label"
        >
          Items on page
          <select
            className="product__pagination--sort-select ButtonsText selects"
            onChange={handleItemsSelect}
            value={itemsPerPage}
          >
            <option
              className="selects--option BodyText"
              value={ItemsOnPage.Default}
            >
              {ItemsOnPage.Default}

            </option>
            <option
              className="selects--option BodyText"
              value={ItemsOnPage.I8}
            >
              {ItemsOnPage.I8}

            </option>
            <option
              className="selects--option BodyText"
              value={ItemsOnPage.I16}
            >
              {ItemsOnPage.I16}

            </option>
            <option
              className="selects--option BodyText"
              value={ItemsOnPage.IAll}
            >
              {ItemsOnPage.IAll}

            </option>
          </select>
        </label>
      </div>

      <ul className="product__list" data-cy="productList">
        {productsPerPage && productsPerPage.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
      { maxPages > 1
      && (
        <Pagination
          maxPages={maxPages}
          curentPage={curentPage}
          handleChanePage={handleChanePage}
        />
      )}
    </div>
  );
};
