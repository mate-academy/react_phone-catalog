import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './Breadcrumbs.scss';

type Props = {
  category: string;
  productName?: string;
};
export default function Breadcrumbs({ category, productName }: Props) {
  return (
    <div className="Breadcrumbs">
      <Link to={'/'}>
        <Icon name="home" />
      </Link>
      <Icon name="arrow-right" />
      <div className="Breadcrumbs__element fill">
        <Link to={`/${category}`}>{category}</Link>
      </div>
      {productName && (
        <>
          <Icon name="arrow-right" />
          <div className="Breadcrumbs__element">
            <Link to={``} className="Breadcrumbs__productname">
              {productName}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
