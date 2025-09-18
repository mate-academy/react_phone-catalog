// import { Link, NavLink } from 'react-router-dom';
// import styles from '../Header/Header.module.scss';
// import { MenuLink } from '../../types/menuLink';
// import classNames from 'classnames';

// const menuLinks: MenuLink[] = [
//   { to: '/', label: 'GitHub' },
//   { to: '/contacts', label: 'Contacts' },
//   { to: '/right', label: 'Right' },
// ];

// export const Footer: React.FC = () => {
//   return (
//     <footer className={styles.menu}>
//       <div className={styles.container}>
//         <div className={styles.menu__left}>
//           <Link to="/" className={styles.menu__logoImg}>
//             <img
//               src="/img/logo/logo.png"
//               alt="Nice gadgets logo"
//               className={styles.logo__image}
//             />
//           </Link>

//           <nav className={styles.nav}>
//             <ul className={styles.nav__list}>
//               {menuLinks.map(link => (
//                 <li key={link.to} className={styles.nav__item}>
//                   <NavLink
//                     to={link.to}
//                     className={({ isActive }) =>
//                       classNames(styles.nav__link, {
//                         [styles.isActive]: isActive,
//                       })
//                     }
//                   >
//                     {link.label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         <div className={styles.menu__icons}>
//           <a href="#" className={styles.menu__iconsTop}>
//             <span className={styles.menu__iconsText}>Back to top</span>
//             <img
//               src="/img/icons/top_button.png"
//               alt="Top button"
//               className={styles.nav__icons}
//             />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };
