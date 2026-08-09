import { ProductDetails } from '../../../../types/Product';
import style from './ProductTechSpect.module.scss';

type Props = {
  data: ProductDetails;
};

export const ProductTachSpect: React.FC<Props> = ({ data }) => {
  return (
    <section className={style.techSpect}>
      <h3 className={style.titleTechSpect}>Tech specs</h3>
      <div className={style.specificationList}>
        <div className={style.leftTechSpect}>
          <p className={style.paragraph}>Screen</p>
          <p className={style.paragraph}>Resolution</p>
          <p className={style.paragraph}>Processor</p>
          <p className={style.paragraph}>Ram</p>
          <p className={style.paragraph}>Camera</p>
        </div>
        <div className={style.rightTechSpect}>
          <p className={style.paragraph}>{data.screen}</p>
          <p className={style.paragraph}>{data.resolution}</p>
          <p className={style.paragraph}>{data.processor}</p>
          <p className={style.paragraph}>{data.ram}</p>
          <p className={style.paragraph}>{data.camera}</p>
        </div>
      </div>
    </section>
  );
};
