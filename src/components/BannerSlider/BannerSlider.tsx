import { useEffect, useState } from 'react';
import './BannerSlider.scss';
import classNames from 'classnames';

const INDICATORS_ARR = [0, 1, 2];

type Props = {
  children: React.ReactElement[];
};

export const BannerSlider: React.FC<Props> = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [indicatorNum, setIndicatorNum] = useState(0);

  const handleSlideChange = (value: string) => {
    switch (value) {
      case 'left': {
        setOffset(currentOffset => {
          let newOffset = currentOffset + 1040;

          setIndicatorNum(currentNum => currentNum - 1);

          if (newOffset > 0) {
            newOffset = -2080;
            setIndicatorNum(2);
          }

          return newOffset;
        });

        break;
      }

      case 'right': {
        setOffset(currentOffset => {
          let newOffset = currentOffset - 1040;

          setIndicatorNum(currentNum => currentNum + 1);

          if (newOffset < -2080) {
            newOffset = 0;
            setIndicatorNum(0);
          }

          return newOffset;
        });

        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    setInterval(handleSlideChange, 5000, 'right');
  }, []);

  return (
    <div className="bannerSlider">
      <div className="bannerSlider__banner">
        <div
          className="bannerSlider__button"
          onClick={() => handleSlideChange('left')}
          aria-hidden="true"
        >
          <div className="icon icon--arrow-left" />
        </div>

        <div className="bannerSlider__window">
          <div
            className="bannerSlider__elements"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {children}
          </div>
        </div>

        <div
          className="bannerSlider__button"
          onClick={() => handleSlideChange('right')}
          aria-hidden="true"
        >
          <div className="icon icon--arrow-right" />
        </div>
      </div>

      <div className="bannerSlider__indicators">
        {INDICATORS_ARR.map(indicator => (
          <div
            key={indicator}
            className={classNames('bannerSlider__indicator', {
              'bannerSlider__indicator--isActive': indicatorNum === indicator,
            })}
          />
        ))}
      </div>
    </div>
  );
};
