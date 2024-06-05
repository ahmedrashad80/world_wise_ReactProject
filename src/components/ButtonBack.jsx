import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      className={`${styles.btn} ${styles.back}`}
    >
      &larr; back{" "}
    </button>
  );
}

export default ButtonBack;
