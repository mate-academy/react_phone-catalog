import { NavLink } from 'react-router-dom';
import styles from '../../PhonePage/phonePage.module.scss';
import iconStyle from './transition.module.scss';

interface Props {
  filter?: string;
  itemName?: string;
}

export const TransitionComponent: React.FC<Props> = ({ filter, itemName }) => {
  return (
    <div className={iconStyle.transition}>
      <NavLink to={'/'}>
        <img
          src="img/Home.svg"
          alt="logo"
          className={iconStyle.transition_link}
        />
      </NavLink>
      <span>{' > '}</span>
      <div className={styles.phone_head}>
        <NavLink to={`/${filter}`} className={iconStyle.transition_link}>
          {filter}
        </NavLink>
      </div>
      {itemName && <span>{' > '}</span>}
      <div className={styles.phone_head}>
        <span className={iconStyle.transition_link}>{itemName}</span>
      </div>
    </div>
  );
};
