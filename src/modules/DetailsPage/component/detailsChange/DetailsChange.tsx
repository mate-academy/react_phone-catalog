import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './DetailsChange.module.scss';
import classNames from 'classnames';
import { FaRegCircle } from "react-icons/fa";

export const DetailsChange = ({ productCapacity, colors, models,productColor,capacity }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const findModel = (color, capacity) =>
  models.find(model => model.color === color && model.capacity === capacity);

const handleChangeColor = (color) => {
  const model = findModel(color, productCapacity);
  if (model) navigate(`/${category}/${model.id}`);
}
  const handleChangeCapacity = (storage) => {
  const model = findModel(productColor, storage);
  if (model) navigate(`/${category}/${model.id}`);
}

  return (<>
    <div className={styles.container}>
      <div className={styles.colors}>
        <div className={styles.colors__title}>
          <span className={styles.colors__text}>Available colors</span>
          <span className={styles.colors__text}>{`ID:` }</span>
        </div>
       <ul className={styles.colors__list}>
  {colors.map(color => (
    <li key={color} onClick={()=>handleChangeColor(color)} className={classNames(styles.colors__link, {[styles['colors__link--active']]: color === productColor})}  style={{ backgroundColor: color }}>
      <FaRegCircle className={styles.colors__rectangle } />
    </li>
  ))}
</ul>
      </div>
    </div>
      <div className={styles.container}>
      <div className={styles.storage}>
        <div className={styles.colors__title}>
          <span className={styles.colors__text}>Select capacity</span>

        </div>
       <ul className={styles.colors__list}>
  {capacity.map(storage => (
    <li key={storage} onClick={()=>handleChangeCapacity(storage)} className={classNames(styles.storage__link, {[styles['storage__link--active']]: storage ===  productCapacity})}  >
{storage}
    </li>
  ))}
</ul>
      </div>
    </div>
  </>)
}
