import { useLocation } from 'react-router-dom';
import { capitalize } from '../../helpers/utils';
import { HomeLink, CategoryLink, ProductName } from './links';
import './Breadcrumbs.scss';

type Props = {
  productName?: string,
};

export const Breadcrumbs:React.FC<Props> = ({
  productName = '',
}) => {
  const { pathname } = useLocation();
  const links = pathname.split('/');
  const categoryName = links[1];

  return (
    <div className="breadcrumbs">
      <HomeLink />
      <CategoryLink
        name={capitalize(categoryName)}
        path={`/${categoryName}`}
        isLastLink={productName === ''}
      />
      {productName && <ProductName name={productName} />}
    </div>
  );
};
