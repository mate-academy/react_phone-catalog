import { IconButton } from '@mui/material';
import './TopBanners.scss';
import { useState } from 'react';
import banners from '../../../banners.json';

type Props = {
  setIsNumberBanner: (arg: number) => void,
};

export const TopBanners: React.FC<Props> = ({ setIsNumberBanner }) => {
  const [position, setPosition] = useState(0);
  const [disablePrev, setdisablePrev] = useState(false);
  const [disableNext, setdisableNext] = useState(false);
  const widthOneBanner = 1040;

  if (position === 0) {
    setIsNumberBanner(1);
  }

  if (position === widthOneBanner) {
    setIsNumberBanner(2);
  }

  if (position === 2 * widthOneBanner) {
    setIsNumberBanner(3);
  }

  // const timeoutID = setTimeout(() => {
  //   if (position < 2080) {
  //     setPosition(position + 1040);
  //   } else {
  //     setPosition(0);
  //   }
  // }, 5000);

  // clearTimeout(timeoutID);

  const getNext = () => {
    const moveon: number = position + widthOneBanner;

    setdisablePrev(false);

    if (position < 2 * widthOneBanner) {
      setdisableNext(false);
      setPosition(moveon);
    } else {
      setdisableNext(true);
    }
  };

  const getPrev = () => {
    setdisableNext(false);
    if (position > 0) {
      const moveon: number = position - widthOneBanner;

      setdisablePrev(false);
      setPosition(moveon);
    } else {
      setdisablePrev(true);
    }
  };

  return (
    <div className="topbanners">
      <IconButton
        size="small"
        disabled={disablePrev}
        sx={{ padding: 0 }}
        onClick={getPrev}
      >
        <div className="topbanners__rectangle">
          <div className="topbanners__arrowleft" />
        </div>
      </IconButton>

      <div className="topbanners__boxlist">
        <ul
          className="topbanners__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {banners.map(item => (
            <li
              key={item.id}
              className="topbanners__listitem"
            >
              <img
                src={item.imgUrl}
                alt={item.name}
              />
            </li>
          ))}
        </ul>
      </div>

      <IconButton
        size="small"
        sx={{ padding: 0 }}
        disabled={disableNext}
        onClick={getNext}
      >
        <div className="topbanners__rectangle">
          <div className="topbanners__arrowright" />
        </div>
      </IconButton>
    </div>
  );
};
