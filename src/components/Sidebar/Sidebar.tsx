"use client";

import { useState } from "react";
import { useReservoirsStore } from "@/stores";

export default function Sidebar() {
  const { renderedReservoirs, renderReservoirs } = useReservoirsStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        {isOpen ? (
          <input
            type="text"
            onChange={(e) => renderReservoirs(e.target.value)}
          />
        ) : (
          <h3>Список резервуаров</h3>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          <span>{/*<div></div>*/}</span>
        </button>
      </div>
      <div>
        {renderedReservoirs.length > 0 ? (
          <ul>
            {renderedReservoirs.map((reservoir) => (
              <li key={reservoir.id}>
                <button>
                  <span>{reservoir.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Резервуаров нет</p>
        )}
      </div>
    </div>
  );
}
