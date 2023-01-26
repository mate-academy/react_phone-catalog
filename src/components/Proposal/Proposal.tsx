import {
  FC, useEffect, useRef, useState,
} from 'react';
import { useAsyncValue, useParams } from 'react-router-dom';
import cn from 'classnames';
import { IconButton } from '../IconButton';
import { ProductsList } from '../ProductsList';
import { Product } from '../../types/Product';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Proposal.module.scss');

const {
  Proposal: proposal,
  Proposal__title: title,
  Proposal__top: top,
  Proposal__buttons: buttons,
  Proposal__ProductsList: productsList,
} = styles;

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Proposal: FC<Props> = ({ className = '', children }) => {
  const [transform, setTransform] = useState(0);
  const [minTransform, setMinTransform] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const products = useAsyncValue() as Product[];

  const block = useRef<HTMLDivElement>(null);

  const { productID } = useParams<{ productID: string }>();

  let shift: number;
  const maxTransform = 0;

  const updateTransformParams = () => {
    if (!block.current) {
      return;
    }

    const cardWidth = block.current.clientWidth < 1070 ? 250 : 270;
    const gap = 16;

    shift = cardWidth + gap;
    const frameSize = block.current.clientWidth < 1070
      ? Math.floor((block.current.clientWidth - gap) / shift)
      : Math.floor((block.current.clientWidth) / shift);

    setMinTransform(-(products.length - frameSize) * shift);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (transform >= maxTransform) {
        return;
      }

      setTransform((curr) => curr + shift);
    }

    if (direction === 'right') {
      if (transform <= minTransform) {
        return;
      }

      setTransform((curr) => curr - shift);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 0) {
      handleArrowClick('right');
    }

    if (diff < 0) {
      handleArrowClick('left');
    }

    setTouchStart(0);
  };

  useEffect(() => {
    updateTransformParams();
  });

  useEffect(() => {
    window.addEventListener('resize', updateTransformParams);

    return () => {
      window.removeEventListener('resize', updateTransformParams);
    };
  }, []);

  useEffect(() => {
    setTransform(0);
  }, [productID]);

  return (
    <div
      className={cn(
        proposal,
        className,
      )}
      ref={block}
    >
      <div className={top}>
        <h2 className={title}>
          {children}
        </h2>

        <div className={buttons}>
          <IconButton
            arrow={{
              direction: 'left',
              disabled: transform >= maxTransform,
            }}
            onClick={() => handleArrowClick('left')}
          />

          <IconButton
            arrow={{
              direction: 'right',
              disabled: transform <= minTransform,
            }}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <ProductsList
        products={products}
        className={productsList}
        cardTransform={transform}
        modifier="slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

Proposal.defaultProps = {
  className: '',
};
