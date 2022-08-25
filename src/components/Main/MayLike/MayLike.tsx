import { IconButton } from '@mui/material';
import './MayLike.scss';
import { useEffect, useState } from 'react';
import products from '../../../api/products.json';
import { Product } from '../../../react-app-env';
import { Card } from '../Card/Card';

export const MayLike = () => {
  const [position, setPosition] = useState(0);
  const [disablePrev, setdisablePrev] = useState(false);
  const [disableNext, setdisableNext] = useState(false);
  const [currentList, setCurrentList] = useState<Product[]>(products);

  const randomList = new Array(products.length);

  for (let i = 0; i < products.length; i += 1) {
    randomList[i] = products[Math.floor(Math.random() * products.length)];
  }

  const widthFourCards = 1161;
  const perOneCard = 290.3;

  useEffect(() => {
    if (randomList) {
      setCurrentList(randomList);
    }
  }, []);

  const getNext = () => {
    const moveon: number = position + widthFourCards;

    setdisablePrev(false);

    if (position < perOneCard * randomList.length - 2 * widthFourCards) {
      setdisableNext(false);
      setPosition(moveon);
    } else {
      setdisableNext(true);
    }
  };

  const getPrev = () => {
    setdisableNext(false);
    if (position > 0) {
      const moveon: number = position - widthFourCards;

      setdisablePrev(false);
      setPosition(moveon);
    } else {
      setdisablePrev(true);
    }
  };

  return (
    <div className="maylike">
      <div className="maylike__box-title-button">
        <h1 className="maylike__title">You may also like</h1>
        <div className="maylike__box-button">
          <IconButton
            disabled={disablePrev}
            sx={{
              padding: 0,
            }}
            onClick={getPrev}
          >
            <div className="maylike__rectangle">
              <div className="maylike__arrowleft" />
            </div>
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            disabled={disableNext}
            onClick={getNext}
          >
            <div className="maylike__rectangle">
              <div className="topbanners__arrowright" />
            </div>
          </IconButton>
        </div>
      </div>

      <div className="maylike__boxlist">
        <ul
          className="maylike__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {currentList.map(item => (
            <li
              key={item.id}
              className="maylike__listitem"
            >
              <Card
                age={item.age}
                id={item.id}
                type={item.type}
                imageUrl={item.imageUrl}
                name={item.name}
                snippet={item.snippet}
                price={item.price}
                discount={item.discount}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
