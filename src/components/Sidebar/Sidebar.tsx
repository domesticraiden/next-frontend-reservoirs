"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        {isOpen ? <input type="text" /> : <h3>Список резервуаров</h3>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <span>{/*<div></div>*/}</span>
        </button>
      </div>
      {/*<div>*/}
      {/*  <p>Резервуаров нет</p>*/}
      {/*</div>*/}
    </div>
  );
}
