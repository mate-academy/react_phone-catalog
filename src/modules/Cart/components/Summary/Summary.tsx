/* eslint-disable  @typescript-eslint/naming-convention */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../../app/hooks';
import { selectInCart } from '../../../../app/features/cart';
import { Text } from '../../../shared/ui/Text';
import { Container } from '../../../shared/Container';
import { useWarning } from '../../WarningContext';
import { Products } from '../Products';
import { Checkout } from '../Checkout';
import classes from './summary.module.scss';

type Props = ComponentPropsWithoutRef<typeof Container.Grid | typeof Text.H3>;

export const Summary: FC<Props> = ({ className, ...props }) => {
  const [_isOpen, setIsOpen] = useWarning();
  const cart = useAppSelector(selectInCart);
  const handleCheckout = () => setIsOpen(true);

  if (Object.entries(cart).length === 0) {
    return (
      <div className={cn(classes.summary, classes.summary_empty, className)}>
        <Text.H3 {...props} element="p" className={classes.summary__text}>
          The cart is empty
        </Text.H3>
      </div>
    );
  }

  return (
    <Container.Grid {...props} className={cn(classes.summary, className)}>
      <Products className={classes.summary__products} />
      <Checkout
        onCheckout={handleCheckout}
        className={classes.summary__checkout}
      />
    </Container.Grid>
  );
};
