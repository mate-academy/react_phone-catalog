import { ProductPage } from '../../types/ProductPage';
import { CardItem } from '../CardItem';
import './CardList.scss';

export const CardList = ({
  productsList,
  isFullPrice,
}: {
  productsList: ProductPage[];
  isFullPrice: boolean;
}) => {
  return (
    <>
      {productsList.map(product => (
        <CardItem
          key={product.id}
          cardItem={product}
          isFullPrice={isFullPrice}
        />
      ))}
    </>
  );
};
