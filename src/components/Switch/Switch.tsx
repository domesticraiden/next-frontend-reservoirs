"use client";

import { useReservoirsStore } from "@/stores";

interface SwitchProps {
  onToggleRequest?: (newState: boolean) => void;
}

export default function Switch({ onToggleRequest }: SwitchProps) {
  const { currentReservoir, toggleLockReservoir, fetchReservoir } =
    useReservoirsStore();

  const handleToggleLock = async () => {
    if (currentReservoir) {
      const newState = !currentReservoir.isLocked;

      if (newState && onToggleRequest) {
        onToggleRequest(newState);
        return;
      }

      await toggleLockReservoir(currentReservoir.id, newState);
      await fetchReservoir(currentReservoir.id);
    }
  };

  return (
    <div>
      <button onClick={handleToggleLock}></button>
    </div>
  );
}
