import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import { useWidth } from '../../../../hooks/useWidth';
import { getPagination } from '../../../../utils/getPagination';
import { getButtonClass } from '../../../../utils/getButtonClass';

type Props = {
  numberOfPages: number;
};

export const Pagination: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { darkTheme } = useContext(ProductContext);
  const width = useWidth();
  const buttonClass = `${styles.pageButton} button--small ${getButtonClass.secondary(darkTheme)}`;
  const [visibleButtons, setVisibleButtons] = useState<(number | string)[]>([]);
  const selectedPage = +(searchParams.get('page') || 1);

  useEffect(() => {
    let buttons = getPagination.smallScreens(numberOfPages, selectedPage);

    if (width > 640) {
      buttons = getPagination.bigScreens(numberOfPages, selectedPage);
    }

    setVisibleButtons(buttons);
  }, [numberOfPages, selectedPage, width]);

  function handleButtonClick(newValue: number) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
          const buttonValue = getPagination.itemValue(
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
