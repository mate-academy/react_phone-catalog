import React from 'react';
import styles from './DropDown.module.scss'

type DropDownProps = {
  handleNumberOdProductPerPage: (newState: number) => void;
  numberOfProducts: number
}



export const DropDown: React.FC<DropDownProps> = ({handleNumberOdProductPerPage, numberOfProducts}) => {

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    if (value === 'all') {
      handleNumberOdProductPerPage(numberOfProducts)
    } else {
      handleNumberOdProductPerPage(Number(value))
    }

  }

  return (
    <select onChange ={handleSelectionChange} className={styles.select}>
      <option value="4">4</option>
      <option value="8">8</option>
      <option value="16" selected>16</option>
      <option value="all">All</option>
    </select>
  )
  }
