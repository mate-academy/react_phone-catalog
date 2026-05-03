import { useState } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface Props {
  products: Product[];
  title: string;
}

export const ProductsScroller: React.FC<Props> = ({ products, title }) => {
  const { viewportWidth } = useAppSelector(state => state.viewport);
  const [currentTransform, setCurrentTransform] = useState('0px');

  const hasHotPrice = title === 'Hot Prices';
  const category = products[0]?.category;

  const cardWidth = 272;
  const gap = viewportWidth < 450 ? 120 : 16;
  let itemsShowed;

  switch (true) {
    case viewportWidth < 576:
      itemsShowed = 1;
      break;

    case viewportWidth >= 576 && viewportWidth < 768:
      itemsShowed = 2;
      break;

    case viewportWidth >= 768 && viewportWidth < 1200:
      itemsShowed = 3;
      break;

    default:
      itemsShowed = 4;
      break;
  }

  const transformValue = +currentTransform.replace('px', '');

  // on big screens the scroller doesn't take up as much space so we need to lower the proportions between viewportWidth and scrollerWidth

  // we find the approximate width of the whole scroller
  const scrollerWidth = products.length * cardWidth + products.length * gap;

  // we find how much of the scroller was already scrolled through
  const cantBeScrolled =
    Math.abs(transformValue) >=
    scrollerWidth - (itemsShowed - 1) * (cardWidth + gap);

  const handlePhonesScrolling = (side: 'left' | 'right') => {
    const toTransform = cardWidth + gap;

    setCurrentTransform(prev => {
      const value = prev.replace('px', '');

      if (side === 'right') {
        return +value - toTransform + 'px';
      }

      return +value + toTransform + 'px'; // Використовуємо maxScroll для обмеження зсуву вліво
    });
  };

  const phoneScrollerStyles = {
    // eslint-disable-next-line
    transform: `translateX(${currentTransform})`,
  };

  const disableArrows = (way: 'right' | 'left') => {
    return cn(`arrow arrow--${way}`, {
      'arrow-disabled':
        way === 'right' ? cantBeScrolled : currentTransform === '0px', // Змінено на currentTransform === '0px'
    });
  };

  return (
    <article className="scroller">
      <div className="scroller__top">
        <h2
          className={cn('scroller__title', {
            'scroller__title--double-line': title === 'Brand new models',
          })}
        >
          {title}
        </h2>

        <div className="scroller__arrows">
          <button
            className={disableArrows('left')}
            onClick={() => handlePhonesScrolling('left')}
          />

          <button
            className={disableArrows('right')}
            onClick={() => handlePhonesScrolling('right')}
          />
        </div>
      </div>

      <div className="scroller__products" style={phoneScrollerStyles}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            hasHotPrice={hasHotPrice}
          />
        ))}

        <article className="see-more-card">
          <Link to={`/${category}`} className="see-more-card__img-link">
            <div
              className={`see-more-card__img see-more-card__img--${category}`}
            />
          </Link>

          <h3 className="see-more-card__text">
            The best products come from Apple
          </h3>

          <Link to={`/${category}`} className="see-more-card__link">
            Wanna see more?
          </Link>
        </article>
      </div>
    </article>
  );
};
