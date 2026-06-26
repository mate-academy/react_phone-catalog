import NotFoundPageStyles from './NotFoundPage.module.scss';
import background from '../../imgs/not-found-background.png';

export const NotFoundPage = () => {
  return (
    <div className={NotFoundPageStyles.imageBox}>
      <img
        src={background}
        alt=""
        className={NotFoundPageStyles.imageBox__image}
      />
    </div>
  );
};
