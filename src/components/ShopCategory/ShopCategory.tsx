import { Link } from 'react-router-dom';
import style from './ShopCategory.module.scss';

type Props = {
  path: string;
  title: string;
  count: number;
  image: string;
};

const ShopCategory: React.FC<Props> = ({ path, title, count, image }) => {
  return (
    <Link to={path} className={style.category}>
      <div className={style.banner}>
        <img className={style.img} src={image} alt="Banner" />
      </div>
      <h3 className={style.title}>{title}</h3>
      <h4 className={style.subtitle}>{count} models</h4>
    </Link>
  );
};

export default ShopCategory;
