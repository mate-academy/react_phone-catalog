import { Sceleton } from '../../../../shared/ui/Sceleton/Sceleton';
import cls from './productCard.module.scss';

export const ProductsCardSceleton = () => {
  return (
    <div className={cls.productCard}>
      <div className={cls.productCard__body}>
        <Sceleton height={202} width={'100%'} />

        <div className={cls.productCard__content}>
          <Sceleton
            className={cls.productCard__name}
            height={58}
            width={'100%'}
          />
          <Sceleton
            className={cls.productCard__price}
            height={31}
            width={'100%'}
          />
          <Sceleton
            className={cls.productCard__characteristics}
            height={102}
            width={'100%'}
          />
          <Sceleton
            className={cls.productCard__buttons}
            height={40}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};
