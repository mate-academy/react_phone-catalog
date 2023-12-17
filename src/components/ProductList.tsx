import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../helpers/Types';
import { ProductCard } from './ProductCard';

export type ProductListProps = {
  products: Product[]
};

export enum SortEnum {
  Default = 'Default',
  Newest = 'Newest',
  LowPrice = 'Price - Low to High',
  HighPrice = 'Price - High to Low',
}

export enum ItemsOnPage {
  Default = '4',
  I8 = '8',
  I16 = '16',
  IAll = 'All',
}

export const ProductList = ({ products }: ProductListProps) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [productsPerPage, setproductsPerPage] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [curentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);

  useEffect(() => {
    setSortedProducts(() => products);
    if (sortedProducts.length > 0) {
      setproductsPerPage(() => sortedProducts.slice(0, itemsPerPage));
    } else {
      setproductsPerPage(() => products.slice(0, itemsPerPage));
    }

    setMaxPages(() => Math.ceil(products.length / itemsPerPage));
  }, [products, itemsPerPage]);

  const handleChanePage = (pageNum: number) => {
    if (pageNum > 0 && pageNum <= maxPages) {
      setproductsPerPage(() => sortedProducts.slice(
        (pageNum - 1) * itemsPerPage, pageNum * itemsPerPage,
      ));
      setCurrentPage(pageNum);
    }
  };

  const handleSortSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectBy = event.target.value;

    switch (selectBy) {
      case SortEnum.HighPrice:
        setSortedProducts((items) => (
          [...items].sort((item, item2) => (
            item.price - item2.price
          ))
        ));
        break;
      case SortEnum.LowPrice:
        setSortedProducts((items) => (
          [...items].sort((item, item2) => (
            item2.price - item.price
          ))
        ));
        break;
      case SortEnum.Newest:
        setSortedProducts((items) => (
          [...items].sort((item, item2) => (
            item2.year - item.year
          ))
        ));
        break;
      default:
        setSortedProducts((items) => (
          [...items].sort((item, item2) => (
            item.id.localeCompare(item2.id)
          ))
        ));
        break;
    }

    handleChanePage(curentPage);
  };

  const handleItemsSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const itemsOnPage = event.target.value;

    switch (itemsOnPage) {
      case ItemsOnPage.I8:
        setItemsPerPage(8);
        break;
      case ItemsOnPage.I16:
        setItemsPerPage(16);
        break;
      case ItemsOnPage.IAll:
        setItemsPerPage(products.length);
        break;
      default:
        setItemsPerPage(4);
        break;
    }
  };

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
          >
            <option
              className="selects--option BodyText"
              value={SortEnum.Default}
            >
              {SortEnum.Default}
            </option>
            <option
              className="selects--option BodyText"
              value={SortEnum.Newest}
            >
              {SortEnum.Newest}

            </option>
            <option
              className="selects--option BodyText"
              value={SortEnum.LowPrice}
            >
              {SortEnum.LowPrice}

            </option>
            <option
              className="selects--option BodyText"
              value={SortEnum.HighPrice}
            >
              {SortEnum.HighPrice}

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

      <ul className="product__list">
        {productsPerPage && productsPerPage.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
      <div className="product__buttons">
        <button
          type="button"
          className="buttons"
        >
          <img
            alt="arrowLeft"
            src="./img/arrowLeft.svg"
          />
        </button>
        <button
          type="button"
          className="buttons"
          onClick={() => handleChanePage(curentPage + 1)}
        >
          <img
            alt="arrowLeft"
            src="./img/arrowRight.svg"
          />
        </button>
      </div>
    </div>
  );
};
