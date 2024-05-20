// /* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddBlock } from '../Buttons/AddBlock';
import { Product } from '../../../types/Product';
import { Price } from '../Price';
import { SpecsList } from '../SpecsList';
import { WindowWidthContext } from '../../../store/WindowWidthContext';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';

type Props = {
  product: Product;
  widthCard?: number;
  discount: boolean;
};

// function getURLLink(pathname: string, category: string, itemId: string) {
//   if (pathname.includes(category)) {
//     return itemId;
//   }

//   return `${category}/${itemId}`;
// }

// function getURLLink1(
//   pathname: string,
//   category: string,
//   itemId: string,
//   navigate: ReturnType<typeof useNavigate>,
// ) {
//   const splitPathname = pathname.split('/').slice(1);

//   if (splitPathname.length === 1 && splitPathname[0] === category) {
//     return itemId;
//   }

//   if (splitPathname.length === 2) {
//     navigate(`${category}/${itemId}`);

//     return '';
//   }

//   return `${category}/${itemId}`;
// }

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

    const { windowSize } = useContext(WindowWidthContext);

    const { pathname } = useLocation();
    const isCategory = pathname.includes(category);

    const navigate = useNavigate();

    const specs = { screen, capacity, ram };

    const widthImg = windowSize * 0.396875;

    const navigateTo = () => {
      if (isCategory) {
        navigate(itemId, { state: { discount } });
      } else {
        navigate(`${category}/${itemId}`, { state: { discount } });
      }
    };

    function getHeightImg() {
      if (windowSize <= WIDTH_DEVICES.mobile && isCategory) {
        return { height: `${widthImg}px`, marginBottom: '32px' };
      }

      if (windowSize > WIDTH_DEVICES.mobile && category === 'accessories') {
        return { maxHeight: '90%' };
      }

      return {};
    }

    function getHeightCard() {
      if (windowSize <= WIDTH_DEVICES.mobile && isCategory) {
        return { width: `${widthCard}px`, height: 'auto' };
      }

      return { width: `${widthCard}px` };
    }

    return (
      // <div className="product-card" style={{ width: `${widthCard}px` }}>
      <div className="product-card" style={getHeightCard()}>
        {/* <Link
          to={getURLLink(pathname, category, itemId)}
          className="product-card__img-link"
        >
          <img src={image} alt={`${name}`} className="product-card__img" />
        </Link> */}
        <button
          type="button"
          onClick={navigateTo}
          className="product-card__img-link"
        >
          <img
            src={image}
            alt={`${name}`}
            className="product-card__img"
            style={getHeightImg()}
          />
        </button>

        <p className="product-card__title">{name}</p>

        <div className="product-card__price">
          <Price
            discount={discount}
            priceDiscount={price}
            fullPrice={fullPrice}
          />
        </div>

        <div className="product-card__descr">
          {Object.entries(specs).map(prop => (
            <SpecsList prop={prop} key={prop[0]} />
          ))}
        </div>

        <AddBlock />
      </div>
    );
  },
);
