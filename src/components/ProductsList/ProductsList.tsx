import React, { LegacyRef } from 'react'
import ProductCard from '../ProductCard'
import './ProductsList.scss'
import {Card} from '../../interfaces/Card'

const classNames = require('classnames')

interface Props {
  cardsArr: Card[];
  oneRow?: boolean;
  ref?: LegacyRef<HTMLDivElement> | null;
}

export const ProductsList: React.FC<Props> = ({ref = null,cardsArr, oneRow = false}) => (
  <div
    ref={ref}
    className={classNames([
      'products-list',
      {'products-list_one-row': oneRow}
    ])}
  >
    {(cardsArr as Array<Card|any>).map((card) => <ProductCard card={card} />)}
  </div>
)
