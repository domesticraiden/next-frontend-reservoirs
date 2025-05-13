"use client";

import { useReservoirsStore } from "@/stores";
import { ReservoirCreate } from "@/types";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const { createReservoir } = useReservoirsStore();

  const handleCreateReservoir = async () => {
    const newReservoir: ReservoirCreate = {
      name: "Новый резервуар",
      capacity: 1,
      volume: 0,
      productId: 1,
      isLocked: false,
    };

    await createReservoir(newReservoir);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            src="/icons/settings_icon.svg"
            width={20}
            height={20}
            alt="Управление резервуарами"
          />
          <h1>Панель администрирования резервуаров</h1>
        </div>
        <button className={styles.button} onClick={handleCreateReservoir}>
          <span>Добавить резервуар</span>
        </button>
      </div>
      <button className={styles.button}>
        <span>Экран резервуаров</span>
      </button>
    </div>
  );
}
