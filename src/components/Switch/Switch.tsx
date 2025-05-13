"use client";

import { useReservoirsStore } from "@/stores";
import styles from "./Switch.module.css";
import { useEffect, useState } from "react";

interface SwitchProps {
  onToggleRequest?: (newState: boolean) => void;
}

export default function Switch({ onToggleRequest }: SwitchProps) {
  const { currentReservoir, toggleLockReservoir, fetchReservoir } =
    useReservoirsStore();

  const [newState, setNewState] = useState<boolean>(false);

  useEffect(() => {
    if (currentReservoir) setNewState(currentReservoir.isLocked);
  }, [currentReservoir]);

  const handleOnChange = async () => {
    if (currentReservoir) {
      const willBeLocked = !currentReservoir.isLocked;

      if (willBeLocked && onToggleRequest) {
        onToggleRequest(willBeLocked);
        return;
      }

      setNewState(willBeLocked);
      await toggleLockReservoir(currentReservoir.id, willBeLocked);
      await fetchReservoir(currentReservoir.id);
    }
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={newState}
        onChange={handleOnChange}
        className={styles.switch_input}
      />
      <span className={styles.switch_slider} />
    </label>
  );
}
