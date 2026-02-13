import { Link } from 'react-router-dom';
import '../BannerSlider.scss';
import { Category } from '../../../../types/category';

type Props = {
  imgUrl: string;
  alt: string;
  category: Category;
  productId?: string;
};

export const Slide: React.FC<Props> = ({
  imgUrl,
  alt,
  category,
  productId = '',
}) => {
  return (
    <div className="slide">
      <Link to={`/${category}/${productId}`}>
        {' '}
        <img src={imgUrl} alt={alt} className="slide__img" />
      </Link>
    </div>
  );
};
