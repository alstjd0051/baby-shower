import { OpenModal } from "@/typing";
import { create } from "zustand";

export const useSignInModal = create<OpenModal>((set) => ({
  isModalOpen: false,
  setOpenModal: (value) => set({ isModalOpen: value }),
  setCloseModal: (value) => set({ isModalOpen: value }),
}));
