import { IconButton } from '@mui/material';
import './MayLike.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../react-app-env';
import { Card } from '../Card/Card';
import { getProducts } from '../../../api/api';
import { Loader } from '../../Loader/Loader';

export const MayLike = () => {
  const [position, setPosition] = useState(0);
  const [disablePrev, setdisablePrev] = useState(false);
  const [disableNext, setdisableNext] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const widthFourCards = 1161;
  const perOneCard = 290.3;

  useEffect(() => {
    getProducts()
      .then(result => {
        setAllProducts(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, []);

  const randomList = new Array(setAllProducts.length);

  for (let i = 0; i < allProducts.length; i += 1) {
    randomList[i] = {
      ...allProducts[Math
        .floor(Math.random() * allProducts.length)],
      idKey: i + 1,
    };
  }

  // eslint-disable-next-line no-console
  console.log(randomList);

  useEffect(() => {
    if (randomList) {
      setAllProducts(randomList);
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
        {errorMsg.length !== 0
      && (
        <p className="maylike__error">
          {errorMsg}
        </p>
      )}
        <h1 className="maylike__title">You may also like</h1>
        {allProducts?.length === 0 && <Loader />}
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
          {allProducts?.map(item => (
            <li
              key={item.idKey}
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
