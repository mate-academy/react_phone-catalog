import './Slider.module.scss';
import Chevron from '../../../public/img/icons/Chevron (Arrow Right).svg';
import ChevronGray from '../../../public/img/icons/ChevronGray (Arrow Right).svg';
import { useRef, useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { FavoritesButton } from '../FavoritesButton';
import { CartButton } from '../CartButton';

type Props = {
  title: string;
  products: Product[];
};

export const Slider: React.FC<Props> = ({ title, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setIsStart(scrollLeft <= 0);
    setIsEnd(scrollLeft + clientWidth >= scrollWidth);
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollByAmount = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="slider">
      <div className="slider_wrapper">
        <div className="slider_top">
          <h2 className="slider_title">{title}</h2>
          <div className="slider_controlls">
            <button
              className={`slider_controll ${isStart ? 'slider_controll--disabled' : ''}`}
              onClick={() => scrollByAmount(-200)}
              disabled={isStart}
            >
              <img
                className="slider_img"
                src={isStart ? ChevronGray : Chevron}
                alt="Chevron left"
              />
            </button>
            <button
              className={`slider_controll ${isEnd ? 'slider_controll--disabled' : ''}`}
              onClick={() => scrollByAmount(200)}
              disabled={isEnd}
            >
              <img
                className="slider_img slider_img--right"
                src={isEnd ? ChevronGray : Chevron}
                alt="Chevron right"
              />
            </button>
          </div>
        </div>

        <div className="slider_content" ref={scrollRef}>
          {products.map(product => (
            <article className="product slider_product" key={product.id}>
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
                      src={`/react_phone-catalog/${product.images[0]}`}
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
