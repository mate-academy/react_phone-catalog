/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import { useSliderClick } from '../../helpers/useSliderClick';
import categoryMobile from '../../helpers/img/category/category-phones.png';
import categoryTablets from '../../helpers/img/category/category-tablets.png';
import categoryAccessories from
  '../../helpers/img/category/category-accessories.png';

type Props = {
  productsAmounts: {
    phonesAmount: number,
    tabletsAmount: number,
    accessoriesAmount: number,
  }
};

export const Category: React.FC<Props> = ({ productsAmounts }) => {
  const { phonesAmount, tabletsAmount, accessoriesAmount } = productsAmounts;
  const categories = [
    {
      id: 'phones',
      src: categoryMobile,
      title: 'Mobile phones',
      to: '/phones',
      amount: phonesAmount,
    },
    {
      id: 'tablets',
      src: categoryTablets,
      title: 'Tablets',
      to: '/tablets',
      amount: tabletsAmount,
    },
    {
      id: 'accessories',
      src: categoryAccessories,
      title: 'Accessories',
      to: '/accessories',
      amount: accessoriesAmount,
    },
  ];

  const {
    currTransitionX,
    isLastImgs,
    staticContainer,
    dynamicContainer,
    leftSlide,
    rightSlide,
  } = useSliderClick();

  return (
    <section className="home-page__category category">
      <div className="category__container _container">
        <div className="category__header">
          <h2 className="category__title">Shop by category</h2>
          <div className="category__buttons">
            <button
              type="button"
              aria-label="Mute volume"
              className="
                icon-button--left
                icon-button"
              onClick={leftSlide}
              disabled={currTransitionX === 0}
            />
            <button
              type="button"
              aria-label="Mute volume"
              className="
                icon-button--right
                icon-button"
              onClick={rightSlide}
              disabled={isLastImgs}
            />
          </div>
        </div>
        <div className="category__static-container" ref={staticContainer}>
          <ul
            ref={dynamicContainer}
            className="category__dynamic-container"
            style={{
              transform: `translateX(${-currTransitionX}px)`,
              transitionDuration: '500ms',
            }}
            data-cy="categoryLinksContainer"
          >
            {categories.map(card => (
              <li className="category__card" key={card.id}>
                <Link to={card.to}>
                  <div className={`
                    category__img-container
                    category__img-container--${card.id}`}
                  >
                    <img
                      className={`category__img category__img--${card.id}`}
                      src={card.src}
                      alt={card.title}
                    />
                  </div>
                  <p className="category__card-title">
                    {card.title}
                  </p>
                  <p className="category__card-amount">
                    {card.amount} model{card.amount > 1 ? 's' : ''}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
