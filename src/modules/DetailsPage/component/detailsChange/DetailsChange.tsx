import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './DetailsChange.module.scss';

export const DetailsChange = ({ colors, models }) => {
  const navigate = useNavigate()
  const {category}=useParams()
  const handleChangeColor = (color) => {
  const model = models.find(model => model.color === color);
  if (model) {
    navigate(`/${category}/${model.id}`);
  }
};
  return (<>
    <div className={styles.container}>
      <div className={styles.colors}>
        <div className={styles.colors__title}>
          <span className={styles.colors__text}>Available colors</span>
          <span className={styles.colors__text}>{`ID:` }</span>
        </div>
       <ul className={styles.colors__list}>
  {colors.map(color => (
    <li key={color} onClick={()=>handleChangeColor(color)} className={styles.colors__link}  style={{ backgroundColor: color }}>

    </li>
  ))}
</ul>
      </div>
    </div></>)
}
