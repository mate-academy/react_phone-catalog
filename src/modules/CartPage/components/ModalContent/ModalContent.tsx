import React, { useContext } from 'react';
import classes from './ModalContent.module.scss';
import { MoveButton } from '../../../../components/buttons/MoveButton';
import { Icon } from '../../../../components/Icon';
import { IconList } from '../../../../components/Icon/styles/IconList';
import { GlobalContext } from '../../../../GlobalContext';

type Props = {
  closeModal: () => void;
};

export const ModalContent: React.FC<Props> = ({ closeModal }) => {
  const { dispatch } = useContext(GlobalContext);

  const hendleClearCart = () => {
    dispatch({ type: 'UPDATE_AMOUNT', payload: [] });
    closeModal();
  };

  return (
    <div className={classes.ModalContent}>
      <div className={classes.ModalContent__close}>
        <MoveButton onClick={closeModal}>
          <Icon icon={IconList.close} />
        </MoveButton>
      </div>

      <h2>
        Checkout is not implemented yet.
        <br />
        Do you want to clear the Cart?
      </h2>

      <button
        className={classes.ModalContent__button}
        onClick={hendleClearCart}
      >
        Yes
      </button>
    </div>
  );
};
