/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { Button, ButtonSize } from '../../../../shared/ui/forms';
import cls from './chekout.module.scss';
import { Modal } from '../../../../shared/ui/Modal';
import { TitleTag } from '../../../../shared/ui/TitleTag';
import {
  ICartItemsLocalStorage,
  useLocalStorage,
} from '../../../../shared/lib/hooks/useLocalStorage';
import { LOCAL_STORAGE_CART_PRODUCTS } from '../../../../entities/Product';

interface Props {
  className?: string;
  totalAmount: number;
  totalCount: number;
  removeAllHandler: () => void;
}

export const Checkout: FC<Props> = ({
  className,
  totalAmount,
  totalCount,
  removeAllHandler,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setCartLocalStorage] = useLocalStorage<ICartItemsLocalStorage[]>(
    LOCAL_STORAGE_CART_PRODUCTS,
    [],
  );

  const omToggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const removeAll = useCallback(() => {
    setCartLocalStorage([]);
    removeAllHandler();
  }, [removeAllHandler, setCartLocalStorage]);

  return (
    <div className={classNames(cls.card, className)}>
      <div className={cls.card__top}>
        <p className={cls.amount}>{totalAmount}</p>
        <p className={cls.count}>{`Total for ${totalCount} items`}</p>
      </div>

      <Button onClick={omToggleModal} size={ButtonSize.FULL}>
        {'Checkout'}
      </Button>

      <Modal isOpen={isModalOpen} onClose={omToggleModal}>
        <TitleTag
          Tag="h3"
          title="Checkout is not implemented yet. Do you want to clear the Cart?"
          className={cls.title}
        />
        <div className={cls.buttons}>
          <Button onClick={removeAll}>Clear</Button>
          <Button onClick={omToggleModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};
