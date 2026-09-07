import classNames from 'classnames';
import { Image } from '../../../../../../types/Image';
import styles from './CategoryItem.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  images: Image[];
  color: string;
  count: number;
};

export const CategoryItem: React.FC<Props> = ({
  name: name,
  images: images,
  color: color,
  count: count,
}) => {
  const webImg = images.filter(img => img.type === 'webp')[0];
  const pngImg = images.filter(img => img.type === 'png')[0];

  return (
    <Link to={`/${name}`} className={classNames(styles.item)}>
      <picture
        className={classNames(styles.item__banner)}
        style={{
          backgroundColor: color,
        }}
      >
        <source
          className={classNames(styles['item__banner-img'])}
          srcSet={webImg.url}
          type="image/webp"
        />
        <source
          className={classNames(styles['item__banner-img'])}
          srcSet={pngImg.url}
          type="image/png"
        />
        <img
          className={classNames(styles['item__banner-img'])}
          src={'img/product-not-found.png'}
          alt={name}
        />
      </picture>
      <h4 className={classNames(styles.item__title)}>{name}</h4>
      <div className={classNames(styles.item__count)}>
        <p>
          <span>{count}</span> models
        </p>
      </div>
    </Link>
  );
};
