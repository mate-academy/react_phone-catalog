import React, { useMemo } from 'react';
import styles from './ProductSlider.module.scss';
import { Slider } from '../Slider';
import { ProductCard } from '../ProductCard';
import { useCart } from '../../../../hooks/context/useCart';
import { useFavorite } from '../../../../hooks/context/useFavorite';
import { ProductType } from '../../../../shared/types/ProductType';
import { ProductCardSkeleton } from '../../../../shared/UI/Skeletons/ProductCardSkeleton';
import { createArray } from '../../utils/createArray';

interface Props {
  title: React.ReactNode;
  products: ProductType[];
  sortFn?: (item1: ProductType, item2: ProductType) => number;
  cardCount?: number;
  saleVisidle?: boolean;
  loading?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  sortFn,
  cardCount,
  saleVisidle = false,
  loading,
}) => {
  const readyProducts = useMemo(() => {
    let result = [...products];

    if (sortFn) {
      result.sort(sortFn);
    }

    if (typeof cardCount === 'number') {
      result = result.slice(0, cardCount);
    }

    return result;
  }, [products, sortFn, cardCount]);

  const { toogleProductFromBag, haveItemInBag } = useCart();
  const { toogleProductFromFavourite, haveItemInFavourite } = useFavorite();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.slider}>
        <Slider
          type="product"
          breakpoints={{ [0]: 1, [320]: 1.2, [640]: 2.5, [1200]: 4 }}
          showButton={true}
          showDots={false}
          buttonsClassNames={styles.buttons}
        >
          {loading
            ? createArray(4).map((_, i) => <ProductCardSkeleton key={i} />)
            : readyProducts.map(item => (
                <ProductCard
                  key={item.id}
                  className={styles.item}
                  fullPrice={saleVisidle ? item.fullPrice : undefined}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  descriptions={{
                    screen: item.screen,
                    capacity: item.capacity,
                    ram: item.ram,
                  }}
                  category={item.category}
                  itemId={item.itemId}
                  toBag={haveItemInBag(item.itemId)}
                  toFavourite={haveItemInFavourite(item.itemId)}
                  onPrimaryButton={() => toogleProductFromBag(item.itemId)}
                  onFavoriteButton={() =>
                    toogleProductFromFavourite(item.itemId)
                  }
                />
              ))}
        </Slider>
      </div>
    </section>
  );
};
