import { Product } from "@/types";
import { create } from "zustand";
import { productsApi } from "@/api/services/products";

interface ProductsStoreState {
  products: Product[];

  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsStoreState>((set) => ({
  products: [],

  fetchProducts: async () => {
    const data = await productsApi.getProducts();
    set({ products: data });
  },
}));
