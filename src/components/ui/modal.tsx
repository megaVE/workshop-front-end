import { XCircle } from "./x-circle";
import styles from "./modal.module.css";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  handleClosePopup: () => void;
}

export function Modal({ children, handleClosePopup }: ModalProps) {
  const handleCloseOnEsc = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;

    handleClosePopup();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCloseOnEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseOnEsc);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <button
          type="button"
          className={styles.close}
          onClick={handleClosePopup}
        >
          <XCircle size="3" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
