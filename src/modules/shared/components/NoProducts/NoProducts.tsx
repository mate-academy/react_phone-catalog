import { Link } from 'react-router-dom';
import './NoProducts.scss';
import { useContext } from 'react';
import { StateContext } from '../../../utils/GlobalStateProvider';
import classNames from 'classnames';

type Props = {
  title: string;
};

export const NoProducts: React.FC<Props> = ({ title }) => {
  const { isDarkThemeOn } = useContext(StateContext);

  return (
    <div
      className={classNames('no-products', {
        'no-products-white': !isDarkThemeOn,
      })}
    >
      <div className="no-products__info">
        <h1>{title}</h1>
        <small>Please, click icon to return</small>
      </div>

      <Link to={'..'}>
        <img src="img/icons/bag-noliked.svg" alt="product bag" />
      </Link>
    </div>
  );
};
