import { useEffect, useRef, useState } from 'react';
import { Product } from '../../../features/types/Product';
import { ProductCard } from '../../cards/ProductCard';
import {
  ArrowButton,
  ArrowButtonDirection,
  ArrowButtonOrigin,
} from '../ArrowButton';
import cl from './SlidingProdList.module.scss';
import { useWidthRecalculate } from '../../../app/hooks';
import { SectionTitle } from '../../titles/SectionTitle';

type Props = {
  list: Product[];
  name: string;
};

export const SlidingProdList: React.FC<Props> = ({ name, list }) => {
  // for buttons disabling
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const cardRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // from app/hooks
  const [cardWidth] = useWidthRecalculate(cardRef);

  useEffect(() => {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      // when u start moving ul, canScrollLeft becomes true
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        // if u scrolled left to more px that hidden content width, button becomes disabled
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [listRef.current?.scrollLeft]);

  // for arrow buttons
  const scrollLeft = (amount: number) => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollLeft += amount;
  };

  return (
    <>
      <div className={cl.topContainer}>
        <SectionTitle text={name} />
        <div className={cl.topContainer__buttonContainer}>
          <ArrowButton
            direction={ArrowButtonDirection.LEFT}
            origin={ArrowButtonOrigin.ONLIST}
            onClick={() => scrollLeft(-cardWidth - 16)}
            disabled={!canScrollLeft}
          />
          <ArrowButton
            direction={ArrowButtonDirection.RIGHT}
            origin={ArrowButtonOrigin.ONLIST}
            onClick={() => scrollLeft(cardWidth + 16)}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      <ul className={cl.prodList} ref={listRef}>
        {list.map(prod => (
          <li key={prod.id} ref={cardRef} className={cl.prodList__item}>
            <ProductCard product={prod} />
          </li>
        ))}
      </ul>
    </>
  );
};
