import React, { ComponentProps, FC } from 'react';
import { Link, To } from 'react-router-dom';

import classes from './productCard.module.scss';
import cn from 'classnames';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Icon } from '../ui/Icon';

type Props = Omit<ComponentProps<'article'>, 'children'> & {
  product: {
    image: string;
    name: string;
    price: number;
    fullPrice?: number | null;
    screen: string;
    capacity: string;
    ram: string;
  };
  to: To;
  isFavourite: boolean;
  handleFavouriteClick: () => void;
  isInCart: boolean;
  handleAddToCart: () => void;
};

export const ProductCard: FC<Props> = ({
  product: { capacity, fullPrice, image, name, price, ram, screen },
  isFavourite,
  handleFavouriteClick,
  handleAddToCart,
  isInCart,
  to,
  className,
  ...props
}) => {
  const isCheaper = price < Number(fullPrice);

  return (
    <article {...props} className={cn(classes.card, className)}>
      <Link to={to} className={classes.card__imgLink}>
        <img src={image} alt={name} className={classes.card__img} />
      </Link>
      <Link to={to} className={classes.card__nameLink}>
        <Text element="h3" className={classes.card__name}>
          {name}
        </Text>
      </Link>
      <div className={classes.card__prices}>
        <Text variant="heading-3" className={classes.card__regularPrice}>
          {price}
        </Text>
        {isCheaper && (
          <span className={classes.card__fullPrice}>{fullPrice}</span>
        )}
      </div>
      <ul className={classes.card__specs}>
        <li className={classes.card__spec}>
          <Text className={classes.card__specTitle} variant="small">
            Screen
          </Text>
          <span className={classes.card__specValue}>{screen}</span>
        </li>
        <li className={classes.card__spec}>
          <Text className={classes.card__specTitle} variant="small">
            Capacity
          </Text>
          <span className={classes.card__specValue}>{capacity}</span>
        </li>
        <li className={classes.card__spec}>
          <Text className={classes.card__specTitle} variant="small">
            RAM
          </Text>
          <span className={classes.card__specValue}>{ram}</span>
        </li>
      </ul>
      <div className={classes.card__buttons}>
        <Button
          onClick={handleAddToCart}
          variant={isInCart ? 'inversed' : 'regular'}
          className={classes.card__addToCartButton}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>
        <Checkbox
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={classes.card__addToCartFavourites}
          checked={isFavourite}
          onChange={handleFavouriteClick}
        >
          <Icon variant={isFavourite ? 'heart-fill' : 'heart'} />
        </Checkbox>
      </div>
    </article>
  );
};
