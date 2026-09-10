import { Categories } from '@/types/Categories';
import { AddToCartButton } from '../AddToCartButton';
import { FavoriteButton } from '../FavoriteButton';
import styles from './ProductCard.module.scss';
import { DetailsLink } from '../DetailsLink';
import { ProductPrice } from '../ProductPrice';
import { ProductSpecs } from '../ProductSpecs';
import { Divider } from '../Divider';

interface Props {
  id: number;
  category: Categories;
  itemId: string;
  imgURL: string;
  title: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductCard = ({
  id,
  category,
  itemId,
  imgURL,
  title,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}: Props) => {
  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  return (
    <div className={styles.productCard}>
      <DetailsLink category={category} itemId={itemId}>
        <img src={imgURL} alt={title} className={styles.img} />
      </DetailsLink>

      <DetailsLink category={category} itemId={itemId}>
        <p className={styles.title}>{title}</p>
      </DetailsLink>

      <ProductPrice price={price} fullPrice={fullPrice} />

      <Divider />

      <ProductSpecs specs={specs} />

      <div className={styles.buttons}>
        <AddToCartButton id={id} />
        <FavoriteButton id={id} />
      </div>
    </div>
  );
};
