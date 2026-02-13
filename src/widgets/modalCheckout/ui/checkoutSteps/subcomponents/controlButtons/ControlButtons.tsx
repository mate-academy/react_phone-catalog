import { useCheckout, useSteps } from '../../../../model';
import styles from './controlButtons.module.scss';
import { useGlobalActions } from '@features/index';
import { ButtonProps, FormIDs } from '../../../../types';
import { CartData } from '@shared/api';

export const ControlButtons = () => {
  const { step } = useSteps();
  const { toggleModal } = useGlobalActions();
  const { cart } = useCheckout();

  const total = cart === '' ? '' : (cart as CartData).total;

  const submit: Record<number, ButtonProps> = {
    1: {
      title: 'next',
      form: FormIDs.DATA,
    },
    2: {
      title: 'next',
      form: FormIDs.DELIVERY,
    },
    3: {
      title: `place order ($${total})`,
      form: FormIDs.AGREEMENT,
    },
  };

  const cancel = {
    title: 'cancel',
    props: {
      onClick: toggleModal,
    },
  };

  return (
    <div className={styles.buttons}>
      <button type="submit" form={submit[step].form}>
        {submit[step].title}
      </button>
      <button type="button" {...cancel.props}>
        {cancel.title}
      </button>
    </div>
  );
};
