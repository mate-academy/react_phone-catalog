import { useNavigate } from 'react-router-dom';
import { useFavoriteContext } from '../../../FavoriteContext';
import products from '../../../new/products.json';
import { ProductCards } from '../../ProductCards/ProductCards';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './Basket.scss';
import PrevArrow from './BasketImage/PrevArrow.svg';

export const Basket = () => {
  const navigation = useNavigate();
  const { basketLength } = useFavoriteContext();
  const { basket } = useFavoriteContext();

  const filtration = products.filter(
    (product) => basket.includes(product.id.toString()),
  );

  return (
    <>
      {basketLength < 1 ? (
        <NotFoundPage
          title="Basket"
          h1="Basket Products not found"
          text="The products are not selected.
       To make a choice, please return to the"
        />
      ) : (
        <>

          <div className="prev-to-back">
            <button
              type="button"
              className="prev-to-back"
              onClick={() => navigation(-1)}
            >
              <img src={PrevArrow} alt="PrevArrow" />
              <p className="block-forPageNotFound__text-1-1">Back</p>
            </button>
          </div>

          <h1 className="h1ForBasket">
            Cart
          </h1>

          <div
            className="blockBasket"
          >
            {filtration.map((product) => (
              <ProductCards key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>

  );
};
