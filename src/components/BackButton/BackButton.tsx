import { useNavigate } from 'react-router-dom';
import styles from "./BackButton.module.scss";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["back-button"]}>
          <button
            className={styles["back-button__block"]}
            onClick={() => navigate(-1)}
            >
            <img
              src="./img/chevron-left.svg"
              alt="logo"
              className={styles["back-button__img"]}
            />
            <p className={styles["back-button__name"]}>Back</p>
          </button>
        </div>
    </>
  )
}
