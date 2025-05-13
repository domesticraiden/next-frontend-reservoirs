"use client";

import React, { useEffect, useState } from "react";
import { useReservoirsStore } from "@/stores";
import { ReservoirUpdate } from "@/types";
import Select from "@/components/Select/Select";
import Switch from "@/components/Switch/Switch";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import styles from "./Properties.module.css";

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
    <div className={styles.body}>
      <div className={styles.title}>
        <h2>Информация о резервуаре</h2>
      </div>
      <div className={styles.art}>
        <Image
          src="/arts/reservoir_art.svg"
          width={200}
          height={200}
          alt="Иллюстрация резервуара"
        />
      </div>
      <div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={`${styles.field} ${styles.nameField}`}>
            <div className={styles.icon}>
              <Image
                src="/icons/reservoirName_icon.svg"
                width={20}
                height={20}
                alt="Иконка имени резервуара"
              />
            </div>
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
                <div className={styles.nameActions}>
                  <button
                    className={styles.nameAction}
                    onClick={handleChangeName}
                  >
                    <span>
                      <div>
                        <Image
                          src="/icons/reservoirNameAccept_icon.svg"
                          width={19}
                          height={14}
                          alt="Принять изменение имени резервуара"
                        />
                      </div>
                    </span>
                  </button>
                  <button
                    className={`${styles.nameAction} ${styles.nameActionRevert}`}
                    onClick={handleRevertChangeName}
                  >
                    <span>
                      <div>
                        <Image
                          src="/icons/reservoirNameDeny_icon.svg"
                          width={14}
                          height={14}
                          alt="Отменить изменение имени резервуара"
                        />
                      </div>
                    </span>
                  </button>
                </div>
              )}
          </div>
          <div className={styles.field}>
            <div className={styles.icon}>
              <Image
                src="/icons/reservoirProduct_icon.svg"
                width={20}
                height={20}
                alt="Иконка вместимости резервуара"
              />
            </div>
            <Select
              tempPropertiesProductId={tempProperties.productId}
              setTempPropertiesAction={setTempProperties}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.icon}>
              <Image
                src="/icons/reservoirCapacity_icon.svg"
                width={20}
                height={20}
                alt="Иконка вместимости резервуара"
              />
            </div>
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
          <div className={styles.types}>
            <button
              className={styles.type}
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
              className={styles.type}
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
          <div className={styles.field}>
            <div className={styles.icon}>
              <Image
                src="/icons/reservoirVolume_icon.svg"
                width={20}
                height={20}
                alt="Иконка объема резервуара"
              />
            </div>
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
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.action} ${styles.save}`}
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
              className={styles.action}
              onClick={setCurrentProperties}
              disabled={currentReservoir?.isLocked}
            >
              <span>Отменить</span>
            </button>
          </div>
        </form>
        <div className={`${styles.lock} ${styles.field}`}>
          <div className={styles.icon}>
            <Image
              src="/icons/reservoirLock_icon.svg"
              width={20}
              height={20}
              alt="Иконка блокировки резервуара"
            />
          </div>
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
            className={styles.delete}
            disabled={currentReservoir?.isLocked}
            onClick={handleDelete}
          >
            <span>Удалить резервуар</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        message="Вы действительно хотите удалить резервуар?"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <Modal
        isOpen={isLockModalOpen}
        message="Вы действительно хотите заблокировать резервуар?"
        onConfirm={confirmLock}
        onCancel={() => setIsLockModalOpen(false)}
      />
    </div>
  );
}
