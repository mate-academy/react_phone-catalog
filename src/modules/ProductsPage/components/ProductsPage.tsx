import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  phonesCatalog,
  tabletsCatalog,
  accessoriesCatalog,
  Product,
} from '../../../constants/common';
import './ProductsPage.scss';
import '../../HomePage/components/SliderCards/SliderCards.scss';
import { useEffect } from 'react';

export const ProductsPage = () => {
  const { category } = useParams()
  const [searchParams, setSearchParams]=useSearchParams()

  let sortByParams = searchParams.get("sort") || "newest"
  let sortByCount = searchParams.get("perPage") || "4"

  let products: Product[] = [];
  let title = '';
  let discountPrice = true;

  if (category === 'phones') {
    products = phonesCatalog;
    title = 'Mobile phones';
  }
  if (category === 'tablets') {
    products = tabletsCatalog;
    title = 'Tablets';
  }
  if (category === 'accessories') {
    products = accessoriesCatalog;
    title = 'Accessories';
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams)
    params.set("perPage", value)
    setSearchParams(params)
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)
    params.set("sort", value)

    setSearchParams(params)
  };

  const filteredProducts =
    sortByCount === 'all' ? products : products.slice(0, Number(sortByCount));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortByParams === 'newest') {
      return b.year - a.year;
    }
    if (sortByParams === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }
    if (sortByParams === 'cheapest') {
      return a.price - b.price;
    }
    return 0;
  });

  useEffect(() => {
      window.scrollTo(0, 0)
    }, [category]);

  return (
    <div className="products">
      <div className="products__container products__container--with-pagination">
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={`/`} className="breadcrumbs__link">
                <img src="/img/icons/home.svg" alt="home" />
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a href={`${category}`} className="breadcrumbs__link">
                {' '}
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : ''}
              </a>
            </li>
          </ul>
        </nav>
        <h1 className="products__title">{title}</h1>
        <p className="products__count">{products.length} models</p>

        <div className="products__filter-content">
          <div className="products__filter-group">
            <label htmlFor="sort" className="products__filter-label">
              Sort by
            </label>
            <select
              id="sort"
              className="products__filter-select"
              value={sortByParams}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className="products__filter-group">
            <label htmlFor="items-per-page" className="products__filter-label">
              Items on page
            </label>
            <select
              id="items-per-page"
              className="products__filter-select"
              value={sortByCount}
              onChange={handleSelectChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </div>
        </div>

        <div className="products__cards cards">
          <ul className="cards__list">
            {sortedProducts.map((product, index) => (
              <li className="cards__item" key={index}>
                <article className="product-card">
                  <div className="product-card__content">
                    <Link
                      to={`/${category}/${product.itemId}`}
                      state={{ product }}
                      className="product-card__link"
                    >
                      <div className="product-card__photo">
                        <img
                          src={product.image}
                          alt="Product Image"
                          className="product-card__image"
                        />
                      </div>

                      <h3 className="product-card__title">{product.name}</h3>

                      <p className="product-card__price">
                        <span>${product.price}</span>
                        {discountPrice && (
                          <span className="product-card__old-price">
                            ${product.fullPrice}
                          </span>
                        )}
                      </p>
                    </Link>

                    <div className="product-card__info">
                      <div className="product-card__info-item">
                        <p className="product-card__info-label">Screen</p>
                        <p className="product-card__info-value">
                          {product.screen}
                        </p>
                      </div>
                      <div className="product-card__info-item">
                        <p className="product-card__info-label">Capacity</p>
                        <p className="product-card__info-value">
                          {product.capacity}
                        </p>
                      </div>
                      <div className="product-card__info-item">
                        <p className="product-card__info-label">RAM</p>
                        <p className="product-card__info-value">
                          {product.ram}
                        </p>
                      </div>
                    </div>

                    <div className="product-card__actions">
                      <button className="product-card__add-to-cart" >
                        Add to cart
                      </button>
                      <button className="product-card__favorite" onClick={()=>{
                        console.log(product);
                        product.favourite===true
                        console.log(product);
                        
                      }}>
                        <img
                          src="public/img/icons/add-to-fovourites.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="products__pagination pagination">
          <ol className="pagination__list">
            <li className="pagination__item"></li>
          </ol>
        </div>
      </div>
    </div>
  );
};
