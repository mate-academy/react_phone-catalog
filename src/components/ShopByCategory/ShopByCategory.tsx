import styles from './ShopByCategory.module.scss';
import { categorys } from '../../data/categoryData';
import { useNavigate } from 'react-router-dom';

export const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleClick = pag => {
    navigate(`/${pag}`);
  };

  /* eslint-disable */
  return (
    <div className={styles.containerShopByCategory}>
      <h1 className={styles.containerShopByCategory__titleCategories}>
        Shop by category
      </h1>

      <div className={styles.containerShopByCategory__containerCategoris}>
        {categorys.map((categorys, index) => (
          <div
            className={styles.containerShopByCategory__divCategory}
            key={index}
          >
            <div
              className={styles.containerShopByCategory__divCategory__Button}
              style={{ backgroundColor: categorys.color }}
              onClick={() => handleClick(categorys.to)}
            >
              <img
                src={categorys.image}
                alt="imagem de categoria"
                className={
                  styles.containerShopByCategory__divCategory__Button__img
                }
              />
            </div>

            <div
              className={
                styles.containerShopByCategory__divCategory__dateCategory
              }
            >
              <h2
                className={
                  styles.containerShopByCategory__divCategory__dateCategory__nameCategory
                }
              >
                {categorys.name}
              </h2>
              <h6
                className={
                  styles.containerShopByCategory__divCategory__dateCategory__changeModels
                }
              >
                {categorys.models}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  /* eslint-enable */
};
