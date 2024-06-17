import { useSearchParams } from 'react-router-dom';
import { ButtonWithErrow } from '../../../../components/UIKit/ButtonWithErrow';
import classNames from 'classnames';
import styles from './Buttons.module.scss';
import { useState } from 'react';

type Props = {
  numberOfPages: number;
};

export const Buttons: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayIndex, setDisplayIndex] = useState(0);
  const selectedPage = +(searchParams.get('page') || 1);
  const buttonsPerPage = 4;
  const buttons = Array.from(Array(numberOfPages).keys());
  const maxValue = (value: number) =>
    value + 1 > numberOfPages ? numberOfPages : value + 1;
  const lowestValue = (value: number) => (value - 1 < 0 ? 0 : value - 1);

  function handleButtonClick(newValue: number) {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(searchParams);

    params.set('page', `${newValue}`);
    setSearchParams(params);
  }

  const onIndexIncrease = () => {
    handleButtonClick(maxValue(selectedPage));
    setDisplayIndex(prev => maxValue(prev));
  };

  const onIndexDecrease = () => {
    handleButtonClick(lowestValue(selectedPage));
    setDisplayIndex(prev => lowestValue(prev));
  };

  return (
    <div className={styles.wrapper}>
      <ButtonWithErrow
        className={`${styles.button} button button--small`}
        onClick={onIndexDecrease}
        disabled={selectedPage <= 1}
      />
      <div className={styles.container}>
        <div
          className={styles.block}
          style={{
            transition: 'transform 3s',
            transform:
              numberOfPages < buttonsPerPage
                ? ''
                : `translateX(calc(-32px * ${displayIndex} - 8px *  ${displayIndex}))`,
          }}
        >
          {buttons.map(button => (
            <button
              key={button}
              className={classNames(`${styles.button} button button--small`, {
                'button--black': button + 1 === selectedPage,
              })}
              onClick={() => {
                handleButtonClick(button + 1);
              }}
            >
              {button + 1}
            </button>
          ))}
        </div>
      </div>
      <ButtonWithErrow
        className={`${styles.button} button button--small`}
        onClick={onIndexIncrease}
        disabled={selectedPage >= numberOfPages}
      />
    </div>
  );
};
