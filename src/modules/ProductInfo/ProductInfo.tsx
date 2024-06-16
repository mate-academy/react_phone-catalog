import { Gadget } from '../../utils/types/Gadget';
import styles from './ProductInfo.module.scss';

type Props = {
  currentGadget: Gadget;
};

export const ProductInfo: React.FC<Props> = ({ currentGadget }) => {
  const {
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = currentGadget;

  return (
    <div className={styles.productInfo}>
      <div className={styles.productInfo__wrapper}>
        <div className={styles.productInfo__about}>
          <h3 className={styles.productInfo__heading}>About</h3>
          {description.map(info => (
            <div key={info.title} className={styles.productInfo__body}>
              <h4 className={styles.productInfo__subHeading}>{info?.title}</h4>
              {info.text.map(text => (
                <p key={text} className={styles.productInfo__paragraph}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.productInfo__tech}>
          <div className={styles.productTech__sticky}>
            <h3 className={styles.productInfo__heading}>Tech specs</h3>
            <div className={styles['productTech-item']}>
              <div className={styles['productTech-item__wrapper']}>
                <h6 className={styles['productTech-item__named']}>Screen</h6>
                <p className={styles['productInfo-item__property']}>{screen}</p>
              </div>
            </div>
            <div className={styles['productTech-item']}>
              <div className={styles['productTech-item__wrapper']}>
                <h6 className={styles['productTech-item__named']}>
                  Resolution
                </h6>
                <p className={styles['productInfo-item__property']}>
                  {resolution}
                </p>
              </div>
            </div>
            <div className={styles['productTech-item']}>
              <div className={styles['productTech-item__wrapper']}>
                <h6 className={styles['productTech-item__named']}>Processor</h6>
                <p className={styles['productInfo-item__property']}>
                  {processor}
                </p>
              </div>
            </div>
            <div className={styles['productTech-item']}>
              <div className={styles['productTech-item__wrapper']}>
                <h6 className={styles['productTech-item__named']}>RAM</h6>
                <p className={styles['productInfo-item__property']}>{ram}</p>
              </div>
            </div>
            {camera && (
              <div className={styles['productTech-item']}>
                <div className={styles['productTech-item__wrapper']}>
                  <h6 className={styles['productTech-item__named']}>Camera</h6>
                  <p className={styles['productInfo-item__property']}>
                    {camera}
                  </p>
                </div>
              </div>
            )}
            {zoom && (
              <div className={styles['productTech-item']}>
                <div className={styles['productTech-item__wrapper']}>
                  <h6 className={styles['productTech-item__named']}>Zoom</h6>
                  <p className={styles['productInfo-item__property']}>{zoom}</p>
                </div>
              </div>
            )}
            <div className={styles['productTech-item']}>
              <div className={styles['productTech-item__wrapper']}>
                <h6 className={styles['productTech-item__named']}>Cell</h6>
                <p className={styles['productInfo-item__property']}>{cell}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
