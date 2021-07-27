import React from "react";
import { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import './Select.scss'

const classNames = require('classnames')

interface Props {
  // text: string;
  label?: string;
  keyInUrl?: string
  onChange?: (a: any) => any;
  options: {
    value: string;
    text: string | number;
  }[]
}

export const Select: React.FC<Props> = ({label, keyInUrl = '', onChange = () => {}, options}) => {
  const [active, setActive] = useState(false);
  const selector = useRef<HTMLDivElement>(null)
  // let [optionsBlock, selectOptionsBlock] = useState({} as HTMLDivElement)
  
  const location = useLocation()
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search)
  const valueInParam = searchParams.get(keyInUrl);

  const [selectedOption, selectOption] = useState(
    keyInUrl
    ? (options.find(
        (option) => option.value === searchParams.get(keyInUrl)
      ) || options[0])
    : options[0]);
  
  useEffect(() => {
    selectOption(
      keyInUrl
      ? (options.find(
        (option) => option.value === searchParams.get(keyInUrl)
        ) || options[0])
        : options[0]);
      }, [valueInParam, keyInUrl, options, searchParams])
      
  return (
    <div className="select-container">
      <span className="text_color_gray small-text">{label}</span>
      <div
        ref={selector}
        tabIndex={0}
        onBlur={() => setActive(false)}
        className={classNames([
          'select-container__select',
          {'select-container__select_active': active}
        ])}
        onClick={() => {
          setActive(!active)
          if(selector.current && !active) {
            selector.current.focus()
          }
        }}
        >
        <div className="select__text">
          {selectedOption.text}
        </div>
        <div
        className={classNames([
          'select__options-block',
          {'select__options-block_closed': !active}
        ])}
      >
        {
          options.map((option) => (
            <div
              className='options-block__option'
              key={option.text}
              onClick={
                () => {
                  onChange(searchParams)
                  if(keyInUrl) {
                   searchParams.set(keyInUrl, option.value)
                    history.push({search: searchParams.toString()})
                  }
                  setActive(false)
                  selectOption(option)
                }
              }
            >
              {option.text}
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}
