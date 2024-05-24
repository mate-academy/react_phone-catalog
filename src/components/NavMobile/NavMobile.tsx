// /* eslint-disable import/no-extraneous-dependencies */
// import Hamburger from 'hamburger-react';
// import './NavMobile.scss';
// import { useClickAway } from 'react-use';
// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { NavLink } from 'react-router-dom';
// import classNames from 'classnames';
// import { Favorites } from '../Favorites';
// import { Cart } from '../Cart';
// import { Logo } from '../Logo';
// import { PAGES } from '../../helpers/constants';

// export const NavMobile = () => {
//   const [isOpen, setOpen] = useState(false);
//   const ref = useRef(null);

//   useClickAway(ref, () => setOpen(false));

//   const activeClass = ({ isActive }: { isActive: boolean }) => {
//     return classNames(
//       'NavMobile__item',
//       { 'NavMobile__item--active': isActive },
//     );
//   };

//   return (
//     <>
//       <div className="NavMobile">
//         <Hamburger toggled={isOpen} size={10} toggle={setOpen} />
//       </div>

//       {isOpen && (
//         <motion.aside
//           className="NavMobile__menu"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="NavMobile__top">
//             <Logo onClick={() => setOpen(false)} />
//             <div className="NavMobile__menu-button">
//               <Hamburger toggled={isOpen} size={10} toggle={setOpen} />
//             </div>
//           </div>

//           <div className="NavMobile__navigation">
//             {PAGES.map(page => (
//               <NavLink
//                 to={`/${page === 'home' ? '' : page}`}
//                 key={page}
//                 className={activeClass}
//                 onClick={() => setOpen(false)}
//               >
//                 {page}
//               </NavLink>
//             ))}
//           </div>

//           <div className="NavMobile__bottom">
//             <div className="NavMobile__favorites">
//               <Favorites onClick={() => setOpen(false)} />
//             </div>
//             <Cart onClick={() => setOpen(false)} />
//           </div>
//         </motion.aside>
//       )}
//     </>
//   );
// };
