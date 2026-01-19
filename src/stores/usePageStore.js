import { create } from 'zustand';

export const usePageStore = create((set) => ({
  pageId: null,
  setPageId: (id) => set({ pageId: id }),
}));