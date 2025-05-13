import Image from "next/image";
import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <Image
              src="/icons/warning_icon.svg"
              width={20}
              height={20}
              alt="Иконка предупреждения"
            />
          </div>
          <h4>Обратите внимание</h4>
        </div>
        <div className={styles.text}>
          <p>{message}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.active} onClick={onConfirm}>
            <span>Подтвердить</span>
          </button>
          <button onClick={onCancel}>
            <span>Отменить</span>
          </button>
        </div>
      </div>
    </div>
  );
}
