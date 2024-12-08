import { useCallback } from 'react';

import cn from 'classnames';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

import CloseIcon from '@assets/images/icons/close-icon.svg?react';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';
import { Counter } from '@shared/components/Counter';
import { EmptyProducts } from '@shared/components/EmptyProducts';
import { Skeleton } from '@shared/components/Skeleton';
import { useStoredProducts } from '@shared/contexts/StoredProducts';
import { useMedia } from '@shared/hooks/useMedia';
import { DefaultProps } from '@shared/types/common';
import { StoredProductModel } from '@shared/types/Product/Product.model';
import { formatNumberToCurrency } from '@shared/utils/currencyFormatters';

import styles from './CartList.module.scss';

interface CartListProps extends DefaultProps {
  products: StoredProductModel[] | null;
  isLoading?: boolean;
}

export const CartList: React.FC<CartListProps> = ({
  products,
  className,
  isLoading,
  ...rest
}) => {
  const { storedProducts, updateStoredProducts } = useStoredProducts();
  const { isMobile } = useMedia();

  const handleChangeQuantity = useCallback(
    (id: string, value: number) => {
      updateStoredProducts({
        productId: id,
        value,
        storedKey: 'cartProducts',
        action: 'addValue',
        storedProducts,
      });
    },
    [storedProducts, updateStoredProducts],
  );

  const handleRemoveProduct = useCallback(
    (id: string, productName: string) => {
      updateStoredProducts({
        productId: id,
        storedKey: 'cartProducts',
        action: 'remove',
        storedProducts,
        callback: () => {
          toast.success(
            `${productName} has been removed from the cart successfully`,
          );
        },
      });
    },

    [storedProducts, updateStoredProducts],
  );

  if (isLoading) {
    return (
      <Box className={cn(className)}>
        <Skeleton
          fullWidth
          height={isMobile ? 148 : 115}
          gap={16}
          quantity={3}
          direction="column"
        />
      </Box>
    );
  }

  if (!products || !products.length) {
    return <EmptyProducts variant="cart" description="Cart is empty" />;
  }

  return (
    <List className={cn(styles.cartList, className)} {...rest}>
      {products?.map(
        ({ id, images, name, priceDiscount, priceRegular, quantity }) => {
          const productHref = `/products/${id}`;

          return (
            <ListItem key={id} className={styles.cartItem}>
              <CloseIcon
                className={styles.closeBtn}
                onClick={() => {
                  handleRemoveProduct(id, name);
                }}
              />

              <NavLink
                to={productHref}
                className={styles.imageLink}
                state={{ from: '/cart' }}
              >
                <img src={images[0]} alt={name} />
              </NavLink>

              <NavLink
                to={productHref}
                className={styles.titleLink}
                state={{ from: '/cart' }}
              >
                <Text variant="body" className={styles.title}>
                  {name}
                </Text>
              </NavLink>

              <Counter
                initialValue={quantity}
                value={quantity}
                onAdd={value => {
                  handleChangeQuantity(id, value);
                }}
                onSubtract={value => {
                  handleChangeQuantity(id, value);
                }}
              />

              <Text variant="h3" className={styles.price}>
                {formatNumberToCurrency(priceDiscount ?? priceRegular)}
              </Text>
            </ListItem>
          );
        },
      )}
    </List>
  );
};
