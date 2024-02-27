import cn from 'classnames';
import { useState } from 'react';

export const Bunner = () => {
  const [isActive, setIsActive] = useState(1);
  // const [time, setTime] = useState(false);

  const changeImg = (param: number) => {
    let prevActive = 1;

    if (param > 0 && isActive < 3) {
      prevActive = (isActive + 1);
    }

    if (param < 0 && isActive > 1) {
      prevActive = (isActive - 1);
    }

    if (param < 0 && isActive === 1) {
      prevActive = (3);
    }

    return setIsActive(prevActive);
  };

  // const changeImgAuto = () => {
  // //   setTimeout(() => {
  // //     changeImgAuto();
  // // }, 1000);
  //   if (isActive === 1) {
  //     return setIsActive(2)
  //   }

  //   if (isActive === 2) {
  //     return setIsActive(3)
  //   }

  //   if (isActive === 3) {
  //     return setIsActive(1)
  //   }
  // }

  // console.log(time)

  return (
    <div className="wrap-bunner">
      <div className="bunner">
        <button
          className="bunner__button bunner__button-left"
          onClick={() => changeImg(-1)}
          type="button"
          tabIndex={0}
          aria-label="Previous Image"
        />
        <ul className="bunner__main">
          <li className="bunner__main__li">
            <img
              className="bunner__main__img"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/banner-phones.png"
              alt=""
              style={{ opacity: isActive !== 1 ? 0 : 1 }}
            />
          </li>
          <li className="bunner__main__li">
            <img
              className="bunner__main__img"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/banner-accessories.png"
              alt=""
              style={{ opacity: isActive !== 2 ? 0 : 1 }}
            />
          </li>
          <li className="bunner__main__li">
            <img
              className="bunner__main__img"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/banner-tablets.png"
              alt=""
              style={{ opacity: isActive !== 3 ? 0 : 1 }}
            />
          </li>
        </ul>
        <button
          className="bunner__button bunner__button-right"
          onClick={() => changeImg(+1)}
          type="button"
          tabIndex={0}
          aria-label="Previous Image"
        />
      </div>
      <div className="under-bunner">
        <div className={cn(
          'under-bunner__area',
          { 'under-bunner__area-active': isActive === 1 },
        )}
        />
        <div className={cn(
          'under-bunner__area',
          { 'under-bunner__area-active': isActive === 2 },
        )}
        />
        <div className={cn(
          'under-bunner__area',
          { 'under-bunner__area-active': isActive === 3 },
        )}
        />
      </div>
    </div>
  );
};
