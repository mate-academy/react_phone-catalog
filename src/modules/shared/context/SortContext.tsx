// import {
//   createContext,
//   useState,
//   type Dispatch,
//   type SetStateAction,
// } from 'react';
// import { SortByAmount, SortByProp } from '../Enum/Sort';
// import { useSearchParams } from 'react-router-dom';

// type SortContextType = {
//   selectedSortBy: SortByProp;
//   setSelectedSortBy: Dispatch<SetStateAction<SortByProp>>;
//   selectedSortByAmount: SortByAmount;
//   setSelectedSortByAmount: Dispatch<SetStateAction<SortByAmount>>;
//   dropdownIsActive: boolean;
//   setDropdownIsActive: Dispatch<SetStateAction<boolean>>;
// };

// export const SortContext = createContext<SortContextType>({
//   selectedSortBy: SortByProp.NEWEST,
//   setSelectedSortBy: () => {},
//   selectedSortByAmount: SortByAmount.FOUR,
//   setSelectedSortByAmount: () => {},
//   dropdownIsActive: false,
//   setDropdownIsActive: () => {},
// });

// export const SortProvider = ({ children }: { children: React.ReactNode }) => {
//   const [selectedSortBy, setSelectedSortBy] = useState<SortByProp>(
//     SortByProp.NEWEST,
//   );
//   const [selectedSortByAmount, setSelectedSortByAmount] =
//     useState<SortByAmount>(SortByAmount.FOUR);

//   const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);

//   return (
//     <SortContext.Provider
//       value={{
//         selectedSortBy,
//         setSelectedSortBy,
//         selectedSortByAmount,
//         setSelectedSortByAmount,
//         dropdownIsActive,
//         setDropdownIsActive,
//       }}
//     >
//       {children}
//     </SortContext.Provider>
//   );
// };
