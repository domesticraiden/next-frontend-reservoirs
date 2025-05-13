"use client";

import { useProductsStore, useReservoirsStore } from "@/stores";
import React, { useState } from "react";
import { ReservoirUpdate } from "@/types";
import Image from "next/image";
import styles from "./Select.module.css";

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
    <div className={styles.body}>
      <div className={styles.container}>
        <button
          className={styles.current}
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
          {!isVisible ? (
            <div>
              <Image
                src="/icons/selectOpen_icon.svg"
                width={7}
                height={14}
                alt="Иконка открытия селекта"
              />
            </div>
          ) : (
            <div>
              <Image
                src="/icons/selectClose_icon.svg"
                width={7}
                height={14}
                alt="Иконка закрытия селекта"
              />
            </div>
          )}
        </button>
      </div>
      <div>
        {isVisible && (
          <ul className={styles.list}>
            {products
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
        )}
      </div>
    </div>
  );
}
