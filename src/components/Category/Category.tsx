import categoryStyle from './Category.module.scss';
import { Categories, CategoriesType } from './Categories';
import { NavigationCard } from '../NavigationCard';
import classNames from 'classnames';

type Props = {
  counts: { [key in CategoriesType]: number };
};

export const Category = ({ counts }: Props) => {
  return (
    <div className="container">
      <section className={categoryStyle.category}>
        <h2 className={classNames('font-h2', categoryStyle.title)}>
          Shop by category
        </h2>
        <div className={categoryStyle.navigationCards}>
          {Object.values(Categories).map(category => (
            <NavigationCard
              key={category}
              category={category}
              count={counts[category]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
