import { Reservoir, ReservoirCreate, ReservoirUpdate } from "@/types";
import { create } from "zustand";
import { reservoirsApi } from "@/api/services/reservoirs";

interface ReservoirsStoreState {
  reservoirs: Reservoir[];
  currentReservoir?: Reservoir;
  renderedReservoirs: Reservoir[];

  fetchReservoirs: () => Promise<void>;
  fetchReservoir: (id: number) => Promise<void>;
  createReservoir: (data: ReservoirCreate) => Promise<void>;
  deleteReservoir: (id: number) => Promise<void>;
  updateReservoir: (id: number, data: ReservoirUpdate) => Promise<void>;
  toggleLockReservoir: (id: number, isLocked: boolean) => Promise<void>;
  renderReservoirs: (name: string) => void;
}

export const useReservoirsStore = create<ReservoirsStoreState>((set) => ({
  reservoirs: [],
  currentReservoir: undefined,
  renderedReservoirs: [],

  fetchReservoirs: async () => {
    const data = await reservoirsApi.getReservoirs();
    set({ reservoirs: data });
  },
  fetchReservoir: async (id: number) => {
    const data = await reservoirsApi.getReservoir(id);
    set({ currentReservoir: data });
  },
  createReservoir: async (data: ReservoirCreate) => {
    const newReservoir = await reservoirsApi.createReservoir(data);
    set((state) => ({
      reservoirs: [...state.reservoirs, newReservoir],
      renderedReservoirs: [...state.renderedReservoirs, newReservoir],
    }));
  },
  deleteReservoir: async (id: number) => {
    await reservoirsApi.deleteReservoir(id);
    set((state) => ({
      reservoirs: state.reservoirs.filter((reservoir) => reservoir.id !== id),
      renderedReservoirs: state.renderedReservoirs.filter(
        (reservoir) => reservoir.id !== id,
      ),
    }));
  },
  updateReservoir: async (id: number, data: ReservoirUpdate) => {
    const updatedReservoir = await reservoirsApi.updateReservoir(id, data);
    set((state) => ({
      reservoirs: state.reservoirs.map((reservoir) =>
        reservoir.id === id ? updatedReservoir : reservoir,
      ),
      renderedReservoirs: state.renderedReservoirs.map((reservoir) =>
        reservoir.id === id ? updatedReservoir : reservoir,
      ),
    }));
  },
  toggleLockReservoir: async (id: number, isLocked: boolean) => {
    const updatedReservoir = await reservoirsApi.toggleLockReservoir(
      id,
      isLocked,
    );
    set((state) => ({
      reservoirs: state.reservoirs.map((reservoir) =>
        reservoir.id === id ? updatedReservoir : reservoir,
      ),
      renderedReservoirs: state.renderedReservoirs.map((reservoir) =>
        reservoir.id === id ? updatedReservoir : reservoir,
      ),
    }));
  },
  renderReservoirs: (name: string) => {
    set((state) => ({
      renderedReservoirs: state.reservoirs.filter((reservoir) =>
        reservoir.name.toLowerCase().includes(name.toLowerCase()),
      ),
    }));
  },
}));
