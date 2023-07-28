import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface CounterState {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
  resetCount: () => void;
  fetchData: () => Promise<any>;
}

export default create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increaseCount: () => set((state) => ({ count: state.count + 1 })),
      decreaseCount: () => set((state) => ({ count: state.count - 1 })),
      resetCount: () => set((state) => ({ count: (state.count = 0) })),
      fetchData: async () => {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        return response.data;
      },
    }),
    {
      name: "count-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
