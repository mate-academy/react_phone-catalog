import { getActiveClass } from '../../utils/getActiveClass';
import { NavBar } from '../NavBar';
import './TopBar.scss';
import { Link, NavLink } from 'react-router-dom';

const heartClass = getActiveClass('icon icon--heart top-bar__shopping-heart');
const bagClass = getActiveClass('icon icon--bag top-bar__shopping-bag');

export const TopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/" className="icon icon--logo top-bar__logo"></Link>

      <NavLink to="/menu" className="icon icon--menu top-bar__menu"></NavLink>

      <div className="top-bar__nav">
        <NavBar />
      </div>

      <div className="top-bar__shopping">
        <NavLink to="/favorites" className={heartClass}></NavLink>

        <NavLink to="/cart" className={bagClass}></NavLink>
      </div>
    </div>
  );
};
