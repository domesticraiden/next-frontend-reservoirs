import { Product } from "@/types/product";

export interface Reservoir {
  name: string;
  capacity: number;
  volume: number;
  productId: number;
  isLocked: boolean;
  id: number;
  product: Product;
}

export interface ReservoirCreate {
  name: string;
  capacity: number;
  volume: number;
  productId: number;
  isLocked: boolean;
}

export interface ReservoirUpdate {
  name: string;
  capacity: number;
  volume: number;
  productId: number;
}

export interface ReservoirToggleLock {
  isLocked: boolean;
}
