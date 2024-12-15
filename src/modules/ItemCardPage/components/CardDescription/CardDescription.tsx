import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../api/hooks';
import styles from './CardDescription.module.scss';

const CardDescription = () => {
  const device = useAppSelector(state => state.device.currentDevice);
  const { t } = useTranslation();

  return (
    <section className={styles.block}>
      <div className={styles.about}>
        <h3 className={styles.title}>{t('h2About')}</h3>
        {device?.description.map(el => (
          <div className={styles.subblock} key={el.title}>
            <h4 className={styles.subtitle}>{el.title}</h4>
            <p className={styles.text}>{el.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.techChecs}>
        <h3 className={styles.title}>{t('h2Tech')}</h3>
        <div className={styles.charachters}>
          <div className={styles.charachter}>
            <span className={styles.key}>{t('screen')}</span>
            <span className={styles.value}>{device?.screen}</span>
          </div>
          <div className={styles.charachter}>
            <span className={styles.key}>{t('resolution')}</span>
            <span className={styles.value}>{device?.resolution}</span>
          </div>
          <div className={styles.charachter}>
            <span className={styles.key}>{t('proccessor')}</span>
            <span className={styles.value}>{device?.processor}</span>
          </div>
          <div className={styles.charachter}>
            <span className={styles.key}>{t('memory')}</span>
            <span className={styles.value}>{device?.ram}</span>
          </div>
          {device?.camera && (
            <div className={styles.charachter}>
              <span className={styles.key}>{t('camera')}</span>
              <span className={styles.value}>{device?.camera}</span>
            </div>
          )}
          {device?.zoom && (
            <div className={styles.charachter}>
              <span className={styles.key}>{t('zoom')}</span>
              <span className={styles.value}>{device?.zoom}</span>
            </div>
          )}
          <div className={styles.charachter}>
            <span className={styles.key}>{t('cell')}</span>
            <span className={styles.value}>{device?.cell}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDescription;
