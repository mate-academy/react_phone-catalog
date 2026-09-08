import { Product } from '../../types/Product';
import './ProductList.module.scss';
import { Link } from 'react-router-dom';
import { FavoritesButton } from '../FavoritesButton';
import { CartButton } from '../CartButton';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <section className="section section_products">
      <div className="container">
        <div className="products">
          {products.map(product => (
            <article className="product" key={product.id}>
              <div className="product_wrapper">
                <div className="product_img_wrapper">
                  <Link
                    className="product_link product_link--img"
                    to={
                      product.category
                        ? `/${product.category}/${product.id}`
                        : '#'
                    }
                  >
                    <img
                      src={product.images[0]}
                      className="product_img"
                      alt="product image"
                    />
                  </Link>
                </div>

                <Link
                  className="product_link product_link--text"
                  to={
                    product.category
                      ? `/${product.category}/${product.id}`
                      : '#'
                  }
                >
                  <h2 className="product_title">{product.name}</h2>
                </Link>

                <div className="product_price_wrapper">
                  {product.priceDiscount && (
                    <p className="product_price">${product.priceDiscount}</p>
                  )}
                  <p
                    className={
                      product.priceDiscount
                        ? 'product_price product_price--lined'
                        : 'product_price'
                    }
                  >
                    ${product.priceRegular}
                  </p>
                </div>

                <div className="product_line"></div>

                <div className="product_info">
                  <div className="product_info_wrapper">
                    <p className="product_info_key">Screen</p>
                    <p className="product_info_value">
                      {product.screen.length > 15
                        ? product.screen.slice(0, 15) + '...'
                        : product.screen}
                    </p>
                  </div>
                  <div className="product_info_wrapper">
                    <p className="product_info_key">Capacity</p>
                    <p className="product_info_value">{product.capacity}</p>
                  </div>
                  <div className="product_info_wrapper">
                    <p className="product_info_key">RAM</p>
                    <p className="product_info_value">{product.ram}</p>
                  </div>
                </div>

                <div className="product_buttons">
                  <CartButton product={product} />
                  <FavoritesButton
                    className="product_add-to-favorites"
                    productId={product.id}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
