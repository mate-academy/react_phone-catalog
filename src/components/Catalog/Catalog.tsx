import './Catalog.scss';
import { ProductCard } from '../ProductCard';

export const Catalog = () => {
  return (
    <section className="catalog">
      <div className="container catalog__container">
        <div className="catalog__bradcrumbs">
          <span>&#9813; </span>
          <span>&#62;</span>
          <span>home</span>
        </div>
        <h1 className="catalog__title">Mobile phones</h1>
        <div className="catalog__counter">95 models</div>
        <div className="catalog__dropdowns">
          <div className="catalog__dropdown">
            <label
              htmlFor="catalog__sortby"
              className="catalog__sortby_label label"
            >
              Sort by
            </label>
            <select id="catalog__sortby" className="catalog__sortby select">
              <option value="newest">Newest</option>
              <option value="name">Name</option>
              <option value="cheaper">Cheaper</option>
            </select>
          </div>
          <div className="catalog__dropdown">
            <label
              htmlFor="catalog__items"
              className="catalog__items_label label"
            >
              Items on page
            </label>
            <select id="catalog__items" className="catalog__items select">
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>
        <div className="catalog__wrapper">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="catalog__pagination pagination">
          <span className="pagination__item  pagination__left"> &#60;</span>
          <span className="pagination__item pagination__item_active"> 1 </span>
          <span className="pagination__item "> 2 </span>
          <span className="pagination__item "> 3 </span>
          <span className="pagination__item "> 4 </span>
          <span className="pagination__item pagination__rigth"> &#62;</span>
        </div>
      </div>
    </section>
  );
};
