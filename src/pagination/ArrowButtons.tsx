/* eslint-disable */
import "./pagination.scss";

type Props = {
  action: () => void
}

export const ArrowForward: React.FC<Props> = ({ action }) => {

  return (
    <div
      className="button-square ml-16"
      onClick={action}
      data-cy="paginationRight"
    >
      <img src="./img/icons/arrowLeftBlack.svg" alt="img" />
    </div>
  )
}

export const ArrowBack: React.FC<Props> = ({ action }) => {

  return (
    <div
      className="button-square mr-16"
      onClick={action}
      data-cy="paginationLeft"
    >
      <img src="./img/icons/arrow3.svg" alt="img" />
    </div>
  )
}
