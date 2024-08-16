import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Loader.scss';

export const Loader = () => {

  const [clock, setClock] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClock(false)
    })
  }, [])

  return (
    <div className={classNames('Loader', {
      'Loader--initial': clock
    })}
      data-cy="Loader">
      <div className="Loader__content"/>
    </div>
  )
};
