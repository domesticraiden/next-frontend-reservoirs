"use client";

import { useState } from "react";

export default function Properties() {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleFocusBlur = () => {
    setIsFocus(!isFocus);
  };

  return (
    <div>
      <div>
        <h2>Информация о резервуаре</h2>
      </div>
      {/*<div></div>*/}
      <div>
        <form>
          <div>
            {/*<div></div>*/}
            <input
              type="text"
              onFocus={handleFocusBlur}
              onBlur={handleFocusBlur}
            />
            {isFocus && (
              <div>
                <button>
                  <span>{/*<div></div>*/}</span>
                </button>
                <button>
                  <span>{/*<div></div>*/}</span>
                </button>
              </div>
            )}
          </div>
          {/*<div></div>*/}
          <div>
            {/*<div></div>*/}
            <input type="number" />
          </div>
          <div>
            <button>
              <span>Тонны</span>
            </button>
            <button>
              <span>%</span>
            </button>
          </div>
          <div>
            {/*<div></div>*/}
            <input type="number" />
          </div>
          <div>
            <button>
              <span>Сохранить</span>
            </button>
            <button>
              <span>Отменить</span>
            </button>
          </div>
          <div>
            {/*<div></div>*/}
            <p>Резервуар не заблокирован</p>
            {/*<div></div>*/}
          </div>
          <div>
            <button>
              <span>Удалить резервуар</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
