/* eslint-disable  @typescript-eslint/naming-convention */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Text } from '../../../shared/ui/Text';
import { Button } from '../../../shared/ui/Button';
import { RoundButton } from '../../../shared/ui/RoundButton';
import classes from './warning.module.scss';
import { useWarning } from '../../WarningContext';
import { useCart } from '../../../../app/features/cart';

type Props = ComponentPropsWithoutRef<'div'>;

export const Warning: FC<Props> = ({ className, ...props }) => {
  const [_isOpen, setIsOpen] = useWarning();
  const { clearCart } = useCart();

  const close = () => setIsOpen(false);
  const clear = () => {
    clearCart();
    close();
  };

  return (
    <div {...props} className={cn(classes.warning, className)}>
      <div className={classes.warning__header}>
        <Text.H3 className={classes.warning__title}>
          Checkout is not implemented yet.
        </Text.H3>
        <RoundButton onClick={close} className={classes.warning__closeButton}>
          ✖
        </RoundButton>
      </div>
      <div className={classes.warning__body}>
        <Text className={classes.warning__description}>
          Do you want to clear the Cart?
        </Text>
        <Button onClick={clear} className={classes.warning__button}>
          Clear the cart
        </Button>
      </div>
    </div>
  );
};
