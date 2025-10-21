import { HeroSection } from './components/HeroSection';
import style from './HomePage.module.scss';

// const PAGE_WIDTH = 450;
// export const Carusel = ({ children }) => {
//   const [pages, setPages] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);

//   const handleLeftArrowClick = () => {
//     setOffset(currentOffset => {
//       const newOffset = currentOffset + PAGE_WIDTH;
//       const newPage = Math.max(currentPage - 1, 0);

//       setCurrentPage(newPage);

//       return Math.min(newOffset, 0);
//     });
//   };

//   const handleRightArrowClick = () => {
//     setOffset(currentOffSet => {
//       const newOffset = currentOffSet - PAGE_WIDTH;

//       const maxOffset = -(PAGE_WIDTH * (pages.length - 1));

//       const newPage = Math.min(currentPage + 1, pages.length - 1);

//       setCurrentPage(newPage);

//       return Math.max(newOffset, maxOffset);
//     });
//   };

//   useEffect(() => {
//     setPages(
//       Children.map(children, child => {
//         return cloneElement(child, {
//           style: {
//             height: '100%',
//             minWidth: `${PAGE_WIDTH}px`,
//             maxWidth: `${PAGE_WIDTH}px`,
//           },
//         });
//       }),
//     );
//   }, [children]);

//   return (
//     <div className={style[`main-container`]}>
//       <div className={style.counter}>{currentPage + 1}</div>

//       <FaChevronLeft className={style.arrow} onClick={handleLeftArrowClick} />
//       <div className={style.window}>
//         <div
//           className={style[`all-items-container`]}
//           style={{
//             transform: `translateX(${offset}px)`,
//           }}
//         >
//           {pages}
//         </div>
//       </div>
//       <FaChevronRight className={style.arrow} onClick={handleRightArrowClick} />
//     </div>
//   );
// };

export const HomePage = () => {
  return (
    <>
      <main className={style.main}>
        <HeroSection />
      </main>

      {/* <Carusel>
        <div className={`${style.item} ${style[`item-1`]}`}>Item 1 </div>
        <div className={`${style.item} ${style[`item-2`]}`}>Item 2 </div>
        <div className={`${style.item} ${style[`item-3`]}`}>Item 3 </div>
        <div className={`${style.item} ${style[`item-4`]}`}>Item 4 </div>
      </Carusel> */}
    </>
  );
};
