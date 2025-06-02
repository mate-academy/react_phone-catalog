import './Header.scss';
// import { useDevice } from '../../../context/DeviceContext';
// import { Link } from 'react-router-dom';

// export const Header = () => {
//   const { isMobile, menuBtn, setMenuBtn } = useDevice();

//   return (
//     <header className="App_header">
//       <div className="header">
//         <Link to="/" className="header_logo-conteiner">
//           <img src="img/Logo.jpg" alt="Logo" className="header_logo" />
//         </Link>

//         <div className="header_menu">
//           <div className="header_list">
//             {!isMobile && (
//               <>
//                 <Link to="/" className="header_item">
//                   Home
//                 </Link>
//                 <Link to="phones" className="header_item">
//                   Phones
//                 </Link>
//                 <Link to="tablets" className="header_item">
//                   Tablets
//                 </Link>
//                 <Link to="accessories" className="header_item">
//                   Accessories
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="header_buttons-right">
//           {/* {isMobile && (
//             <div className="header_icon header_icon-menu" onClick={() => setMenuBtn(prev => !prev)}>
//               <img
//                 src={menuBtn ? 'img/Close.svg' : 'img/Menu.svg'}
//                 alt="Menu icon"
//                 className="icon"
//               />
//             </div>
//           )} */}
//         </div>
//       </div>
//     </header>
//   );
// };
