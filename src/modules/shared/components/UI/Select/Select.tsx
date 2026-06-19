// import { useEffect, useRef, useState } from 'react';
// import styles from './Select.module.scss';

// type Option<TValue> = {
//   value: TValue;
//   label: string;
// };

// type Props<TValue> = {
//   id: string;
//   value: TValue;
//   options: Option<TValue>[];
//   onChange: (newValue: TValue) => void;
// };

// export const Select = <TValue extends string | number>({
//   value,
//   onChange,
//   options,
//   id,
// }: Props<TValue>) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const selectRef = useRef<HTMLDivElement>(null);

//   const currentOption = options.find(opt => opt.value === value);
//   const displayLabel = currentOption ? currentOption.label : 'Select';

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         selectRef.current &&
//         !selectRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className={styles.selectContainer} ref={selectRef}>
//       <button
//         id={id}
//         type="button"
//         className={`${styles.selectButton} ${isOpen ? styles.active : ''}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {displayLabel}
//       </button>

//       {isOpen && (
//         <ul>
//           {options.map(opt => (
//             <li
//               key={opt.value}
//               className={`${styles.customOption} ${opt.value === value ? styles.selected : ''}`}
//               onClick={() => {
//                 onChange(opt.value);
//                 setIsOpen(false);
//               }}
//             >
//               {opt.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
