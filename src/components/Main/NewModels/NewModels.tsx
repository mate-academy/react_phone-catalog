import { IconButton } from '@mui/material';
import './NewModels.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../react-app-env';
import { Card } from '../Card/Card';
import { Loader } from '../../Loader/Loader';
import { getProducts } from '../../../api/api';

export const NewModels = () => {
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
          .filter((item: { discount: number; }) => item.discount === 0));
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

    // eslint-disable-next-line no-console
    console.log(position);
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
    <div className="newmodels">
      {errorMsg.length !== 0 && <p className="newmodels__error">{errorMsg}</p>}
      <div className="newmodels__box-title-button">
        {currentList.length === 0 && <Loader />}
        <h1 className="newmodels__title">Brand new models</h1>
        <div className="newmodels__box-button">
          <IconButton
            disabled={disablePrev}
            sx={{
              padding: 0,
            }}
            onClick={getPrev}
          >
            <div className="newmodels__rectangle">
              <div className="newmodels__arrowleft" />
            </div>
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            disabled={disableNext}
            onClick={getNext}
          >
            <div className="newmodels__rectangle">
              <div className="newmodels__arrowright" />
            </div>
          </IconButton>
        </div>
      </div>

      <div className="newmodels__boxlist">
        <ul
          className="newmodels__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {currentList.map(item => (
            <li
              key={item.age}
              className="newmodels__listitem"
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
