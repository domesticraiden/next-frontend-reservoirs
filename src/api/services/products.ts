import { Product } from "@/types";
import { api } from "@/api";

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("products/");
    return response.data;
  },
};
