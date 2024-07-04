import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AddBlock } from '../Buttons/AddBlock';
import { Product } from '../../../types/Product';
import { Price } from '../Price';
import { SpecsItem } from '../SpecsItem';
import { WindowSizeContext } from '../../../store/WindowSizeContext';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { scrollToTop } from '../../../services/scrollToTop';

type Props = {
  product: Product;
  widthCard?: number;
  discount: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, widthCard, discount }) => {
    const {
      name,
      image,
      fullPrice,
      price,
      screen,
      capacity,
      ram,
      itemId,
      category,
    } = product;

    const { windowSize } = useContext(WindowSizeContext);

    const { pathname } = useLocation();
    const isCategoryPage = pathname.includes(category);
    const isProductPage = pathname.split('/')[2];

    const specs = { screen, capacity, ram };

    const widthImg = windowSize * 0.396875;

    const linkTo = () => {
      const path = pathname.split('/').slice(1);
      const homePage = path.length === 1 && !path[0];
      const categoryPage = path.length === 1 && !!path[0];

      if (homePage) {
        return `${category}/${itemId}`;
      }

      if (categoryPage) {
        return `${itemId}`;
      }

      return `../../${category}/${itemId}`;
    };

    function getHeightImg() {
      if (
        windowSize <= WIDTH_DEVICES.mobile &&
        isCategoryPage &&
        !isProductPage
      ) {
        return { height: `${widthImg}px`, marginBottom: '32px' };
      }

      return {};
    }

    function getHeightCard() {
      if (windowSize <= WIDTH_DEVICES.mobile && isCategoryPage) {
        return { width: `${widthCard}px`, height: 'auto' };
      }

      return { width: `${widthCard}px` };
    }

    return (
      <div className="product-card" style={getHeightCard()}>
        <Link
          to={linkTo()}
          onClick={() =>
            setTimeout(() => {
              scrollToTop(false);
            }, 25)
          }
          state={discount}
          className="product-card__link"
        >
          <img
            src={image}
            alt={name}
            className="product-card__img"
            style={getHeightImg()}
          />

          <p className="product-card__name">{name}</p>
        </Link>

        <div className="product-card__price">
          <Price
            discount={discount}
            priceDiscount={price}
            fullPrice={fullPrice}
          />
        </div>

        <div className="product-card__descr">
          {Object.entries(specs).map(prop => (
            <SpecsItem prop={prop} key={prop[0]} />
          ))}
        </div>

        <AddBlock product={product} discount={discount} />
      </div>
    );
  },
);
