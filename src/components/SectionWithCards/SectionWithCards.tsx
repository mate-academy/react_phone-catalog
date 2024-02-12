import cn from 'classnames';
import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import './SectionWithCards.scss';

type Props = {
  classNames?: string,
  title: string,
  hasSectionButtons?: boolean,
  cardsCount?: number,
};

export const SectionWithCards:React.FC<Props> = ({
  title,
  classNames,
  hasSectionButtons = false,
  cardsCount = 4,
}) => {
  const createArr = (count: number) => {
    const arr = [];

    for (let i = 0; i < count; i += 1) {
      arr.push(i);
    }

    return arr;
  };

  const visibArr = createArr(cardsCount);

  return (
    <div className={cn('section', classNames)}>
      <SectionHeader title={title} hasButtons={hasSectionButtons} />
      <div className="section__cards">
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
