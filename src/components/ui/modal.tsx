import { XCircle } from "./x-circle";
import styles from "./modal.module.css";
import type { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  handleClosePopup: () => any;
}

export function Modal({ children, handleClosePopup }: ModalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <button
          type="button"
          className={styles.close}
          onClick={handleClosePopup}
        >
          <XCircle size="3rem" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
