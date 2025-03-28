import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './MainNewModels.module.scss';

export const MainNewModels = () => {
  return (
    <>
      <div className={`${styles.main_header_container}`}>
        <div className={`${styles.main_header_title_container}`}>
          <h2 className={`${styles.main_header_title}`}>Brand new models</h2>
        </div>
        <div className={`${styles.main_header_button_container}`}>
          <Button
            direction={ButtonDirection.left}
            isDisabled={true}
            backToTop={false}
          />
          <Button
            direction={ButtonDirection.right}
            isDisabled={false}
            backToTop={false}
          />
        </div>
      </div>
    </>
  );
};
