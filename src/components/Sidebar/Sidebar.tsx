"use client";

import { useState } from "react";
import { useReservoirsStore } from "@/stores";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const {
    renderedReservoirs,
    renderReservoirs,
    fetchReservoir,
    resetCurrentReservoir,
    currentReservoir,
  } = useReservoirsStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.body}>
      <div className={styles.search}>
        {isOpen ? (
          <input
            type="text"
            onChange={(e) => {
              resetCurrentReservoir();
              renderReservoirs(e.target.value);
            }}
            placeholder="Введите название резервуара"
          />
        ) : (
          <h3>Список резервуаров</h3>
        )}
        <button
          className={`${isOpen && styles.active}`}
          disabled={!renderedReservoirs.length}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            <Image
              src="/icons/search_icon.svg"
              width={20}
              height={20}
              alt="Поиск резервуаров"
            />
          </span>
        </button>
      </div>
      <div className={styles.list}>
        {renderedReservoirs.length > 0 ? (
          <ul>
            {renderedReservoirs.map((reservoir) => (
              <li className={styles.listItem} key={reservoir.id}>
                <button
                  className={`${currentReservoir?.id === reservoir.id && styles.active}`}
                  onClick={() => fetchReservoir(reservoir.id)}
                >
                  <span>
                    {reservoir.name}
                    {reservoir.isLocked && (
                      <Image
                        src="/icons/lock_icon.svg"
                        width={20}
                        height={20}
                        alt="Резервуар заблокирован"
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Резервуаров нет</p>
        )}
      </div>
    </div>
  );
}
