import './ShopByCategory.scss';
import { categories } from '../../Helpers/Variables';
import { Category } from './Category/Category';
import { Product } from '../../Types/Product';

type Props = {
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
};

export const ShopByCategory: React.FC<Props> = (
  { phones, tablets, accessories },
) => {
  return (
    <section className="shopByCategory">
      <h1 className="shopByCategory__title">Shop by Category</h1>
      <div className="shopByCategory__container">
        {categories.map((category) => {
          const {
            name, imgUrl, bgcColor, linkTo,
          } = category;
          let productsData: Product[] | [] = [];

          if (linkTo === '/phones') {
            productsData = phones;
          }

          if (linkTo === '/tablets') {
            productsData = tablets;
          }

          if (linkTo === '/accessories') {
            productsData = accessories;
          }

          return (
            <Category
              key={linkTo}
              name={name}
              imgUrl={imgUrl}
              color={bgcColor}
              to={linkTo}
              products={productsData}
            />
          );
        })}
      </div>
    </section>
  );
};
