import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { ProductDetail } from '../../../../types/productDetail';
import styles from './PanelOptions.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  gold: '#FFD700',
  yellow: '#FFFF00',
  green: '#008000',
  midnightgreen: '#004953',
  silver: '#C0C0C0',
  spacegray: '#717378',
  red: '#FF0000',
  white: '#FFFFFF',
  purple: '#800080',
  coral: '#FF7F50',
  rosegold: '#B76E79',
  midnight: '#011635',
  spaceblack: '#323233',
  blue: '#0000FF',
  pink: '#FFC0CB',
  sierrablue: '#BFDAF7',
  graphite: '#41424C',
  'space gray': '#717378',
  'space-gray': '#717378',
  'rose gold': '#b76e79',
  'sky-blue': '#87CEEB',
  starlight: '#bcc0cc',
};

type Option = 'capacity' | 'color';

const getLink = (
  products: ProductDetail[],
  query: string,
  type: Option,
): string => {
  switch (type) {
    case 'capacity':
      const founded = products.find(product => product.capacity === query);

      return founded ? founded.id : '';
    case 'color':
      const founded2 = products.find(product => product.color === query);

      return founded2 ? founded2.id : '';
  }
};

type Props = {
  similar: ProductDetail[];
  current: ProductDetail;
};

export const PanelOptions: React.FC<Props> = ({ similar, current }) => {
  const products = useAppSelector(state => state.store.products);
  const id = products.find(product => product.itemId === current.id)?.id;

  return (
    <div className={styles.PanelOptions}>
      <div className={styles.PanelOptions__colors}>
        <p>Available colors</p>
        <span>{`ID: ${id?.toString().padStart(8, '0')}`}</span>
        <ul className={styles.PanelOptions__colorsList}>
          {current.colorsAvailable.map(color => (
            <Link
              key={color}
              to={`phones/${getLink(similar, color, 'color')}`}
              className={styles.PanelOptions__color}
              style={{ backgroundColor: COLOR_MAP[color] }}
            ></Link>
          ))}
        </ul>
      </div>
      <hr />
      <div className={styles.Galery__img}></div>
    </div>
  );
};
