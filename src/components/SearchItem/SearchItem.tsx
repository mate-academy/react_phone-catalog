import { Link } from 'react-router-dom';
import './SearchItem.scss';
import { HighlightText } from '../HighlightText';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  queryKeys: string[];
  onSearchBarOpen: (value: boolean) => void;
};

export const SearchItem: React.FC<Props> = ({
  product,
  queryKeys,
  onSearchBarOpen,
}) => {
  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className="search-item"
      onClick={() => onSearchBarOpen(false)}
    >
      <img
        src={product.image}
        alt="search-item-image"
        className="search-item__image"
      />
      <div className="search-item__name">
        <HighlightText text={product.name} keys={queryKeys} />
      </div>
    </Link>
  );
};
