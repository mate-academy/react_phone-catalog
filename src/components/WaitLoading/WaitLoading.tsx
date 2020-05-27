
import './WaitLoading.scss';
import React, { useEffect, useState } from 'react';


export const WaitLoading = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      if (count > 7) {
        setCount(0);
        return;
      };
      setCount(count + 1);
    }, 100)
  }, [count])

  let arr = new Array();
  arr.length = 7;
  arr.fill(0);

  return (
    <div className="WaitLoading">
      <h2>{`Please wait. Data is loading.`}</h2>
      <div className="WaitLoading__spinner">
        {arr.map((_, index) => {
          return (
            <span
            key={index}
              className={count === index
                ? "WaitLoading__box WaitLoading__box--active"
                : "WaitLoading__box"}>
            </span>
          )
        })}


      </div>
    </div>
  )
}


