"use client";

import { useProductsStore, useReservoirsStore } from "@/stores";
import React, { useState } from "react";
import { ReservoirUpdate } from "@/types";

export default function Select({
  tempPropertiesProductId,
  setTempPropertiesAction,
}: {
  tempPropertiesProductId: number;
  setTempPropertiesAction: React.Dispatch<
    React.SetStateAction<ReservoirUpdate>
  >;
}) {
  const { currentReservoir } = useReservoirsStore();
  const { products } = useProductsStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div>
      <div>
        <button
          disabled={currentReservoir?.isLocked}
          onClick={() => setIsVisible(!isVisible)}
        >
          {products && (
            <span>
              {
                products.find(
                  (product) => product.id === tempPropertiesProductId,
                )?.name
              }
            </span>
          )}
        </button>
      </div>
      <div>
        <ul>
          {isVisible &&
            products
              .filter((product) => product.id !== tempPropertiesProductId)
              .map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => {
                      setTempPropertiesAction((prev) => ({
                        ...prev,
                        productId: product.id,
                      }));
                      setIsVisible(false);
                    }}
                  >
                    <span>{product.name}</span>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
