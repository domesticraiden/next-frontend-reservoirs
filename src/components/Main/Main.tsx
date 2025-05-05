"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import Properties from "@/components/Properties/Properties";
import { useProductsStore, useReservoirsStore } from "@/stores";
import { useEffect, useState } from "react";

export default function Main() {
  const { fetchReservoirs, currentReservoir, renderReservoirs } =
    useReservoirsStore();
  const { fetchProducts } = useProductsStore();

  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservoirsData = async () => {
      await fetchReservoirs();
      if (isInitialState) {
        renderReservoirs("");
        setIsInitialState(false);
      }
    };

    fetchReservoirsData().then((response) => console.log(response));

    const intervalId = setInterval(() => {
      fetchReservoirs().then((response) => console.log(response));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchReservoirs, isInitialState, renderReservoirs]);

  useEffect(() => {
    fetchProducts().then((response) => console.log(response));
  }, [fetchProducts]);

  return (
    <div>
      <Sidebar />
      {currentReservoir && <Properties />}
    </div>
  );
}
