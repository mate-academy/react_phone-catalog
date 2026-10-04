// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import styles from './SearchIcon.module.scss';

// export const SearchIcon = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [query, setQuery] = useState('');

//   const openSearch = () => {
//     setIsSearchOpen(true);
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   return (
//     <div className={styles.search}>
//       {isSearchOpen ? (
//         <input
//           className={styles.input}
//           value={query}
//           onChange={handleSearch}
//           autoFocus
//         />
//       ) : (
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       )}
//     </div>
//   );
// };
