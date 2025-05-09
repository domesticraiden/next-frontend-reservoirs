"use client";

import React, { useEffect, useState } from "react";
import { useReservoirsStore } from "@/stores";
import { ReservoirUpdate } from "@/types";
import Select from "@/components/Select/Select";
import Switch from "@/components/Switch/Switch";
import Modal from "@/components/Modal/Modal";

export default function Properties() {
  const {
    currentReservoir,
    deleteReservoir,
    resetCurrentReservoir,
    updateReservoir,
    toggleLockReservoir,
    fetchReservoir,
  } = useReservoirsStore();

  const [tempProperties, setTempProperties] = useState<ReservoirUpdate>({
    name: "",
    productId: 1,
    capacity: 1,
    volume: 0,
  });

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isPercentage, setIsPercentage] = useState<boolean>(false);

  const [capacityInput, setCapacityInput] = useState<string>("");
  const [volumeInput, setVolumeInput] = useState<string>("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const setCurrentProperties = () => {
      if (currentReservoir) {
        setIsPercentage(false);
        setTempProperties({
          name: currentReservoir.name,
          productId: currentReservoir.productId,
          capacity: currentReservoir.capacity,
          volume: currentReservoir.volume,
        });

        setCapacityInput(String(Math.max(0, currentReservoir.capacity)));
        setVolumeInput(String(Math.max(0, currentReservoir.volume)));
      }
    };

    setCurrentProperties();
  }, [currentReservoir]);

  const setCurrentProperties = () => {
    if (currentReservoir) {
      setIsPercentage(false);
      setTempProperties({
        name: currentReservoir.name,
        productId: currentReservoir.productId,
        capacity: currentReservoir.capacity,
        volume: currentReservoir.volume,
      });

      setCapacityInput(String(Math.max(0, currentReservoir.capacity)));
      setVolumeInput(String(Math.max(0, currentReservoir.volume)));
    }
  };

  const handleChangeName = () => {
    if (currentReservoir) {
      updateReservoir(currentReservoir.id, tempProperties).then((response) =>
        console.log(response),
      );
    }
  };

  const handleRevertChangeName = () => {
    if (currentReservoir)
      setTempProperties((prev) => ({ ...prev, name: currentReservoir.name }));
  };

  const convertVolumeValueToPercentage = (
    value: number,
    toPercentage: boolean,
  ) => {
    if (toPercentage) {
      return tempProperties.capacity > 0
        ? (value / tempProperties.capacity) * 100
        : 0;
    } else return (value / 100) * tempProperties.capacity;
  };

  const validateNumericInput = (value: string): string => {
    return value.replace(/\D/g, "");
  };

  const handleDelete = () => {
    // Открывает модальное окно для подтверждения удаления
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentReservoir) {
      deleteReservoir(currentReservoir.id).then((response) =>
        console.log(response),
      );
      resetCurrentReservoir();
      setIsDeleteModalOpen(false);
    }
  };

  const confirmLock = () => {
    if (currentReservoir) {
      toggleLockReservoir(currentReservoir.id, true).then(() => {
        fetchReservoir(currentReservoir.id).then((response) =>
          console.log(response),
        );
      });
      setIsLockModalOpen(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Информация о резервуаре</h2>
      </div>
      {/*<div></div>*/}
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            {/*<div></div>*/}
            <input
              type="text"
              disabled={currentReservoir?.isLocked}
              value={tempProperties.name}
              onChange={(e) =>
                setTempProperties((prev) => ({ ...prev, name: e.target.value }))
              }
              onFocus={() => setIsFocus(true)}
              onBlur={() =>
                setTimeout(() => {
                  if (currentReservoir)
                    setTempProperties((prev) => ({
                      ...prev,
                      name: currentReservoir.name,
                    }));
                  setIsFocus(false);
                }, 100)
              }
              maxLength={16}
            />
            {isFocus &&
              currentReservoir &&
              tempProperties.name !== currentReservoir.name && (
                <div>
                  <button onClick={handleChangeName}>
                    <span>{/*<div></div>*/}</span>
                  </button>
                  <button onClick={handleRevertChangeName}>
                    <span>{/*<div></div>*/}</span>
                  </button>
                </div>
              )}
          </div>
          <div>
            {/*<div></div>*/}
            <Select
              tempPropertiesProductId={tempProperties.productId}
              setTempPropertiesAction={setTempProperties}
            />
          </div>
          <div>
            {/*<div></div>*/}
            <input
              type="text"
              inputMode="numeric"
              disabled={currentReservoir?.isLocked}
              value={capacityInput}
              onChange={(e) => {
                const value = validateNumericInput(e.target.value);
                setCapacityInput(value);

                if (value !== "") {
                  const numValue = Math.max(1, Number(value));

                  setTempProperties((prev) => {
                    if (!isPercentage && prev.volume > numValue) {
                      setVolumeInput(String(numValue));
                      return {
                        ...prev,
                        capacity: numValue,
                        volume: numValue,
                      };
                    }

                    return {
                      ...prev,
                      capacity: numValue,
                    };
                  });
                }
              }}
              onBlur={() => {
                if (capacityInput === "" || Number(capacityInput) < 1) {
                  setCapacityInput("1");
                  setTempProperties((prev) => ({
                    ...prev,
                    capacity: 1,
                  }));
                }

                if (
                  !isPercentage &&
                  tempProperties.volume > tempProperties.capacity
                ) {
                  setTempProperties((prev) => ({
                    ...prev,
                    volume: tempProperties.capacity,
                  }));
                  setVolumeInput(String(tempProperties.capacity));
                }
              }}
            />
          </div>
          <div>
            <button
              disabled={currentReservoir?.isLocked || !isPercentage}
              onClick={() => {
                if (isPercentage) {
                  const newVolume = Math.max(
                    0,
                    convertVolumeValueToPercentage(
                      tempProperties.volume,
                      false,
                    ),
                  );

                  setTempProperties((prev) => ({
                    ...prev,
                    volume: newVolume,
                  }));
                  setVolumeInput(String(newVolume));
                  setIsPercentage(false);
                }
              }}
            >
              <span>Тонны</span>
            </button>
            <button
              disabled={currentReservoir?.isLocked || isPercentage}
              onClick={() => {
                if (!isPercentage) {
                  const newVolume = convertVolumeValueToPercentage(
                    tempProperties.volume,
                    true,
                  );

                  setTempProperties((prev) => ({
                    ...prev,
                    volume: newVolume,
                  }));
                  setVolumeInput(String(newVolume));
                  setIsPercentage(true);
                }
              }}
            >
              <span>%</span>
            </button>
          </div>
          <div>
            {/*<div></div>*/}
            <input
              type="text"
              disabled={currentReservoir?.isLocked}
              value={volumeInput}
              onChange={(e) => {
                const value = validateNumericInput(e.target.value);
                setVolumeInput(value);

                if (value !== "") {
                  const numValue = Math.max(0, Number(value));
                  const maxValue = isPercentage ? 100 : tempProperties.capacity;
                  const validValue = Math.min(numValue, maxValue);

                  setTempProperties((prev) => ({
                    ...prev,
                    volume: validValue,
                  }));

                  if (numValue !== validValue) {
                    setVolumeInput(String(validValue));
                  }
                }
              }}
              onBlur={() => {
                if (volumeInput === "" || Number(volumeInput) < 0) {
                  setVolumeInput("0");
                  setTempProperties((prev) => ({
                    ...prev,
                    volume: 0,
                  }));
                }
              }}
            />
            {isPercentage && <span>%</span>}
          </div>
          <div>
            <button
              onClick={() => {
                if (currentReservoir)
                  updateReservoir(currentReservoir.id, tempProperties).then(
                    (response) => console.log(response),
                  );
                setIsPercentage(false);
              }}
              disabled={currentReservoir?.isLocked}
            >
              <span>Сохранить</span>
            </button>
            <button
              onClick={setCurrentProperties}
              disabled={currentReservoir?.isLocked}
            >
              <span>Отменить</span>
            </button>
          </div>
          <div>
            {/*<div></div>*/}
            <p>
              {currentReservoir?.isLocked
                ? "Резервуар заблокирован"
                : "Резервуар не заблокирован"}
            </p>
            <Switch
              onToggleRequest={(newState) => {
                if (newState) {
                  setIsLockModalOpen(true);
                }
              }}
            />
          </div>
          <div>
            <button
              disabled={currentReservoir?.isLocked}
              onClick={handleDelete}
            >
              <span>Удалить резервуар</span>
            </button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        message="Вы действительно хотите удалить этот резервуар? Это действие нельзя будет отменить."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <Modal
        isOpen={isLockModalOpen}
        message="Вы действительно хотите заблокировать этот резервуар? Это предотвратит любые изменения, пока резервуар не будет разблокирован."
        onConfirm={confirmLock}
        onCancel={() => setIsLockModalOpen(false)}
      />
    </div>
  );
}
