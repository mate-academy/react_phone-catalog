import { useState } from "react";
import styles from "./DropDownMenu.module.scss";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const optionsPagination = [
  { value: "all", label: "All" },
  { value: '4', label: "4" },
  { value: '8', label: "8" },
  { value: '16', label: "16" },
] as const;

const optionsFilter = [
  { value: "newest", label: "Newest" },
  { value: "alphabetically", label: "Alphabetically" },
  { value: 'cheapest', label: "Cheapest" },

] as const;


type Props = {
  value: string;
  onChange: (value: string) => void;
  type: 'filter' | 'pagination';
};

export const DropDownMenu: React.FC<Props> = ({ value, onChange , type}) => {
  const [isActive, setIsActive] = useState(false);
    const options = type === 'filter' ? optionsFilter : optionsPagination;
  const selectedOption = options.find((opt) => opt.value === value);

 const handleChange = (selected: { value: string; label: string }) => {
    if (selected) {
      onChange(selected.value);
    }
  };

  return (<><div className={styles.dropDown}>
    <label className={styles.dropDown__label} htmlFor="selectedLabel"> {type === 'filter' ? 'Sort by' : 'Items per page'}
    <div  id='selectedLabel' className={styles.dropDown__title}
    onClick={()=>{setIsActive((prev)=>!prev)}}>{selectedOption?.label || 'Select'}
        {!isActive ? <IoIosArrowDown className={styles.dropDown__arrow}/>:
<IoIosArrowUp className={styles.dropDown__arrow}/>}
    </div></label>
   {isActive && <ul className={styles.dropDown__list}>
      {options.map(opt => <li key={opt.value} className={styles.dropDown__item}
        onClick={() => {
          handleChange(opt)
          setIsActive(false)


         }}>{opt.label}</li >)}

        </ul >}</div></>)
};
