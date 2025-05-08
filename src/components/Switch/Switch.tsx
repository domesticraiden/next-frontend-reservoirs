"use client";

import { useReservoirsStore } from "@/stores";

export default function Switch() {
  const { currentReservoir, toggleLockReservoir, fetchReservoir } =
    useReservoirsStore();

  const handleToggleLock = async () => {
    if (currentReservoir) {
      await toggleLockReservoir(
        currentReservoir.id,
        !currentReservoir.isLocked,
      );
      await fetchReservoir(currentReservoir.id);
    }
  };

  return (
    <div>
      <button onClick={handleToggleLock}></button>
    </div>
  );
}
