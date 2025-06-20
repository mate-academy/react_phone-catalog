import { usePagedList } from '../../../../utils/usePagedList';
import { Product } from '../../../../types/Product';
import React, { useRef } from 'react';
import classNames from 'classnames';
import './PhonesBottom.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
  actualButton: number;
  initialList: Product[];
}

export const PhonesBottom: React.FC<Props> = ({
  actualButton,
  initialList,
}) => {
  if (!initialList) {
    return null;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const saveFilterParams = (key: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(key, String(value));

    setSearchParams(newSearchParams);
  };

  const { ditermineDirection, howButtonsRender } = usePagedList(initialList);
  const navigationContainer = useRef<HTMLUListElement>(null);

  const movebuttons = (direction: 'left' | 'right') => {
    if (!navigationContainer.current) {
      return;
    }

    const container = navigationContainer.current;
    const scrollAmount = 33;

    if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      saveFilterParams(
        'actual-list',
        ditermineDirection('right', actualButton),
      );
    } else if (direction === 'left') {
      saveFilterParams('actual-list', ditermineDirection('left', actualButton));
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="phones-bottom">
      <nav>
        <ul className="phones-bottom__nav">
          <li
            className="phones-bottom__nav-item button-left"
            onClick={() => {
              saveFilterParams(
                'actual-list',
                ditermineDirection('left', actualButton),
              );
              movebuttons('left');
            }}
          ></li>

          <ul ref={navigationContainer} className="phones-bottom__navigation">
            {howButtonsRender.map(buttonNumber => {
              return (
                <li
                  key={buttonNumber}
                  data-actual-button={buttonNumber}
                  className={classNames('phones-bottom__navigation-button', {
                    'active-list': buttonNumber === actualButton,
                  })}
                  onClick={() => {
                    saveFilterParams('actual-list', buttonNumber);
                  }}
                >
                  {buttonNumber}
                </li>
              );
            })}
          </ul>

          <li
            className="phones-bottom__nav-item button-right"
            onClick={() => {
              saveFilterParams(
                'actual-list',
                ditermineDirection('right', actualButton),
              );
              movebuttons('right');
            }}
          ></li>
        </ul>
      </nav>
    </div>
  );
};
