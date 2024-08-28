import styles from './ToBuy.module.scss';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import classNames from 'classnames';
import { Modal } from '../Modal/Modal';

export const Tobuy = () => {
  const { totalPrice, totalItems, isSunSelected } = useContext(GlobalContext);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handlerOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div
        className={classNames(styles.buy, {
          [styles.buy_dark]: !isSunSelected,
        })}
      >
        <div
          className={classNames(styles.buy__full_price, {
            [styles.buy__full_price_dark]: !isSunSelected,
          })}
        >{`$${totalPrice}`}</div>
        <div
          className={classNames(styles.buy__total_items, {
            [styles.buy__total_items_dark]: !isSunSelected,
          })}
        >{`Total for ${totalItems} items`}</div>
        <span
          className={classNames(styles.buy__separator, {
            [styles.buy__separator_dark]: !isSunSelected,
          })}
        ></span>
        <button
          type="button"
          className={classNames(styles.buy__button, {
            [styles.buy__button_dark]: !isSunSelected,
          })}
          onClick={handlerOpenModal}
        >
          Checkout
        </button>

        <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </div>
    </>
  );
};
