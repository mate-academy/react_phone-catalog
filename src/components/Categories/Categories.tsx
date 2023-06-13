import './Categories.scss';

import { Category } from '../Category';

type Props = {
  phonesCount: number;
};

export const Categories: React.FC<Props> = ({
  phonesCount,
}) => {
  return (
    <>
      <h1 className="categories__title">Shop by category</h1>

      <div className="categories__items">
        <Category
          to="/phones"
          srcImg="_new/img/category-phones.png"
          title="Mobile phones"
          count={phonesCount}
        />

        <Category
          to="/tablets"
          srcImg="_new/img/category-tablets.png"
          title="Tablets"
          count={0}
        />

        <Category
          to="/accessories"
          srcImg="_new/img/category-accessories.png"
          title="Accessories"
          count={0}
        />
      </div>
    </>
  );
};
