import './ShopbarItemDyn.scss';
import { Link } from 'react-router-dom';

type Props = {
  productsLength: number;
  img: string;
  to: string;
};

const ShopbarItemDyn: React.FC<Props> = ({ productsLength, img, to }) => (
  <Link className="shopbar__item-dyn" to={to}>
    <div className="shopbar__item-dyn__count-block">
      {!!productsLength && (
        <span className="shopbar__item-dyn__count">
          {productsLength}
        </span>
      )}
      <img src={img} alt="icon" />
    </div>
  </Link>
);

export default ShopbarItemDyn;
