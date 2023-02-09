import { Button } from '../Button/Button';
import './PagesList.scss';

export const PagesList:React.FC<any> = ({
  setCurrentPage, currentPage, buttonsNumber,
}) => {
  const isSelected = (one: any) => {
    return currentPage === one;
  };

  return (
    <div className="product-page__buttons">
      <Button
        className="arrow left small"
        image="/icons/Chevron (Arrow Left).svg"
        alt="<"
        onClick={() => {
          if (currentPage <= 1) {
            return;
          }

          setCurrentPage((prev: number) => prev - 1);
        }}
      />
      <ul className="product-page__buttons-list">
        {
          [...Array(buttonsNumber)].map((one, index) => {
            return (

              <li
                key={one}
                className="product-page__buttons-item"
              >
                <Button
                  className={`arrow small ${isSelected(index + 1) && 'active-button'}`}
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                  num={index + 1}
                  alt={index + 1}

                />
              </li>
            );
          })
        }
      </ul>
      <Button
        className="arrow right small"
        image="/icons/Chevron (Arrow Right).svg"
        onClick={() => {
          if (currentPage >= buttonsNumber) {
            return;
          }

          setCurrentPage((prev: number) => prev + 1);
        }}
        alt=">"
      />
    </div>
  );
};
