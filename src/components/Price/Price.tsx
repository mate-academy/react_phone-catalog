import { Title } from '../Title';
import styles from './Price.module.scss';

type Props = {
  price: number;
  fullPrise?: number | null;
  levelTitle: number;
  levelTitleSize: number | string;
};

export const Price: React.FC<Props> = ({
  price,
  fullPrise,
  levelTitle,
  levelTitleSize,
}) => (
  <div className={styles.price}>
    <Title text={`$${price}`} level={levelTitle} levelSize={levelTitleSize} />
    {fullPrise && <p className={styles['price--discount']}>${fullPrise}</p>}
  </div>
);
