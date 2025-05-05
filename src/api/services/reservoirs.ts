import {
  Reservoir,
  ReservoirCreate,
  ReservoirToggleLock,
  ReservoirUpdate,
} from "@/types";
import { api } from "@/api";

export const reservoirsApi = {
  async getReservoirs(): Promise<Reservoir[]> {
    const response = await api.get<Reservoir[]>("reservoirs/");
    return response.data;
  },
  async getReservoir(id: number): Promise<Reservoir> {
    const response = await api.get<Reservoir>(`reservoirs/${id}`);
    return response.data;
  },
  async createReservoir(data: ReservoirCreate): Promise<Reservoir> {
    const response = await api.post<Reservoir>("reservoirs/", data);
    return response.data;
  },
  async deleteReservoir(id: number): Promise<Reservoir> {
    const response = await api.delete<Reservoir>(`reservoirs/${id}`);
    return response.data;
  },
  async updateReservoir(id: number, data: ReservoirUpdate): Promise<Reservoir> {
    const response = await api.put<Reservoir>(`reservoirs/${id}`, data);
    return response.data;
  },
  async toggleLockReservoir(id: number, isLocked: boolean): Promise<Reservoir> {
    const data: ReservoirToggleLock = { isLocked };
    const response = await api.patch<Reservoir>(
      `reservoirs/${id}/toggle-lock`,
      data,
    );
    return response.data;
  },
};
