import { Link } from 'react-router-dom';
import { Product } from '../helpers/Product';
import { ProductCard } from './ProductCard';

export type ProductListProps = {
  page: string
  title: string
  products: Product[] | null
};

export enum SortEnum {
  Default = 'Default',
  Newest = 'Newest',
  LowPrice = 'Price - Low to High',
  HighPrice = 'Price - High to Low',
}

export enum ItemsOnPage {
  I4 = '4',
  I8 = '8',
  I16 = '16',
  IAll = 'All',
}

export const ProductList = ({ page, title, products }: ProductListProps) => {
  return (
    <div className="product">
      <div className="product__path">
        <Link to="/" className="product__path--home">
          <img
            alt="arrowTop"
            src="./img/home.svg"
            className="product__path--home-image"
          />
        </Link>
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="product__path--prev"
        />
        <span className="product__path--page">{page}</span>
      </div>
      <h1 className="product__title">{title}</h1>
      <span className="product__description">
        {`${products?.length} models`}
      </span>

      <div className="product__pagination">
        <label className="product__pagination--sort-by
          product__pagination--sort-label"
        >
          Sort by
          <select className="product__pagination--sort-select selects">
            <option className="selects--option">{SortEnum.Default}</option>
            <option className="selects--option">{SortEnum.Newest}</option>
            <option className="selects--option">{SortEnum.LowPrice}</option>
            <option className="selects--option">{SortEnum.HighPrice}</option>
          </select>
        </label>

        <label className="product__pagination--sort-items
          product__pagination--sort-label"
        >
          Items on page
          <select className="product__pagination--sort-select selects">
            <option className="selects--option">{ItemsOnPage.I4}</option>
            <option className="selects--option">{ItemsOnPage.I8}</option>
            <option className="selects--option">{ItemsOnPage.I16}</option>
            <option className="selects--option">{ItemsOnPage.IAll}</option>
          </select>
        </label>
      </div>
      <ul className="product__list">
        {products && products.map((product) => (
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
            className="slider__arrow--image"
          />
        </button>
        <button
          type="button"
          className="buttons"
        >
          <img
            alt="arrowLeft"
            src="./img/arrowRight.svg"
            className="slider__arrow--image "
          />
        </button>
      </div>
    </div>
  );
};
