import { IconButton } from '@mui/material';
import './HotPrices.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../react-app-env';
import { Card } from '../Card/Card';
import { getProducts } from '../../../api/api';
import { Loader } from '../../Loader/Loader';

export const HotPrices = () => {
  const [position, setPosition] = useState(0);
  const [disablePrev, setdisablePrev] = useState(false);
  const [disableNext, setdisableNext] = useState(false);
  const [currentList, setCurrentList] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const widthFourCards = 1161;
  const perOneCard = 290.3;

  useEffect(() => {
    getProducts()
      .then(result => {
        setCurrentList(result
          .filter((item: { discount: number; }) => item.discount !== 0));
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, []);

  const getNext = () => {
    const moveon: number = position + widthFourCards;

    setdisablePrev(false);

    if (position < perOneCard * currentList.length - 2 * widthFourCards) {
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
    <div className="hotprices">
      {currentList.length === 0 && <Loader />}
      {errorMsg.length !== 0 && <p className="hotprices__error">{errorMsg}</p>}
      <div className="hotprices__box-title-button">
        <h1 className="hotprices__title">Hot prices</h1>
        {currentList.length === 0 && <Loader />}
        <div className="hotprices__box-button">
          <IconButton
            disabled={disablePrev}
            sx={{
              padding: 0,
            }}
            onClick={getPrev}
          >
            <div className="hotprices__rectangle">
              <div className="hotprices__arrowleft" />
            </div>
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            disabled={disableNext}
            onClick={getNext}
          >
            <div className="hotprices__rectangle">
              <div className="topbanners__arrowright" />
            </div>
          </IconButton>
        </div>
      </div>

      <div className="hotprices__boxlist">
        <ul
          className="hotprices__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {currentList.map(item => (
            <li
              key={item.id}
              className="hotprices__listitem"
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
