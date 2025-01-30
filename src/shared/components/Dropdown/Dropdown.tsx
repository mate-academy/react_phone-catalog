import { useState, useEffect, useRef } from 'react';
import s from './Dropdown.module.scss';

interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({
  label,
  options,
  selectedValue,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.Dropdown} ref={dropdownRef}>
      <div className={s.DropdownLabel} onClick={toggleMenu}>
        {label}
        <div className={s.DropdownHeader}>
          {selectedValue}
          <div className={`${s.Icon} ${isOpen ? s.Up : s.Down}`} />
        </div>
      </div>
      {isOpen && (
        <div className={s.DropdownMenu}>
          {options.map(option => (
            <div
              key={option}
              className={s.DropdownOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// export const Dropdown = () => {
//   const [selectedSort, setSelectedSort] = useState('Newest');
//   const [selectedItems, setSelectedItems] = useState('4');
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [isItemsOpen, setIsItemsOpen] = useState(false);

//   const sortRef = useRef<HTMLDivElement>(null);
//   const itemsRef = useRef<HTMLDivElement>(null);

//   const handleSortChange = (value: string) => setSelectedSort(value);
//   const handleItemsChange = (value: string) => setSelectedItems(value);

//   const toggleSortMenu = () => setIsSortOpen(prev => !prev);
//   const toggleItemsMenu = () => setIsItemsOpen(prev => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
//         setIsSortOpen(false);
//       }

//       if (
//         itemsRef.current &&
//         !itemsRef.current.contains(event.target as Node)
//       ) {
//         setIsItemsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className={s.DropdownField}>
//       <div className={s.Dropdown} ref={sortRef}>
//         <div className={s.DropdownLabel} onClick={toggleSortMenu}>
//           Sort by
//           <div className={s.DropdownHeader}>
//             {selectedSort}
//             <div className={`${s.Icon} ${isSortOpen ? s.Up : s.Down}`} />
//           </div>
//         </div>
//         {isSortOpen && (
//           <div className={s.DropdownMenu}>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleSortChange('Newest');
//                 toggleSortMenu();
//               }}
//             >
//               Newest
//             </div>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleSortChange('Alphabetically');
//                 toggleSortMenu();
//               }}
//             >
//               Alphabetically
//             </div>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleSortChange('Cheapest');
//                 toggleSortMenu();
//               }}
//             >
//               Cheapest
//             </div>
//           </div>
//         )}
//       </div>

//       <div className={s.Dropdown} ref={itemsRef}>
//         <div className={s.DropdownLabel} onClick={toggleItemsMenu}>
//           Items on page
//           <div className={s.DropdownHeader}>
//             {selectedItems}
//             <div className={`${s.Icon} ${isItemsOpen ? s.Up : s.Down}`} />
//           </div>
//         </div>
//         {isItemsOpen && (
//           <div className={s.DropdownMenu}>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleItemsChange('4');
//                 toggleItemsMenu();
//               }}
//             >
//               4
//             </div>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleItemsChange('8');
//                 toggleItemsMenu();
//               }}
//             >
//               8
//             </div>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleItemsChange('16');
//                 toggleItemsMenu();
//               }}
//             >
//               16
//             </div>
//             <div
//               className={s.DropdownOption}
//               onClick={() => {
//                 handleItemsChange('All');
//                 toggleItemsMenu();
//               }}
//             >
//               All
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
