import './Category.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  to: string,
  srcImg: string,
  title: string,
  count: number,
};

export const Category: React.FC<Props> = ({
  to,
  srcImg,
  title,
  count,
}) => {
  return (
    <div className="category">
      <div className="category__box">
        <Link
          to={to}
          className="category__link"
        >
          <div
            className={classNames(
              'category__image-box',
              {
                'category__image-box--phone': title === 'Mobile phones',
              },
              {
                'category__image-box--tablet': title === 'Tablets',
              },
              {
                'category__image-box--accessory': title === 'Accessories',
              },
            )}
          >
            <img
              src={srcImg}
              alt={srcImg}
              className="category__image"
            />
          </div>
        </Link>

        <Link
          to={to}
          className="category__title"
        >
          {title}
        </Link>

        <div className="category__discription">
          {`${count} models`}
        </div>
      </div>
    </div>
  );
};
