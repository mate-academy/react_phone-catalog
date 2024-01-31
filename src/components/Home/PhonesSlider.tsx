import { FC, useState } from 'react';
import cn from 'classnames';
import { selectPhonesStatus } from '../../features/phoneSlice/phonesSlice';
import { useAppSelector } from '../../app/hooks';
import { ArrowRight } from '../../icons/ArrowRight';
import { ArrowLeft } from '../../icons/ArrowLeft';
import { PhoneItem } from '../PhoneItem';
import './PhonesSlider.scss';
import { IPhone } from '../../types';
import { Loader } from '../Loader';

type Props = {
  phones: IPhone[];
  title: string
};

export const PhonesSlider: FC<Props> = ({ phones, title }) => {
  const phonesStatus = useAppSelector(selectPhonesStatus);
  const [position, setPosition] = useState(0);

  const frameSize = 4;
  const itemWidth = 288;
  const minPosition = 0;
  const maxPosition = phones.length - frameSize;

  const showNextPhone = () => {
    if (position + 1 < maxPosition) {
      setPosition(position + 1);
    } else {
      setPosition(maxPosition);
    }
  };

  const showPrevPhone = () => {
    if (position - 1 > minPosition) {
      setPosition(position - 1);
    } else {
      setPosition(minPosition);
    }
  };

  return (
    <section className="phonesSlider">
      <div className="phonesSlider__top">
        <h1>{title}</h1>
        <div className="phonesSlider__buttons">
          <button
            type="button"
            className={cn(
              'phonesSlider__button',
              { disabled: position === minPosition },
            )}
            onClick={showPrevPhone}
          >
            {position === minPosition ? (
              <ArrowLeft color="#b4bdc3" />
            ) : (
              <ArrowLeft />
            )}
          </button>
          <button
            type="button"
            className={cn(
              'phonesSlider__button',
              { disabled: position === maxPosition },
            )}
            onClick={showNextPhone}
          >
            {position === maxPosition ? (
              <ArrowRight color="#b4bdc3" />
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>
      </div>
      {phonesStatus === 'loading' ? (<Loader />) : (
        <div className="phonesSlider__bottom">
          <ul className="phonesSlider__list">
            {phones.map((phone) => (
              <li
                key={phone.itemId}
                className="phonesSlider__item"
                style={{ transform: `translateX(${-(position * itemWidth)}px)` }}
              >
                <PhoneItem phone={phone} />
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
};
