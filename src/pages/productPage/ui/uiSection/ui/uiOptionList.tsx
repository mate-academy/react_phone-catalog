import { Capacity, Colors } from '@shared/types';
import styles from '../../../styles/uiSection/optionList.module.scss';
import { Link } from 'react-router-dom';
import { getOption } from '../../../model';
import { useNavigationTracker } from '@features/index';

type Props = {
  options: Capacity[] | Colors[];
  heading: string;
  link: string[];
  active: Capacity | Colors;
};

export const UIOptionList = ({ options, heading, link, active }: Props) => {
  const isCapacity = parseInt(options[0]) > 0;
  const id = isCapacity ? 'Capacity options' : 'Color options';

  const { preserveFrom } = useNavigationTracker();

  return (
    <section className={styles['options-list']} aria-labelledby={id}>
      <h3 className={styles['options-list--heading']} id={id}>
        {heading}
      </h3>
      <ul className={styles['options-list--buttons']}>
        {options.map(el => (
          <li key={el} className={styles['options-list--item']}>
            <Link
              to={`/product/${getOption.link(el, link, isCapacity)}`}
              className={getOption.buttonStyle(el, isCapacity, active)}
              style={getOption.colorToHex(el, isCapacity)}
              aria-label={`Select ${el} model`}
              aria-current={active ? 'page' : undefined}
              onClick={e =>
                preserveFrom(
                  e,
                  `/product/${getOption.link(el, link, isCapacity)}`,
                )
              }
            >
              {isCapacity && el}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
