import { useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { Product } from '../types/Product';
import { Card } from './Card';

type Props = {
  title: string,
  itemsList: Product[],
  isLoading: boolean,
};

export const ItemsSlider:React.FC<Props> = ({
  title,
  itemsList,
  isLoading,
}) => {
  const [itemId, setItemId] = useState<number>(0);
  const handleContentScroll = (side: number) => {
    setItemId(prevState => prevState + (4 * side));
    document.querySelector('.page__content__cards')?.scrollTo({
      left: -100,
      behavior: 'smooth',
    });
  };

  return (
    <section className="page__content">
      <div className="page__content__header">
        <h1>{title}</h1>
        {itemsList.length > 4 && (
          <div className="page__content__header__arrows">
            <button
              type="button"
              aria-label="slider-button"
              className="slider-button slider-button__left"
              onClick={() => handleContentScroll(-1)}
              disabled={itemId === 0}
            />
            <button
              type="button"
              aria-label="slider-button"
              className="slider-button slider-button__right"
              onClick={() => handleContentScroll(1)}
              disabled={itemId >= itemsList.length - 4}
            />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="card-loaders">
          {[1, 2, 3, 4].map((loader) => (
            <div
              className="card card-loaders__loader"
              key={loader}
            >
              <FadeLoader color="gray" />
            </div>
          ))}
        </div>
      )}
      <div>
        <ul className="page__content__cards">
          {itemsList.map(item => (
            <li
              key={item.id}
              style={{
                transition: '500ms',
                transform: `translateX(${288 * -itemId}px)`,
              }}
            >
              <Card item={item} hasDiscont />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
