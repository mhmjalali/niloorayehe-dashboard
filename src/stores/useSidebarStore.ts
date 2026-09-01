import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: true,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (value) => set({ collapsed: value }),
}));
