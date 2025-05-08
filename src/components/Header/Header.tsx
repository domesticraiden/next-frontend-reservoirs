"use client";

import { useReservoirsStore } from "@/stores";
import { ReservoirCreate } from "@/types";

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
    <div>
      <div>
        <div>
          {/*<div></div>*/}
          <h1>Панель администрирования резервуаров</h1>
        </div>
        <button onClick={handleCreateReservoir}>
          <span>Добавить резервуар</span>
        </button>
      </div>
      <button>
        <span>Экран резервуаров</span>
      </button>
    </div>
  );
}
