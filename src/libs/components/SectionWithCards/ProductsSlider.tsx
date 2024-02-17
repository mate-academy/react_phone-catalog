import cn from 'classnames';

import { createArray } from '../../utils/createArray';
import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';

import './ProductsSlider.scss';

type Props = {
  classNames?: string,
  title: string,
  hasSectionButtons?: boolean,
  cardsCount?: number,
};

export const ProductsSlider:React.FC<Props> = ({
  title,
  classNames,
  hasSectionButtons = false,
  cardsCount = 4,
}) => {
  const visibArr = createArray(cardsCount);

  return (
    <div
      className={cn('cards-container', classNames)}
    >
      <SectionHeader title={title} hasButtons={hasSectionButtons} />
      <div
        className="cards-container__cards"
        data-cy="cardsContainer"
      >
        {
          visibArr.map((el) => (
            <ProductCard
              key={el}
            />
          ))
        }
      </div>
    </div>
  );
};
