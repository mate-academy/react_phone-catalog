import cn from 'classnames';
import './ShopbarItemDyn.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  productsLength: number;
  img: string;
  to: string;
};

const linkClasses = ({ isActive }: { isActive: boolean }) => cn(
  'shopbar__item-dyn',
  { active: isActive },
);

const ShopbarItemDyn: React.FC<Props> = ({
  productsLength,
  img,
  to,
}) => (
  <NavLink className={linkClasses} to={to}>
    <div className="shopbar__item-dyn__count">
      {!!productsLength && (
        <span className="shopbar__item-dyn__count__item">
          {productsLength}
        </span>
      )}
      <img src={img} alt="icon" />
    </div>
  </NavLink>
);

export default ShopbarItemDyn;
