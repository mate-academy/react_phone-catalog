import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import {
  getButtonSecondaryClass,
  getButtonValue,
} from '../../../../utils/utils';
import { dots } from '../../../../constants/dots';

type Props = {
  numberOfPages: number;
};

export const Pagination: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { darkTheme } = useContext(ProductContext);
  const buttonClass = `${styles.button} button--small ${getButtonSecondaryClass(darkTheme)}`;
  const [visibleButtons, setVisibleButtons] = useState<(number | string)[]>([]);
  const selectedPage = +(searchParams.get('page') || 1);

  useEffect(() => {
    let buttons: (number | string)[] = Array.from(
      Array(numberOfPages + 1).keys(),
    ).slice(1);

    if (numberOfPages <= 6) {
      setVisibleButtons(buttons);

      return;
    }

    if (selectedPage <= 4) {
      buttons = [...buttons.slice(0, 4), dots.start, numberOfPages];
    } else if (selectedPage <= numberOfPages - 4 && selectedPage > 4) {
      const buttonsMiddle = [selectedPage - 1, selectedPage, selectedPage + 1];

      buttons = [1, dots.start, ...buttonsMiddle, dots.end, numberOfPages];
    } else if (selectedPage > numberOfPages - 4) {
      const rest = numberOfPages - 4;
      const hideButtons = rest > 1 ? dots.end : numberOfPages - 1;

      buttons = [1, hideButtons, ...buttons.slice(-4)];
    }

    setVisibleButtons(buttons);
  }, [numberOfPages, selectedPage]);

  function handleButtonClick(newValue: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const params = new URLSearchParams(searchParams);

    params.set('page', `${newValue}`);
    setSearchParams(params);
  }

  //#region index increase / iecrease
  const onIndexIncrease = () => {
    const increaseValue = selectedPage + 1;

    handleButtonClick(
      increaseValue > numberOfPages ? numberOfPages : increaseValue,
    );
  };

  const onIndexDecrease = () => {
    const decreasedValue = selectedPage - 1;

    handleButtonClick(decreasedValue < 0 ? 0 : decreasedValue);
  };

  //#endregion

  return (
    <div className={styles.wrapper}>
      <button
        className={buttonClass}
        onClick={onIndexDecrease}
        disabled={selectedPage <= 1}
      >
        <div
          className={classNames('icon icon--arrow', {
            'icon--notActive': selectedPage <= 1,
          })}
        ></div>
      </button>
      <div className={styles.container}>
        {visibleButtons.map((button, index) => {
          const buttonValue = getButtonValue(
            button,
            index,
            visibleButtons,
            selectedPage,
          );

          return (
            <button
              key={button}
              className={classNames(`${buttonClass}`, {
                'button--main-darkTheme': darkTheme && button === selectedPage,
                'button--main': button === selectedPage,
              })}
              onClick={() => handleButtonClick(buttonValue)}
            >
              {button}
            </button>
          );
        })}
      </div>

      <button
        className={buttonClass}
        onClick={onIndexIncrease}
        disabled={selectedPage >= numberOfPages}
      >
        <div
          className={classNames('icon icon--arrow', {
            'icon--notActive': selectedPage >= numberOfPages,
          })}
        ></div>
      </button>
    </div>
  );
};
