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
  let cardSize = 272;
  let cardPerScroll = 1;

  switch (true) {
    case window.innerWidth > 1280:
      cardSize = 288;
      cardPerScroll = 4;
      break;

    case window.innerWidth > 768:
      cardSize = 350;
      cardPerScroll = 2;
      break;

    default:
      break;
  }

  const transformStyle = `translateX(${cardSize * -itemId}px)`;
  const handleContentScroll = (side: number) => {
    setItemId(prevState => prevState + (cardPerScroll * side));
    document.querySelector('.page__content__cards')?.scrollTo({
      left: -100,
      behavior: 'smooth',
    });
  };

  return (
    <section className="page__content">
      <div className="page__content__header">
        <h1>{title}</h1>
        {itemsList.length > cardPerScroll && (
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
              disabled={itemId >= itemsList.length - cardPerScroll}
            />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="card-loaders">
          {Array
            .from({ length: cardPerScroll }, (_, i) => i + 1)
            .map((loader) => (
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
                transform: transformStyle,
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
