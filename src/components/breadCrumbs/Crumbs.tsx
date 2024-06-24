import { Link } from "react-router-dom";
import Styles from './Crumbs.module.scss'

type Props = {
  path: string[];
  details?: string;
}

export const Crumbs: React.FC<Props> = () => {
  return (
    <div className={Styles.crumbs}>
            <Link to={'/'}>
              <img
                className={Styles.crumbs__home}
                src=".\img\svg\Home.svg"
                alt="home"
              />
            </Link>

            <img src=".\img\svg\arrow_right_active.svg" alt="arrow right" />

            <Link to={'/phones'}>
              <p className={Styles.crumbs__paragraph}>Phones</p>
            </Link>
          </div>
  )
};
